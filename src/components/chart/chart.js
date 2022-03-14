import React,{Component } from "react";
import { connect } from "react-redux";
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import classes from "./style1.module.css"


import "./styles.css";





const BarChart = (props) => {
  const data  = [
    {
      name: "1",
      "מספר משפחות": (props.families.filter((x)=>parseInt(x.numberOfPerson) === 1).length),
      amt: 1
    },
    {
      name: "2",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 2).length,
      amt: 2
    },
    {
      name: "3",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 3).length,
      amt: 3
    },
    {
      name: "4",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 4).length,
      amt: 4
    },
    {
      name: "5",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 5).length,
      amt: 5
    },
    {
      name: "6",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 6).length,
      amt: 6
    },
    {
      name: "7",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 7).length,
      amt: 7
    },
    {
      name: "8",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 8).length,
      amt:8
    },
    {
      name: "9",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 9).length,
      amt: 9
    },{
      name: "10",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 10).length,
      amt: 10
    },{
      name: "11",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 11).length,
      amt: 11
    },
    {
      name: "12+",
      "מספר משפחות": props.families.filter((x)=>parseInt(x.numberOfPerson) === 12).length,
      amt: 12
    },
  ];

  return (
    <div>
    <Chart
    width={400}
    height={250}
    data={data}
    margin={{
      top: 5,
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
    <Bar dataKey="מספר משפחות" fill="rgb(8, 196, 221)" />
  </Chart>
  <div className={classes.chart1}>
  הגרף מציג מספר משפחות בעמותה לפי כמות נפשות
  </div>
  </div>

  )}



const mapStateToProps = (state) => {
  return {
    families: state.families,

  };
};

export default connect(mapStateToProps)(BarChart) 