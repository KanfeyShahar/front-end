
import React,{Component } from "react";
import { connect } from "react-redux";
import { PieChart, Pie, Legend, Tooltip,XAxis, } from "recharts";
import "./styles.css";



const PieChart1 = (props) => {
    
    
const data = [
    { name: "עובדים", value: props.volunteers.filter((x)=>x.type === "עובד").length },
    { name: "מתנדבים", value: props.volunteers.filter((x)=>x.type === "מתנדב").length },
  ];
  const COLORS = ["rgb(8, 196, 221)", "hsl(245,40%,65%)"];

    return (
        
        <PieChart width={290} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="rgb(8, 196, 221)"
          label
        />
          <Tooltip />
    </PieChart>
  );}


  const mapStateToProps = (state) => {
    return {
      volunteers: state.volunteers,
  
    };
  };
  
  export default connect(mapStateToProps)(PieChart1) 
