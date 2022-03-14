import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {getHall} from "../actions/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarHall";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Halls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [...this.props.calender],
      term: "",
      currentPage: 1,
      postsPerPage: 20,
      dateStart:new Date(),
      dateEnd:new Date()

    };
  }
componentDidMount(){
  this.props.getHall()
}

  sortRowsFullName() {
    this.setState({
      roomList: this.props.calender.sort((a, b) => {
        let nameA = a.fullName.toLowerCase();
        let nameB = b.fullName.toLowerCase();
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

  sortRowDateaStart() {
    this.setState({
      roomList: this.props.calender.sort(
        (a, b) =>
        new Date(a.start).getTime() -
        new Date(b.start).getTime()
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
    if (this.state.term === "" ) {
      return this.props.calender.filter((x)=>new Date(x.start)>=new Date(this.state.dateStart) && new Date(x.end)<=new Date(this.state.dateEnd))
    }
    else {
      return this.props.calender.filter(
        (x) =>(new Date(x.start)>=new Date(this.state.dateStart) && new Date(x.end)<=new Date(this.state.dateEnd)&&(
          x.fullName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.email.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
        ))
          
      );
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.rowsSearchConfig().slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense40}>
        <h1>  מעקב אולם-בית הארחה</h1>
        <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ dateStart: e.target.value });
            }}
            value={this.state.dateStart }
            
            
          />
           תאריך התחלה
           <div className={classes.row101}>
          <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ dateEnd: e.target.value });
            }}
            value={this.state.dateEnd }
            
            
          />
          
          תאריך סיום
          </div>
        </div>

        <div className={classes.tablewrapper}>
          {/* <button
            className="btn btn-outline-info"
            onClick={() => {
              this.setState({
                familyList: this.props.families.reverse(),
              });
            }}
          >
            חזרה למצב הקודם
          </button>{" "} */}
          <ActionBar hall={this.props.calender.filter((x)=>new Date(x.start)>=new Date(this.state.dateStart) && new Date(x.end)<=new Date(this.state.dateEnd))} first={this.state.dateStart}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))} end={this.state.dateEnd}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                    איש קשר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsFullName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    מייל
                  </th>
                  <th className={classes.header} th scope="col">
                    טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך 
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowDateaStart()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    שעת התחלה
                  </th>
                  <th className={classes.header} th scope="col">
                    שעת סיום 
                  </th>
                  <th className={classes.header} th scope="col">
                 הערות
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>
                        {x.fullName}
                      </td>
                      <td>
                        {x.email}
                      </td>
                      <td>
                        {x.phone}
                      </td>
                      <td>
                        {new Date(x.start).toLocaleDateString('en-GB')}
                      </td>
                      <td>
                      {new Date(x.start).toLocaleTimeString('en-GB')}
                      </td>
                      <td>
                      {new Date(x.end).toLocaleTimeString('en-GB')}
                      </td>
                      <td>
                      {x.description}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
              מספר הזמנות: {this.rowsSearchConfig().length}
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
    calender:state.calender,
  };
};

export default connect(mapStateToProps,{getHall})(
  Halls
);
