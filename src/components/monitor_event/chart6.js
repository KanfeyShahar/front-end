import "./styles.css";
import React,{useEffect} from "react";
import { connect } from "react-redux";
import { getFamilyEvents } from "../../actions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



const NumBasket = (props,date) =>{

useEffect(() => {
  props.getFamilyEvents()
  

}, [])

    const data = [
        {
          name: "מסלול 1",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 1')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 1') && !x.isDeliverd).length,
          
          amt: 2400
        },
        {
          name: "מסלול 2",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 2')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 2') && !x.isDeliverd).length,
          amt: 2210
        },
        {
          name: "מסלול 3",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 3')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 3') && !x.isDeliverd).length,
          amt: 2290
        },
        {
          name: "מסלול 4",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 4')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 4') && !x.isDeliverd).length,
          amt: 2000
        },
        {
          name: "מסלול 5",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 5')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 5') && !x.isDeliverd).length,
          amt: 2181
        },
        {
          name: "מסלול 6",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 6')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 6') && !x.isDeliverd).length,
          amt: 2500
        },
        {
          name: "מסלול 7",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 7')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 7') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 8",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 8')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 8') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 9",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 9')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 9') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 10",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 10')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 10') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 11",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 11')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 11') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 12",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 13')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 13') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 13",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 14')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 14') && !x.isDeliverd).length,
          amt: 2100
        },
        {
          name: "מסלול 14",
          "מספר משפחות שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 15')&&x.isDeliverd).length,
          "מספר משפחות שלא שקיבלו":props.familyEvents.filter((x)=>(x.startDate === props.date) && (x.direction ==='מסלול 15') && !x.isDeliverd).length,
          amt: 2100
        }
      ];
  return (
    <BarChart
      width={1500}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="מספר משפחות שלא שקיבלו" fill="#8884d8" />
      <Bar dataKey="מספר משפחות שקיבלו" fill="#00BFFF" />
    </BarChart>
  );
}


const mapStateToProps = (state) => {
    return {
      familyEvents: state.familyEvents,
    };
  };
  
  export default connect(mapStateToProps,{getFamilyEvents})(
    NumBasket
  );
  