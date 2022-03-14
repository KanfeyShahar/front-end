import "moment/locale/he";
import React,  { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import events from './events'
import ActionBar from "../ActionBarRoom";
import { Calendar, momentLocalizer,Views} from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import ButtonAdd from "../ButtonAdd";
import classes1 from "../../pages/family.module.css";
import ModalSee from "../ModalCalenderSee";
import CalenderAdd from "../CalenderAdd";
import SeeEventCalender from "../seeEventCalender"
import CalenderAddNew from "../calenderAddNew";
import { toggleModal,updateRowCalender,toggleModalCalender,toggleModalSee,getHall } from "../../actions";
import "./styles.css";
import CreateEvent from "./CreateEvent";
import classes from "../ButtonAdd.module.css";

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment);

class CalenderRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: [...this.props.calender],
      displayDragItemInCell: true,
      handleModal:false,
      showModal:false,
      selectedDate:new Date(),
      event:[],
    }
  this.moveEvent = this.moveEvent.bind(this)
  this.newEvent = this.newEvent.bind(this)
}

componentDidMount(){
  const storedData = JSON.parse(localStorage.getItem("userData"));
    if(storedData&&storedData.token){
      this.props.getHall(storedData.token);
    }
}
handleDragStart = event => {
  this.setState({ draggedEvent: event })
}
dragFromOutsideItem = () => {
  return this.state.draggedEvent
}
onDropFromOutside = ({ start, end, allDay }) => {
  const { draggedEvent } = this.state

  const event = {
    id: draggedEvent.id,
    title: draggedEvent.title,
    start,
    end,
    allDay: allDay,
  }

  this.setState({ draggedEvent: null })
  this.moveEvent({ event, start, end })
}

moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
  const { events } = this.state

  let allDay = event.allDay

  if (!event.allDay && droppedOnAllDaySlot) {
    allDay = true
  } else if (event.allDay && !droppedOnAllDaySlot) {
    allDay = false
  }
this.props.calender.map((x)=> x.id === event.id ? 
  this.props.updateRowCalender({
    id:event.id,
    start:start,
    end:end,
    description:event.description,
    title:event.title,
    email:event.email,
    phone:event.phone,
    fullName:event.fullName,
    color:event.color,
  }):x)
}



resizeEvent = ({ event, start, end }) => {
  const { events } = this.state

  this.props.calender.map((x)=> x.id === event.id ? 
  this.props.updateRowCalender({
    id:event.id,
    start:start,
    end:end,
    description:event.description,
    title:event.title,
    email:event.email,
    phone:event.phone,
    color:event.color,
    fullName:event.fullName,
  }):x)


  //alert(`${event.title} was resized to ${start}-${end}`)
}
  // onEventDrop = ({start, end, id, title}) => {
  //   const data = {start, end, id, title}
  //   const events = this.state.events.filter((item)=> item.id !== data.id)
  //   this.setState( { events: [...events, data] });
  //   console.log(data);
  // };


  newEvent(_event) {
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  openModal=(event)=> {
    this.props.toggleModal()
   this.setState({event:event}, () =>  console.log(this.state.event)
   )
  
  }

  eventGlatter = (event) => {
    var backgroundColor = event.color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      FontFace:' @import url("https://fonts.googleapis.com/css2?family=Assistant:wght@800&family=Noto+Sans+Hebrew:wght@900&family=Rubik:wght@600&display=swap");'
     
  }
  return {
    style: style
};
  }
  


render() {
  return (
    <div className="App">
       <div className={classes1.newexpense36}>
      <h1>ניהול אולם</h1>
      <div className={classes1.newexpense35}>
      <ActionBar/>
      </div>
      </div>
      
      <div>

        
        {/* <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button> */}
      </div>
      <ModalSee header="פרטי אירוע">
   <SeeEventCalender action="add" event={this.state.event}/>
 </ModalSee>
      <ButtonAdd header="עריכה/מחיקת אירוע">
        <CalenderAdd action="add" event={this.state.event} />
      </ButtonAdd>
      <DragAndDropCalendar
       selectable
        messages={{
          month: "חודש",
          day: "יום",
          today: "היום",
          week:"שבוע",
          agenda:"יומן",
          work_week:"שני עד שישי",
          previous:"הקודם",
          next:"הבא"
        }}
        onSelectEvent={ ((event) => this.openModal(event)) }
        onSelectSlot={this.props.toggleModalCalender}
        selectable={true}
        localizer={localizer}
        onDoubleClickEvent={this.props.toggleModal}
        onDragStart={console.log}
        events={this.props.calender}
        onEventDrop={this.moveEvent}
        onEventResize={this.resizeEvent}
        popup={true}
        dragFromOutsideItem={
          this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
        }
        onDropFromOutside={this.onDropFromOutside}
        handleDragStart={this.handleDragStart}
        startAccessor="start"
        endAccessor="end"
        resizable
        eventPropGetter={((event) => this.eventGlatter(event))}
        style={{ height: 500, margin: "50px" }}
        views={{
          day: true,
          week: true,
          month: true,
          agenda: true,
          work_week: true,
        }}
      />
    </div>
  );
}
}



const mapStateToProps = (state) => {
  return { modal: state.modal,
    calender:state.calender,
    modalCalender: state.modalCalender,
    modalSee:state.modalSee };
};

export default connect(mapStateToProps, { toggleModal,updateRowCalender,toggleModalCalender,toggleModalSee,getHall })(CalenderRoom);