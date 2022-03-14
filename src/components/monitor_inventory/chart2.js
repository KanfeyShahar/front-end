import classes from "./style.module.css";
import React, { useState } from "react";
import Select from 'react-select'
import { connect } from "react-redux";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";




const Chart2 = (props,product) => { 
    
   
    let count1=0;
    let count2=0;
    let count3=0;
    let count4=0;
    let count5=0;
    let count6=0;
    let count7=0;
    let count8=0;
    let count9=0;
    let count10=0;
    let count11=0;
    let count12=0;
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===0 && x.name.localeCompare(props.product)===0 && x.status.includes("מלאי נכנס")).map((x)=> count1=parseInt(count1)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===1 && x.name.localeCompare(props.product) && x.status.includes("מלאי נכנס")).map((x)=> count2=parseInt(count2)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===2 && x.name.localeCompare(props.product) && x.status.includes("מלאי נכנס")).map((x)=> count3=parseInt(count3)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===3 && x.name.localeCompare(props.product) && x.status.includes("מלאי נכנס")).map((x)=> count4=parseInt(count4)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===4 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count5=parseInt(count5)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===5 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count6=parseInt(count6)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===6 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count7=parseInt(count7)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===7 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count8=parseInt(count8)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===8 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count9=parseInt(count9)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===9 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count10=parseInt(count10)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===10 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count11=parseInt(count11)+parseInt(x.count))
    props.movements_Inventory.filter((x)=> new Date(x.created_date).getMonth()===11 && x.name.localeCompare(product) && x.status.includes("מלאי נכנס")).map((x)=> count12=parseInt(count12)+parseInt(x.count))
 const data = [
  {
    name: "ינואר",
    "כמות הפריטים שהוזמנו": count1,
    "": count1,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "פברואר",
    "כמות הפריטים שהוזמנו": count2,
    "": count2,
    pv: 800,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "מרץ",
    "כמות הפריטים שהוזמנו": count3,
    "": count3,
    pv: 800,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "אפריל",
    "כמות הפריטים שהוזמנו": count4,
    "": count4,
    pv: 800,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "מאי",
    "כמות הפריטים שהוזמנו": count5,
    "": count5,
    pv: 800,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "יוני",
    "כמות הפריטים שהוזמנו": count6,
    "": count6,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: "יולי",
    "כמות הפריטים שהוזמנו": count7,
    "": count7,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: "אוגוסט",
    "כמות הפריטים שהוזמנו": count8,
    "": count8,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: "ספטמבר",
    "כמות הפריטים שהוזמנו": count9,
    "": count9,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: "אוקטובר",
    "כמות הפריטים שהוזמנו": count10,
    "": count10,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: "נובמבר",
    "כמות הפריטים שהוזמנו": count11,
    "": count11,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: "דצמבר",
    "כמות הפריטים שהוזמנו": count12,
    "": count12,
    pv: 800,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

  return (
    <div>
        <div className={classes.row} >
     
      </div>
      <div>
      <ComposedChart
        width={900}
        height={270}
        z-index={-1}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
          
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="" barSize={20} fill="#06c9e9" />
        <Line type="monotone" dataKey="כמות הפריטים שהוזמנו" stroke="#050452" />
      </ComposedChart>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsInventory: state.productsInventory,
    products:state.products,
    movements_Inventory: state.movements_Inventory,
  };
};

export default connect(mapStateToProps)(Chart2);
