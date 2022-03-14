import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActiveEvents,getCounter} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRowEvents, updatePhone,getEvents,updateEquipment,updateCounter,getCounter1,updateRowBasket,updateRowInventory,getEquipment,getBasket,getInventory } from "../actions";
import * as FaIcons from "react-icons/fa";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarCounter";
import Pagination from "./pagination";
import './switchEvent.css'
import './row.css'
import classes5 from "../components/button.module.css";
import Show_counter from "../components/show_counter1";
import Show_counter2 from "../components/show_counter2";

class ComponentToPrint extends Component  {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={classes1.container}>
        <div className={classes1.header}>
          <p >
      כנפי שחר
          </p>
          </div>
      <div className={classes1.h2}>
        {new Date().toLocaleString("en-GB")}   
        {"  "}
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח ספירת מלאי</h1>
        <h2>תאריך {new Date(this.props.selected).toLocaleDateString("en-GB")} </h2>
        <br/>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                  מק"ט
                  </th>
                  <th className={classes.header} th scope="col">
                   שם מוצר
                  </th>
                  <th className={classes.header} th scope="col">
                  תאריך תפוגה
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות במלאי
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.counter.map((x)=>(
                    <tr>
                      <td>{x.code}</td>
                      <td>{x.nameProducts}</td>
                      <td>{x.endDate}</td>
                      <td>{x.count}</td>
                      <td>{x.count_actual}</td>
                      <td>{x.remarks}</td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   </div>
  
    
    );
  }
}

