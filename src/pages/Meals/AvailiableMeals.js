import React, { Component } from "react";

import { connect } from "react-redux";
import { toggleActive,toggleFood, toggleHot,loadingData} from "../../actions/index"
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import {getIndexByNameProducts} from "../../helper-functions"
import { selectRow, updateRowP, updatePhone,getProducts } from "../../actions/index"
import classes from "../header.module.css";
import classes1 from "../family.module.css";
import ActionBarP from "../../components/ActionBarP"
import Pagination from "../pagination";
import MealItem from "./MealItem/MealItem";




class Shop extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false,
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      term: "",
      currentPage: 1,
      postsPerPage:10,
    

      // columnHeaders: [
      //   {
      //     name: "שם ראש משפחה",
      //   },
      //   {
      //     name: "שם משפחה",
      //   },
      //   {
      //     name: "טלפון",
      //   },
      //   {
      //     name: "עיר",
      //   },
      //   {
      //     name: "רחוב",
      //   },
      //   {
      //     name: "מספר בניין",
      //   },
      //   {
      //     name: "נפשות",
      //   },
      //   {
      //     name: "תאריך הוספה",
      //   },
      //   {
      //     name: " מצב",
      //   },
      // ],
    };
  }
  
 componentDidMount() {
  this.props.getProducts()
 }




  sortRows() {
    this.setState({
        productList: this.props.products.sort((a, b) => {
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
  sortRowsProductNote() {
    this.setState({
        productList: this.props.products.sort((a, b) => {
        let nameA = a.productNote.toLowerCase();
        let nameB = b.productNote.toLowerCase();
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
  sortRowsType() {
    this.setState({
        productList: this.props.products.sort((a, b) => {
        let nameA = a.type.toLowerCase();
        let nameB = b.type.toLowerCase();
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
  sortRowsSize() {
    this.setState({
        productList: this.props.products.sort((a, b) => {
        let nameA = a.size.toLowerCase();
        let nameB = b.size.toLowerCase();
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
  sortRowNumber() {
    this.setState({
        productList: this.props.products.sort(
        (a, b) => a.numberOfPerson - b.numberOfPerson
      ),
    });
  }

  sortRowDate() {
    this.setState({
        productList: this.props.products.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      ),
    });
  }
  


  
  

  getSelectedCategory = (ChangeCategory) => {
    selectRow(ChangeCategory);
    const prodIdx = getIndexByNameProducts(this.props.products, ChangeCategory);
    Swal.fire({
      title: "שנה שם יצרן",
      input: "text",
      inputValue: this.props.products[prodIdx].manufacture,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם מוצר";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.products[prodIdx].manufacture !== result.value
      ) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
          name: this.props.products[prodIdx].name,
          productNote: this.props.products[prodIdx].productNote,
          manufacture: result.value,
          size: this.props.products[prodIdx].size,
          type: this.props.products[prodIdx].type,
         price: this.props.products[prodIdx].price,
         count:this.props.products[prodIdx].count
        });
      }
    });
  };
  getSelectedProductNote = (ChangeProductNote) => {
    selectRow(ChangeProductNote);
    const prodIdx =getIndexByNameProducts(this.props.products, ChangeProductNote);
    Swal.fire({
      title: `שנה שם משפחה`,
      input: "text",
      inputValue: this.props.products[prodIdx].productNote,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם משפחה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.products[prodIdx].productNote !== result.value
      ) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
          name: this.props.products[prodIdx].name,
          productNote: result.value,
          manufacture:this.props.products[prodIdx].manufacture,
          size: this.props.products[prodIdx].size,
          type: this.props.products[prodIdx].type,
          price: this.props.products[prodIdx].price,
          count:this.props.products[prodIdx].count
        });
      }
    });
  };
  getSelectedName = (ChangeName) => {
    selectRow(ChangeName);
    const prodIdx = getIndexByNameProducts(this.props.products, ChangeName);

    Swal.fire({
      title: `שנה שם מוצר`,
      input: "text",
      inputValue: this.props.products[prodIdx].name,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לציין שם מוצר";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.products[prodIdx].name !== result.value &&
        getIndexByNameProducts(this.props.products, result.value) === -1
      ) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
          name: result.value,
          productNote: this.props.products[prodIdx].productNote,
          manufacture:this.props.products[prodIdx].manufacture,
          size: this.props.products[prodIdx].size,
          type: this.props.products[prodIdx].type,
          price: this.props.products[prodIdx].price,
          count:this.props.products[prodIdx].count

        });
      } else if (this.props.products[prodIdx].name === result.value) {
        Swal.fire({
          icon: "warning",
          title: "שם המוצר לא שונה",
          confirmButtonText: "אישור",
          confirmButtonColor: "orange",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "מוצר קיים במערכת",
          confirmButtonText: "אישור",
          confirmButtonColor: "red",
        });
      }
    });
  };
  getSelectedSize = (ChangeSize) => {
    selectRow(ChangeSize);
    const prodIdx = getIndexByNameProducts(this.props.products, ChangeSize);
    Swal.fire({
      title: `שנה יחידת מידה`,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.products[prodIdx].size,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לציין יחידת מידה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.products[prodIdx].size !== result.value
      ) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
         name: this.props.products[prodIdx].name,
         productNote: this.props.products[prodIdx].productNote,
         manufacture:this.props.products[prodIdx].manufacture,
         size: result.value,
          type: this.props.products[prodIdx].type,
          price: this.props.products[prodIdx].price,
          count:this.props.products[prodIdx].count
        });
      }
    });
  };

  
  getSelectedType = (ChangeType) => {
    selectRow(ChangeType);
    const prodIdx = getIndexByNameProducts(this.props.products, ChangeType);
    Swal.fire({
      title: ` שינוי סוג מוצר`,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.products[prodIdx].type,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד סוג מוצר";
        }
      },
    }).then((result) => {
      if (result.value && this.props.products[prodIdx].type !== result.value) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
          name: this.props.products[prodIdx].name,
          productNote: this.props.products[prodIdx].productNote,
          manufacture:this.props.products[prodIdx].manufacture,
          size: this.props.products[prodIdx].size,
          type: result.value,
          price: this.props.products[prodIdx].price,
          count:this.props.products[prodIdx].count
        });
      }
    });
  };
  getSelectedPrice = (ChangePrice) => {
    selectRow(ChangePrice);
    const prodIdx = getIndexByNameProducts(this.props.products, ChangePrice);
    Swal.fire({
      title: ` עדכון מחיר : `,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.products[prodIdx].price,
      inputValidator: (value) => {
        if (value <= 1) {
          return "חייב מחיר";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.products[prodIdx].price !== result.value
      ) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
          name: this.props.products[prodIdx].name,
          productNote: this.props.products[prodIdx].productNote,
          manufacture:this.props.products[prodIdx].manufacture,
          size: this.props.products[prodIdx].size,
          type: this.props.products[prodIdx].type,
          price: parseFloat(result.value),
          count:this.props.products[prodIdx].count
        });
      }
    });
  };
  

  showSearchTerm =() => {
    if (this.state.term === "") {
      return;
    }
    return (
      <p>
        תוצאות החיפוש :{this.state.term}
        <button
          className="btn btn-sm btn-info"
          onClick = {() => this.setState({ term: "" })}
        >
          מחק חיפוש
        </button>
        
      </p>
    );
  };

  rowsSearchConfig = () => {
    if (this.state.term === ""  ) {
      return this.props.products}
    else {
     
      return (
        this.props.products.filter(
        (x) =>
        x.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.manufacture.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      ));
    }
  };

  render() {
   
   
    const { loading } = this.state;
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
    {console.log(this.props.products)}
    return (
      <div style={{ maxWidth: "100%" }}>
       
        <div className={classes1.newexpense6}>
        <h1>קטלוג מוצרים</h1>
          <div />
        </div>

        <div className={classes.tablewrapper}>
          {/* <button
            className="btn btn-outline-info"
            onClick={() => {
              this.setState({
                productList: this.props.products.reverse(),
              });
            }}
          >
            חזרה למצב הקודם
          </button>{" "} */}
          <ActionBarP
            getTerm={(term) =>(this.setState({ term: term,currentPage:1 }))}/>

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
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    תיאור מוצר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  סוג 
                   <button
                     className={classes.button}
                     onClick={() => this.sortRows()}
                   >
                     <FontAwesomeIcon icon={faSort} />
                   </button>
                 </th>
                  <th className={classes.header} th scope="col">
                   יצרן
                   <button
                     className={classes.button}
                     onClick={() => this.sortRows()}
                   >
                     <FontAwesomeIcon icon={faSort} />
                   </button>
                 </th>
                  <th className={classes.header} th scope="col">
                    יחידת מידה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsType()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    מחיר ליחידת מידה
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsSize()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                 הוספה
      
                  </th>
                  {/* <th className={classes.header} th scope="col">
                  כמות מומלצת
                    <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th> */}
        
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                   <MealItem
                    key={x.code}
                    id={x.code}
                    props={x}
                    getSelectedName={this.getSelectedName}
                    getSelectedProductNote={this.getSelectedProductNote}
                    getSelectedCategory={this.getSelectedCategory}
                    getSelectedType={this.getSelectedType}
                    getSelectedSize={this.getSelectedSize}
                    getSelectedPrice={this.getSelectedPrice}
                    />))}

              </tbody>
              <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              מספר מוצרים: {this.rowsSearchConfig().length}
            </button> 
            </table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              indexOfLastPost={indexOfLastPost}
              indexOfFirstPost={indexOfFirstPost}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

  
    );
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.products,
    active:state.active,
    activeFood:state.activeFood,
    activeHot:state.activeHot,
    Loading:state.Loading
  };
};

export default connect(mapStateToProps, { selectRow, updateRowP, updatePhone,toggleActive,toggleFood,toggleHot,getProducts,loadingData })(
    Shop
);
