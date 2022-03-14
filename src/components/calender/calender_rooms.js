import React,  { Component } from "react";
import { connect } from "react-redux";
import { getRooms,getResource } from "../../actions";
import "moment/locale/he";
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import ActionBar from "../ActionBarRooms";
import moment from "moment";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { toggleModal,updateRowRooms,toggleModalCalender} from "../../actions";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import classes1 from "../../pages/family.module.css";
import RoomsAdd from "../RoomsAdd";
import ButtonAdd from "../ButtonAdd";
import "./styles.css";

const DragAndDropCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment);

class CalenderRooms extends Component {
  constructor(props){
    super(props)
    this.state = {
      events:[...this.props.rooms],
      displayDragItemInCell: true,
      handleModal:false,
      showModal:false,
      selectedDate:new Date(),
      event:[],
    }
  this.moveEvent = this.moveEvent.bind(this)
  // this.newEvent = this.newEvent.bind(this)
}

componentDidMount(){
  this.props.getRooms()
  this.props.getResource()
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
this.props.rooms.map((x)=> x.id === event.id ? 
  this.props.updateRowRooms({
    id:event.id,
    start:start,
    end:end,
    resourceId:event.resourceId,
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

  this.props.rooms.map((x)=> x.id === event.id ? 
  this.props.updateRowRooms({
    id:event.id,
    start:start,
    end:end,
    resourceId:event.resourceId,
    description:event.description,
    title:event.title,
    email:event.email,
    phone:event.phone,
    fullName:event.fullName,
    color:event.color,
  }):x)


  //alert(`${event.title} was resized to ${start}-${end}`)
}


eventGlatter = (event) => {
  var backgroundColor = event.color;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block'
}
return {
  style: style
};
}

openModal=(event)=> {
  this.props.toggleModal()
 this.setState({event:event}, () =>  console.log(this.state.event)
 )

}


render(){
  const resourceMap = this.props.resource
  .map((x) => ({
    resourceId: x.resourceId,
    resourceTitle: x.resourceTitle,
  }));

return(
  
  <div className="App">
       <div className={classes1.newexpense36}>
      <h1>ניהול חדרים</h1>
      <div className={classes1.newexpense35}>
      <ActionBar/>
      </div>
      </div>
      <ButtonAdd header="עריכה/מחיקת אירוע">
        <RoomsAdd action="add" event={this.state.event} />
      </ButtonAdd>
      
    <DragAndDropCalendar
      selectable
      onSelectEvent={ ((event) => this.openModal(event)) }
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
      onDoubleClickEvent={this.props.toggleModal}
      selectable={true}
      onDragStart={console.log}
      onEventDrop={this.moveEvent}
      onEventResize={this.resizeEvent}
      dragFromOutsideItem={
        this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
      }
      onDropFromOutside={this.onDropFromOutside}
      handleDragStart={this.handleDragStart}
      popup={true}
      eventPropGetter={((event) => this.eventGlatter(event))}
      resizable
      events={this.props.rooms}
      localizer={localizer}
      defaultView={Views.DAY}
      views={['day','week','agenda','month']}
      step={30}
      style={{ height: 500, margin: "50px" }}
      defaultDate={new Date()}
      resources={resourceMap}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
    />
    </div>
)}

    }

    const mapStateToProps = (state) => {
      return { modal: state.modal,
        modalCalender: state.modalCalender,
        rooms:state.rooms,
        resource:state.resource };
    };
    
    export default connect(mapStateToProps, { toggleModal,updateRowRooms,getResource, toggleModalCalender,getRooms})(CalenderRooms);