class Counter_inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter_inventory_List: [...this.props.counter_inventory],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
    };
  }

  componentDidMount(){
    this.props.getCounter()
    this.props.getCounter1()
    this.props.getInventory()
    this.props.getBasket()
    this.props.getEquipment()
  }

  sortRowsName() {
    this.setState({
      counter_inventory_List: this.props.counter_inventory.sort((a, b) => {
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


  sortRowDateFirst() {
    this.setState({
      counter_inventory_List: this.props.counter_inventory.sort(
        (a, b) =>
          new Date(a.startDate).getTime() -
          new Date(b.startDate).getTime()
      ),
    });
  }

  

 

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.counter_inventory.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      counter_inventory_List: this.props.counter_inventory.filter((e) => e.status),
    });
  }
  

  

  onItemCheck(e, item) {
    this.props.counter_inventory.map((x) => {
      if (x.id === item.id && x.type==="מלאי מזון") {
        Swal.fire({
          title: " האם אתה בטוח על פעולתך, לא תוכל לחזור שנית על הפעולה",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "כן",
          confirmButtonColor: "green",
          denyButtonText: `לא`,
          denyButtonColor: `red`,
        }).then((result) => {
          if (result.isConfirmed) {
            x.status =true;
            const prodIdx = getIndexByName(this.props.counter_inventory, item.id);
            this.props.updateCounter({
              id: this.props.counter_inventory[prodIdx].id,
              name:this.props.counter_inventory[prodIdx].name,
              startDate: this.props.counter_inventory[prodIdx].startDate,
              type: this.props.counter_inventory[prodIdx].type,
              remarks:this.props.counter_inventory[prodIdx].remarks,
              status: true,
            });
            this.props.show_counter.filter((y)=>y.startDate === this.props.counter_inventory[prodIdx].startDate).map((z)=>
           {
            const prodIdx1 = getIndexByName(
              this.props.productsInventory,
              z.id_number
            );
            this.props.updateRowInventory({
              id: this.props.productsInventory[prodIdx1].id,
              code:this.props.productsInventory[prodIdx1].code,
              nameProducts: this.props.productsInventory[prodIdx1].nameProducts,
              size: this.props.productsInventory[prodIdx1].size,
              type: this.props.productsInventory[prodIdx1].type,
              count: z.count_actual,
              endDate: this.props.productsInventory[prodIdx1].endDate,
              manufacture: this.props.productsInventory[prodIdx1].manufacture,
          
            });
            const newCount =z.count_actual
            this.props.Basket.filter((x=>(x.startDate >new Date().toLocaleDateString('en-GB')) && !x.locked)).map((x)=>( 
              (x.id_inventory ===  this.props.productsInventory[prodIdx1].id  ? 
                this.props.updateRowBasket({
                startDate:x.startDate,
                id: x.id,
                id_inventory:x.id_inventory,
                code:x.code,
                nameProducts: x.nameProducts,
                size: x.size,
                type: x.type,
                count:newCount ,
                manufacture: x.manufacture,
                count_real1:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real1) ,
                count_real2:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real2) ,
                count_real5:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real5) ,
                count_real3:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real3) ,
                locked:false,
                count_real4:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real4) ,
                sum: (parseInt(newCount)<parseInt(x.sum) ? 0 : parseInt(x.sum) ),
               endDate:x.endDate,
              }):x )
             ))
           }
            );
         
     
            Swal.fire({
              title: "בוצע",
              icon: "success",
              confirmButtonText: "אישור",
            });
          } else if (result.isDenied) {
            Swal.fire({
              title: "לא אושר",
              icon: "info",
              confirmButtonText: "אישור",
            });
          }
        })
        
       
      }
      if(x.id === item.id && item.type==="ציוד"){
        Swal.fire({
          title: " האם אתה בטוח על פעולתך, לא תוכל לחזור שנית על הפעולה",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "כן",
          confirmButtonColor: "green",
          denyButtonText: `לא`,
          denyButtonColor: `red`,
        }).then((result) => {
          if (result.isConfirmed) {
            x.status =true;
            const prodIdx = getIndexByName(this.props.counter_inventory, item.id);
            this.props.updateCounter({
              id: this.props.counter_inventory[prodIdx].id,
              name:this.props.counter_inventory[prodIdx].name,
              startDate: this.props.counter_inventory[prodIdx].startDate,
              type: this.props.counter_inventory[prodIdx].type,
              remarks:this.props.counter_inventory[prodIdx].remarks,
              status: true,
            });
            this.props.show_counter.filter((y)=>y.startDate === item.startDate).map((z)=>{
              const prodIdx1 = getIndexByName(this.props.equipments, z.id_number);
              this.props.updateEquipment({
              id: this.props.equipments[prodIdx1].id,
              name_equipment: this.props.equipments[prodIdx1].name_equipment,
              center:this.props.equipments[prodIdx1].center,
              count:z.count_actual,
              remark:this.props.equipments[prodIdx1].remark,
              });
            })
      }
     


    })}
      else{ 
        
      return x;
      }
    });
    

    //To Control Master Checkbox State
    const totalItems = this.props.counter_inventory.length;
    const totalCheckedItems = this.props.counter_inventory.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      counter_inventory_List: this.props.counter_inventory.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      counter_inventory_List: this.props.counter_inventory.filter((e) => e.status),
    });
  }

  getSelectedName = (ChangeFirstName) => {
    selectRow(ChangeFirstName);
    const prodIdx = getIndexByName(this.props.counter_inventory, ChangeFirstName);
    Swal.fire({
      title: "עדכן אחראי מלאי  ",
      input: "text",
      inputValue: this.props.counter_inventory[prodIdx].name,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד  שם אחראי";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.counter_inventory[prodIdx].name !== result.value
      ) {
        this.props.updateCounter({
          id: this.props.counter_inventory[prodIdx].id,
          name:result.value,
          startDate: this.props.counter_inventory[prodIdx].startDate,
          type: this.props.counter_inventory[prodIdx].type,
          remarks:this.props.counter_inventory[prodIdx].remarks,
          status: this.props.counter_inventory[prodIdx].status,
        });
      }
    });
  };

  
  
  getSelectedRemark = (ChangeFirstName) => {
    selectRow(ChangeFirstName);
    const prodIdx = getIndexByName(this.props.counter_inventory, ChangeFirstName);
    Swal.fire({
      title: "הוסף הערות",
      input: "text",
      inputValue: this.props.counter_inventory[prodIdx].remarks,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם אירוע";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.counter_inventory[prodIdx].remarks !== result.value
      ) {
        this.props.updateCounter({
          id: this.props.counter_inventory[prodIdx].id,
          name:this.props.counter_inventory[prodIdx].name,
          startDate: this.props.counter_inventory[prodIdx].startDate,
          type: this.props.counter_inventory[prodIdx].type,
          remarks:result.value,
          status: this.props.counter_inventory[prodIdx].status,
        });
      }
    });
  };

 
  

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
    if (this.state.term === ""   ) {
        return this.props.counter_inventory.sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )
      }
    else {
      return this.props.counter_inventory.filter(
        (x) =>
          x.startDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      ).sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
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
        <h1> ספירת מלאי</h1>
          <div />
        </div>

        <div className={classes.tablewrapper}>
          <ActionBar
            getTerm={(term) => this.forceUpdate(this.setState({ term: term, currentPage:1 }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                    תאריך ספירה תקופתית
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowDateFirst()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    אחראי מלאי
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                 
                  <th className={classes.header} th scope="col">
                   סוג אירוע ספירה
                  </th>
                  <th className={classes.header} th scope="col">
                    הערות
                  </th>
                  <th className={classes.header} th scope="col">
                    נעילה

                  </th>
                  <th className={classes.header} th scope="col">דוח</th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      <td >
                        {new Date(x.startDate).toLocaleDateString("en-GB")}
                      </td>
                      <td onDoubleClick={() => this.getSelectedName(x.id)}>
                        {x.name}
                      </td>
                      <td>
                        {x.type}
                      </td>
                      <td onDoubleClick={() => this.getSelectedRemark(x.id)}>{x.remarks}</td>
                      {(!x.status && <td key={x.id} className={x.status ? "status" : ""}>
                        <input
                          type="checkbox"
                          checked={x.status}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      
                     </td>) || (x.status &&<td><input class="form-check-input" type="checkbox" id="x.status" value="option3" checked disabled></input></td>)}
                     {x.type ==="מלאי מזון" &&<td> <Show_counter selected={x.startDate} counter={this.props.show_counter.filter((y)=>y.startDate ===x.startDate)}/></td>}
                     {x.type ==="ציוד" &&<td> <Show_counter2 selected={x.startDate} counter={this.props.show_counter.filter((y)=>y.startDate ===x.startDate)}/></td>}
                    </tr>
                  ))}
              </tbody>
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
    counter_inventory: state.counter_inventory,
    activeEvents:state.activeEvents,
    show_counter:state.show_counter,
    Basket:state.Basket,
    productsInventory:state.productsInventory,
    equipments:state.equipments
  };
};

export default connect(mapStateToProps, { getEquipment,selectRow, updateEquipment,updateRowEvents, updatePhone,toggleActiveEvents,getBasket,getInventory,getEvents,getCounter,updateCounter,getCounter1,updateRowBasket,updateRowInventory })(
  Counter_inventory
);
