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


const Chart8=(props)=> {

const sum1=(array)=>{
let sum=0;
for(let i=0;i<array.length;i++){
    sum=sum+array[i].sum
   
}
return sum
}
console.log(props.type)
const data =props.events
.filter((x) => x.status === true && x.type==="סל מזון")
    .map((x) => ({
      name: new Date(x.startDate).toLocaleDateString("en-GB"),
      "כמות מוצרים":sum1(props.Basket.filter((y)=>y.startDate === x.startDate && y.nameProducts ==props.type))

    }));
  return (
    <ComposedChart
      width={600}
      height={290}
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
      <Bar dataKey="כמות מוצרים" barSize={20} fill="#413ea0" />
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
    Chart8
  );
  