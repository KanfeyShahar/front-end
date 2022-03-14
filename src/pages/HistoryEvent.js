import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { toggleActiveEventsFamily,selectEvent,deleteEventFamily,toggleModal,updateRowBasket,selectEventNoDirection,toggleActiveDateFood,updateRowInventory,getBasket,getFamilyEvents,getFriendEvents,getEvents} from "../actions";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { selectRow, updateRowFamilyEvent, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar3 from "../components/ActionBarEventBasket";
import ActionBar1 from "../components/ActionBarFamilyHistoryEvent";
import ActionBar2 from "../components/ActionBarEventFriendHistory";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class HistoryEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BasketList: [...this.props.Basket],
      selected:"",
      type:[...this.props.type],
      MasterCheckedDeliverd: false,
      term: "",
      term1:"",
      term2:"",
      direction:"",
      currentPage: 1,
      postsPerPage: 20,
      currentPage1: 1,
      postsPerPage1: 20,
      currentPage2: 1,
      postsPerPage2: 20,
    };
  }

  
  componentDidMount() {
    this.props.getEvents();
    this.props.getFriendEvents();
    this.props.getFamilyEvents();
    this.props.getBasket();
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
  showSearchTerm1 = () => {
    if (this.state.term1 === "") {
      return;
    }
    return (
      <p>
        תוצאות החיפוש :{this.state.term1}
        <button
          className="btn btn-sm btn-info"
          onClick={() => this.setState({ term1: "" })}
        >
          מחק חיפוש
        </button>
      </p>
    );
  };

  showSearchTerm2 = () => {
    if (this.state.term2=== "") {
      return;
    }
    return (
      <p>
        תוצאות החיפוש :{this.state.term2}
        <button
          className="btn btn-sm btn-info"
          onClick={() => this.setState({ term2: "" })}
        >
          מחק חיפוש
        </button>
      </p>
    );
  };


  rowsSearchConfig = () => {
    if (this.state.term === ""  ) {
      return this.props.familyEvents.filter((x)=>x.startDate === this.state.selected )}
      else {
        return this.props.familyEvents.filter(
          (x) =>
          x.startDate === this.state.selected &&
            (x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
              -1 ||
            x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
              -1 ||
            x.city.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
            x.address.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
            x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1)
        );
      }
  };

  rowsSearchConfig2 = () => {
    if (this.state.term2 === ""  ) {
      return this.props.driversEvent.filter((x)=>x.startDate === this.state.selected )}
      else {
        return this.props.driversEvent.filter(
          (x) =>
          x.startDate === this.state.selected &&
          (x.firstName.toLowerCase().indexOf(this.state.term2.toLowerCase()) !==
          -1 ||
        x.lastName.toLowerCase().indexOf(this.state.term2.toLowerCase()) !==
          -1 ||
        x.phone.toLowerCase().indexOf(this.state.term2.toLowerCase()) !== -1)
        
        );
      }
  };

  rowsSearchConfig1 = () => {
    if (this.state.term1 === ""  ) {
      return this.props.Basket.filter((x)=>x.startDate === this.state.selected )}
      else {
        return this.props.Basket.filter(
          (x) =>
          x.startDate === this.state.selected &&
            (x.nameProducts.toLowerCase().indexOf(this.state.term1.toLowerCase()) !==
              -1 ||
            x.size.toLowerCase().indexOf(this.state.term1.toLowerCase()) !==
              -1 ||
            x.type.toLowerCase().indexOf(this.state.term1.toLowerCase()) !== -1 ||
            JSON.stringify(x.code).toLowerCase().indexOf(this.state.term1.toLowerCase()) !== -1 ||
            x.endDate.toLowerCase().indexOf(this.state.term1.toLowerCase()) !== -1)
        );
      }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.rowsSearchConfig1().slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    const { currentPage1, postsPerPage1, posts1 } = this.state;
    const indexOfLastPost1 = currentPage1 * postsPerPage1;
    const indexOfFirstPost1 = indexOfLastPost1 - postsPerPage1;
    const currentPosts1 = this.rowsSearchConfig().slice(
      indexOfFirstPost1,
      indexOfLastPost1
    );
    
    const paginate1 = (pageNum) => this.setState({ currentPage1: pageNum });

    const nextPage1 = () => this.setState({ currentPage1: currentPage1 + 1 });

    const prevPage1 = () => this.setState({ currentPage1: currentPage1 - 1 });


    const { currentPage2, postsPerPage2, posts2 } = this.state;
    const indexOfLastPost2 = currentPage2 * postsPerPage2;
    const indexOfFirstPost2 = indexOfLastPost2 - postsPerPage2;
    const currentPosts2 = this.rowsSearchConfig2().slice(
      indexOfFirstPost2,
      indexOfLastPost2
    );
    
    const paginate2 = (pageNum) => this.setState({ currentPage2: pageNum });

    const nextPage2 = () => this.setState({ currentPage2: currentPage2 + 1 });

    const prevPage2 = () => this.setState({ currentPage2: currentPage2 - 1 });

     
    const options= this.props.events.filter((x)=>x.status === true).map(x => ({
      "value":x.startDate,
      "label": new Date(x.startDate).toLocaleDateString("en-GB")
    }))

      

    return (
   
      <div style={{ maxWidth: "100%" }}>
    <div className={classes1.newexpense6}>
        <h1>אירועים בעבר</h1>
        <div />
        <div className={classes1.newExpense50}>
        <Select className="mt-4 col-md-6 col-offset-4"
         options={options}
         placeholder="בחר תאריך אירוע"
          onChange={ (e) => {
     this.setState({selected: e.value})
  }}

 
  value={options.filter(x=> this.state.selected.includes(x.value))}
  autoFocus={true}
  />    
        </div>
      
  </div>
  <Tabs>
    <TabList>
      { this.props.events.filter((y)=> y.type==="סל מזון" && y.startDate === this.state.selected).length>0? <Tab>סלי מזון</Tab> :""}
   
      <Tab>משפחות</Tab>
      <Tab>חברי עמותה</Tab>
    </TabList>
    {this.props.events.filter((y)=> y.type==="סל מזון" && y.startDate === this.state.selected).length>0 && <TabPanel>
      <br/>
      <br/>
      <br/>
      <div className={classes.tablewrapper}>
      <ActionBar3 basket={this.rowsSearchConfig1()} selected={this.state.selected}
            getTerm={(term1) => this.forceUpdate(this.setState({ term1: term1 }))}
          />
          {this.showSearchTerm1()}
      <div className={classes.direction}>
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
              יחידת מידה
              </th>
              <th className={classes.header} th scope="col">
                סוג
              </th>
              <th className={classes.header} th scope="col">
               יצרן
              </th>
              <th className={classes.header} th scope="col">תאריך תפוגה</th>
              <th className={classes.header} th scope="col">
              א
              </th>
              <th className={classes.header} th scope="col">
              ב
              </th>
              <th className={classes.header} th scope="col">
             ג
              </th>
              <th className={classes.header} th scope="col">
              ד
              </th>
              <th className={classes.header} th scope="col">
              ה
              </th>
              <th className={classes.header} th scope="col">
              סך הכל
              </th>
              <th className={classes.header} th scope="col">נעול</th>
            </tr>
          </thead>
          <tbody>
            {this.rowsSearchConfig1()
              .slice(indexOfFirstPost, indexOfLastPost)
              .map((x) => (
                <tr>
                  <td>{x.code}</td>
                  <td>{x.nameProducts}</td>
                  <td>{x.size}</td>
                  <td>{x.type}</td>
                  <td>{x.manufacture}</td>
                  <td>{new Date(x.endDate).toLocaleDateString("en-GB")}</td>
                  <td >{x.count_real1}</td>
                  <td>{x.count_real2}</td>
                   <td>{x.count_real3}</td>
                   <td> {x.count_real4}</td>
                  <td>{x.count_real5}</td>
                  <td>{x.sum}</td>
                 <td><button type="button" class="btn btn-secondary btn-sm" disabled > נעול</button></td>
                </tr>
              ))}
          </tbody>
          <button
          className="btn btn-primary"
          
          onClick={() => this.getSelectedRows()}
        >
           מספר מוצרים בסל: {this.rowsSearchConfig1().length}
        </button>
        </table>
        
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={this.rowsSearchConfig1().length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
    </TabPanel>}
    <TabPanel>
      <br/>
      <br/>
      <br/>
    <div className={classes.tablewrapper}>
          <ActionBar1 family={this.rowsSearchConfig()} selected={this.state.selected}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()} 
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                <th className={classes.header} th scope="col">
                   תאריך
                  </th>
                  <th className={classes.header} th scope="col">
                   ראש משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                    שם משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                   עיר
                  </th>
                  <th className={classes.header} th scope="col">
                    כתובת
                  </th>
                  <th className={classes.header} th scope="col">
                   טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   נפשות בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                  שפה
   
                  </th>
                  <th className={classes.header} th scope="col">
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   מסלול
                  </th>
                  <th className={classes.header} th scope="col">
                   נמסר
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
               
                  {/* <th className={classes.header} th scope="col">
                    כניסה
  
                  </th>
                  <th className={classes.header} th scope="col">
                   קומה
  
                  </th>
                  <th className={classes.header} th scope="col">
                   מספר דירה
  
                  </th> */}

                  
                </tr>
              </thead>
              <tbody>
              {this.rowsSearchConfig()
                  .slice(indexOfFirstPost1, indexOfLastPost1)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>{new Date(x.startDate).toLocaleDateString("en-GB")}</td>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.numberOfPerson}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.direction}</td>
                        {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                      <td>{x.remarks}</td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
            >
               מספר משפחות באירוע: {this.rowsSearchConfig().length}
            </button>
            </table>
            
            <Pagination
              postsPerPage={postsPerPage1}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate1}
              nextPage={nextPage1}
              prevPage={prevPage1}
            />
          </div>
        </div>
    </TabPanel>
     <TabPanel>
      <br/>
      <br/>
      <br/>
    <div className={classes.tablewrapper}>
    <ActionBar2
    friend={this.rowsSearchConfig2()} selected={this.state.selected}
            getTerm={(term2) => this.forceUpdate(this.setState({ term2: term2 }))}
          />
          {this.showSearchTerm2()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   תאריך הגעה
                  </th>
                  <th className={classes.header} th scope="col">
                    משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                   פרטי
                  </th>
                  <th className={classes.header} th scope="col">
                    טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   תפקיד באירוע
                  </th>
                  <th className={classes.header} th scope="col">
                   נהג
                  </th>
                  <th className={classes.header} th scope="col">
                   מסלול
                  </th>
                  <th className={classes.header} th scope="col">
                    הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.rowsSearchConfig2()
                  .slice(indexOfFirstPost2, indexOfLastPost2)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>{new Date(x.startDate).toLocaleDateString("en-GB")}</td>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.phone}</td>
                      <td>{x.role_event}</td>
                      {(x.driver && <td><input class="form-check-input" type="checkbox" id="x.driver" value="option3" checked disabled></input></td> )||(!x.driver && <td><input class="form-check-input" type="checkbox" id="x.driver" value="option3" disabled></input></td> )}
                      <td>{x.direction}</td>
                      <td>{x.remarks}</td>
                      <td>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
            >
              מספר חברים באירוע: {this.rowsSearchConfig2().length}
            </button>
            </table>
            
            <Pagination
              postsPerPage={postsPerPage2}
              totalPosts={this.rowsSearchConfig2().length}
              paginate={paginate2}
              nextPage={nextPage2}
              prevPage={prevPage2}
            />
          </div>
        </div>
    </TabPanel>
  </Tabs>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    familyEvents: state.familyEvents,
    driversEvent:state.driversEvent,
   events: state.events,
   type:state.type,
    selectedDate:state.selectedDate,
    date_no_direction:state.date_no_direction,
    type_no_direction:state.type_no_direction,
    Basket:state.Basket,
    productsInventory:state.productsInventory
  };
};

export default connect(mapStateToProps, { selectRow,updateRowBasket, updateRowFamilyEvent, updatePhone,toggleActiveEventsFamily,selectEvent,toggleModal,deleteEventFamily ,selectEventNoDirection,toggleActiveDateFood,updateRowInventory,getBasket,getFamilyEvents,getFriendEvents,getEvents})(
  HistoryEvent
);
