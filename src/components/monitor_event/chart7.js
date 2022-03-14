import "./styles.css";
import React from "react";
import { connect } from "react-redux";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";


const Chart7=(props)=> {

const sum1=(array,type)=>{
let sum=0;
for(let i=0;i<array.length;i++){
    if(type==="סל א"){
        sum= sum + array[i].count_real1;
    }else if(type==="סל ב"){
        sum= sum + array[i].count_real2;
    }
    else if(type==="סל ג"){
        sum= sum + array[i].count_real3;
    }
    else if(type==="סל ד"){
        sum= sum + array[i].count_real4;
    }
    else if(type==="סל ה"){
        sum= sum + array[i].count_real5;
    }
   
}
return sum
}
console.log(props.type)
    const data =props.events
    .filter((x) => x.status === true && x.type==="סל מזון")
    .map((x) => ({
      name: new Date(x.startDate).toLocaleDateString("en-GB"),
      "כמות משפחות": props.type==="סל א"? x.basket1:props.type==="סל ב"?x.basket2:props.type==="סל ג"?(x.basket3):props.type==="סל ד"?(x.basket4):x.basket5,
      "כמות מוצרים":sum1(props.Basket.filter((y)=>y.startDate === x.startDate),props.type)

    }));
  return (
    <ComposedChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="כמות מוצרים" barSize={20} fill="#06c9e9" />
      <Line type="monotone" dataKey="כמות משפחות" stroke="#413ea0" />
    </ComposedChart>
  );
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        Basket:state.Basket
    };
  };
  
  export default connect(mapStateToProps)(
    Chart7
  );
  