import "./styles.css";
import React from "react";
import { connect } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



const Monitor = (props) =>{
    let count1=0;
    let count11=0;
    let count2=0;
    let count22=0;
    let count3=0;
    let count33=0;
    let count4=0;
    let count44=0;
    let count5=0;
    let count55=0;
    let count6=0;
    let count66=0;
    let count7=0;
    let count77=0;
    let count8=0;
    let count88=0;
    let count9=0;
    let count99=0;
    let count10=0;
    let count100=0;
    let count110=0;
    let count111=0;
    let count120=0;
    let count122=0;
    props.movements_Inventory.filter((x)=>x.name===props.product && new Date(x.created_date).getMonth()===0 && x.status.includes("מלאי יוצא")).map((x)=>   count1=parseInt(count1)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===0 && x.status.includes("מלאי נכנס")).map((x)=>   count11=parseInt(count11)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===1 && x.status.includes("מלאי יוצא")).map((x)=>   count2=parseInt(count2)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===1 && x.status.includes("מלאי נכנס")).map((x)=>   count22=parseInt(count22)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===2 && x.status.includes("מלאי יוצא")).map((x)=>   count3=parseInt(count3)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===2 && x.status.includes("מלאי נכנס")).map((x)=>   count33=parseInt(count33)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===3 && x.status.includes("מלאי יוצא")).map((x)=>   count4=parseInt(count4)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===3 && x.status.includes("מלאי נכנס")).map((x)=>   count44=parseInt(count44)+parseInt(x.count))
     props.movements_Inventory.filter((x)=>x.name===props.product && new Date(x.created_date).getMonth()===4 && x.status.includes("מלאי יוצא")).map((x)=>   count5=parseInt(count5)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===4 && x.status.includes("מלאי נכנס")).map((x)=>   count55=parseInt(count55)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===5 && x.status.includes("מלאי יוצא")).map((x)=>   count6=parseInt(count6)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===5 && x.status.includes("מלאי נכנס")).map((x)=>   count66=parseInt(count66)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===6 && x.status.includes("מלאי יוצא")).map((x)=>   count7=parseInt(count7)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===6 && x.status.includes("מלאי נכנס")).map((x)=>   count77=parseInt(count77)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===7 && x.status.includes("מלאי יוצא")).map((x)=>   count8=parseInt(count8)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===7 && x.status.includes("מלאי נכנס")).map((x)=>   count88=parseInt(count88)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===8 && x.status.includes("מלאי יוצא")).map((x)=>   count9=parseInt(count9)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===8 && x.status.includes("מלאי נכנס")).map((x)=>   count99=parseInt(count99)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===9 && x.status.includes("מלאי יוצא")).map((x)=>   count10=parseInt(count10)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===9 && x.status.includes("מלאי נכנס")).map((x)=>   count100=parseInt(count100)+parseInt(x.count))
     props.movements_Inventory.filter((x)=>x.name===props.product && new Date(x.created_date).getMonth()===10&& x.status.includes("מלאי יוצא")).map((x)=>   count110=parseInt(count110)+parseInt(x.count))
     props.movements_Inventory.filter((x)=> x.name===props.product && new Date(x.created_date).getMonth()===10 && x.status.includes("מלאי נכנס")).map((x)=>   count111=parseInt(count111)+parseInt(x.count))
     props.movements_Inventory.filter((x)=>x.name===props.product && new Date(x.created_date).getMonth()===11 && x.status.includes("מלאי יוצא")).map((x)=>   count120=parseInt(count120)+parseInt(x.count))
     props.movements_Inventory.filter((x)=>x.name===props.product && new Date(x.created_date).getMonth()===11 && x.status.includes("מלאי נכנס")).map((x)=>   count122=parseInt(count122)+parseInt(x.count))
    const data = [
        {
            
          name: "ינואר",
          'מלאי יוצא':  count1,
          'מלאי נכנס':   count11,
          amt: 1
        },
        {
          name: "פברואר",
          'מלאי יוצא':  count2,
          'מלאי נכנס':   count22,
          amt: 2210
        },
        {
          name: "מרץ",
          'מלאי יוצא':  count3,
          'מלאי נכנס':   count33,
          amt: 2290
        },
        {
          name: "אפריל",
          'מלאי יוצא':  count4,
          'מלאי נכנס':   count44,
          amt: 2000
        },
        {
          name: "מאי",
          'מלאי יוצא':  count5,
          'מלאי נכנס':   count55,
          amt: 2181
        },
        {
          name: "יוני",
          'מלאי יוצא':  count6,
          'מלאי נכנס':   count66,
          amt: 2500
        },
        {
          name: "יולי",
          'מלאי יוצא':  count7,
          'מלאי נכנס':   count77,
          amt: 2100
        },
        {
          name: "אוגוסט",
          'מלאי יוצא':  count8,
          'מלאי נכנס':   count88,
          amt: 2100
        },
        {
          name: "ספטמבר",
          'מלאי יוצא':  count9,
          'מלאי נכנס':   count99,
          amt: 2100
        },
        {
          name: "אוקטובר",
          'מלאי יוצא':  count10,
          'מלאי נכנס':   count100,
          amt: 2100
        },
        {
          name: "נובמבר",
          'מלאי יוצא':  count110,
          'מלאי נכנס':   count111,
          amt: 2100
        },
        {
          name: "דצמבר",
          'מלאי יוצא':  count120,
          'מלאי נכנס':   count122,
          amt: 2100
        }
      ];


  return (
      
    <LineChart
      width={1200}
      height={260}
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
      <Line
        type="monotone"
        dataKey="מלאי נכנס"
        stroke="#06c9e9"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="מלאי יוצא" stroke="#0d7ec0" />
    </LineChart>
 
  );
  
}


const mapStateToProps = (state) => {
    return {
        movements_Inventory: state.movements_Inventory,
  
    };
  };
  
  export default connect(mapStateToProps)(Monitor) 