import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleActiveV,toggleFood, toggleHot,getMovements,getProducts,getInventory} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRowV, updatePhone,getBasket ,getEvents} from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarMovements";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class MovementsInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movementsList: [...this.props.movements_Inventory],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,

    };
  }

componentDidMount(){
  this.props.getEvents()
  this.props.getBasket()
  this.props.getMovements()
  this.props.getProducts()
  this.props.getInventory()
}

  sortRowsId() {
    this.setState({
      movementsList: this.props.movements_Inventory.sort((a, b) => {
        let nameA = a.id.toLowerCase();
        let nameB = b.id.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowsName() {
    this.setState({
      movementsList: this.props.movements_Inventory.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowsCenter() {
    this.setState({
      movementsList:  this.props.movements_Inventory.sort((a, b) => {
        let nameA = a.center.toLowerCase();
        let nameB = b.center.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }


  sortRowDate() {
    this.setState({
      movementsList: this.props.movements_Inventory.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      ),
    });
  }

  sortRowEnd() {
    this.setState({
      movementsList: this.props.movements_Inventory.sort(
        (a, b) =>
          new Date(b.endDate).getTime() -
          new Date(a.endDate).getTime()
      ),
    });
  }
  


  showSearchTerm = () => {
    if (this.state.term === "") {
      return;
    }
    return (
      <p>
        תוצאות החיפוש :{this.state.term}
        <button
          className="btn btn-sm btn-info"
          onClick={() => this.setState({ term: "" })}
        >
          מחק חיפוש
        </button>
      </p>
    );
  };

  rowsSearchConfig = () => {
    if (this.state.term === ""  ) {
      return this.props.movements_Inventory.sort(
        (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
      )
      }
    else {
      return this.props.movements_Inventory.filter(
        (x) =>
          x.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.center.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.manufacture.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      ).sort(
        (a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
      )
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.movements_Inventory.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense6}>
        <h1>תנועות מלאי</h1>
        </div>
        

        <div className={classes.tablewrapper}>
          <ActionBar
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
            <div />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                 מק"ט
                  </th>
                  <th className={classes.header} th scope="col">
                    שם מוצר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
             
                  <th className={classes.header} th scope="col">
                   מיקום אספקה
                   <button
                       className={classes.button}
                      onClick={() => this.sortRowsCenter()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  סוג
                   <button
                       className={classes.button}
                      onClick={() => this.sortRowsCenter()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  יצרן
                   <button
                       className={classes.button}
                      onClick={() => this.sortRowsCenter()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות
                  </th>
                  <th className={classes.header} th scope="col">
                  יחידות מידה
                  </th>
                  <th className={classes.header} th scope="col">
                תאריך ביצוע
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  תאריך תפוגה
                   <button
                      className={classes.button}
                      onClick={() => this.sortRowEnd()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    יוצא/נכנס
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                     <td>{x.code}</td>
                      <td >
                        {x.name}
                      </td>
                      <td >
                        {x.center}
                      </td>
                      <td>{x.type}</td>
                      <td>{x.manufacture}</td>
                      <td>{x.count}</td>
                      <td>{x.size}</td>
                      <td >
                      {new Date(x.created_date).toLocaleDateString("en-GB")}
                      </td>
                      <td >
                      {new Date(x.endDate).toLocaleDateString("en-GB")}
                      </td>
                      <td
                      >
                        {x.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              מספר רשומות: {this.rowsSearchConfig().length}
            </button>
            </table>
          
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movements_Inventory: state.movements_Inventory,
    products:state.products
  };
};

export default connect(mapStateToProps, { getBasket ,getEvents,selectRow, updateRowV, updatePhone,toggleActiveV,toggleFood,toggleHot,getMovements,getProducts,getInventory })(
  MovementsInventory
);
