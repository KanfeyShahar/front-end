import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { Card} from 'react-bootstrap';
import classes from "./containers.module.css"
import Chart from "../components/monitor_event/chart1"
import Chart2 from "../components/monitor_event/chart2"
import Chart3 from "../components/monitor_event/chart3"
import Chart4 from "../components/monitor_event/chart4"
import Chart5 from "../components/monitor_event/chart5"
import {getIndexByName} from "../helper-functions/index"
import NumBasket from "../components/monitor_event/chart6"
import { Pane, Alert } from 'evergreen-ui'
import Select from 'react-select'
import {getEvents,getBasket,getFamilyEvents,getFriendEvents} from "../actions/index"

const Monitor_Event = (props) => {
    useEffect(() => {
        props.getFamilyEvents()
        props.getBasket()
        props.getEvents()
        props.getFriendEvents()
      
      },[])


    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const options= props.events.map(x => ({
        "value":x.startDate,
        "label": new Date(x.startDate).toLocaleDateString("en-GB")
      }))
      let sum=0;
      {props.Basket.filter((x)=>x.startDate === date).map((y)=>sum=parseInt(sum)+parseInt(y.sum))}
return(
    <div>
        <div className={classes.header}>
          
        <Select
        className="mt-4 col-md-4 col-offset-4"
        options={options}
        placeholder="בחר תאריך אירוע "
        onChange={(e)  => {
            setDate(e.value)
        }}
       
        value={options.filter((x) => date===(x.value))}
        autoFocus={true}
       
      />
     

</div>
<div className={classes.container}>
    <div className={classes.Square}>
מספר משפחות שקיבלו סל מזון/ארוחה חמה
<div className={classes.SquareNum}>
{props.familyEvents.filter((x)=>x.startDate === date && x.isDeliverd).length}
    </div>
    </div>
    <div className={classes.Square}>
מספר חברי עמותה שהשתתפו באירוע
<div className={classes.SquareNum}>
{props.driversEvent.filter((x)=>x.startDate === date).length}
</div>
    </div>
    <div className={classes.Square}>
מספר פריטים שחולקו
<div className={classes.SquareNum}>
{sum}
    </div>
    </div>
    </div>
  {/* {props.events.filter((x)=>x.startDate===date).map((x)=>x.type).includes("סל מזון") && <div className={classes.main_container}>
        <div className={classes.container}>
            <div className={classes.chart}><labal className={classes.chartLabal}>סל מזון א</labal><Chart date={date}/></div>
            <div className={classes.chart}><labal className={classes.chartLabal}>סל מזון ב</labal><Chart2 date={date}/></div>
            <div className={classes.chart}><labal className={classes.chartLabal}>סל מזון ג</labal><Chart3 date={date}/></div>

      
        </div>
        <div className={classes.container}>
            <div className={classes.chart}><labal className={classes.chartLabal}>סל מזון ד</labal> <Chart4 date={date}/></div>
            <div className={classes.chart}><labal className={classes.chartLabal}>סל מזון ה</labal> <Chart5 date={date}/></div>
      
        </div>

    </div>} */}
    <div >
  <NumBasket date={date}/>
</div>
</div>
)}


const mapStateToProps = (state) => {
    return {
     events: state.events,
     familyEvents: state.familyEvents,
     driversEvent: state.driversEvent,
     Basket:state.Basket,
      };
  };
  
  export default connect(mapStateToProps,{getEvents,getBasket,getFamilyEvents,getFriendEvents})(
    Monitor_Event
  );
  