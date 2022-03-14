import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { connect } from "react-redux";
import { getStores } from "../actions";
import * as IoIcons from "react-icons/io";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import {
  selectRow,
  updateRowFamilyEvent,
  updatePhone,
  getMovements,
  getBasket,
  getFamilyEvents,
  getEvents,
  getFamily
} from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import classes3 from "./Expenses.module.css";
import classes4 from "./containerItem.module.css";
import { ListContext } from "../store/list-context";
import "./switch.css";
import "./row.css";
import Chart7 from "../components/monitor_event/chart7";
import Chart8 from "../components/monitor_event/chart8";

const EqualsPrice = (props) => {
  useEffect(() => {
    props.getMovements();
    props.getBasket();
    props.getFamilyEvents();
    props.getEvents();
    props.getFamily()
  }, []);
  const [store, setStore] = useState([]);
  const [submit, setsubmit] = useState(false);
  const [product1, setproduct1] = useState("");
  var unique = [];
  for (let i = 0; i < props.movements_Inventory.length; i++) {
    if (
      unique.findIndex(
        (arr) => arr.name === props.movements_Inventory[i].name
      ) < 0
    ) {
      unique.push(props.movements_Inventory[i]);
    }
  }

  const confirmHandler = async () => {
    setsubmit(true);
    setStore(props.movements_Inventory);
  };
  const options1 = unique.map((x) => ({
    value: x.name,
    label: x.name,
  }));
  const options = [
    { value: "סל א", label: "סל א" },
    { value: "סל ב", label: "סל ב" },
    { value: "סל ג", label: "סל ג" },
    { value: "סל ד", label: "סל ד" },
    { value: "סל ה", label: "סל ה" },
  ];
  const options2 = props.events.filter((x)=>x.type==="סל מזון").map((x) => ({
    value: new Date(x.startDate).toLocaleDateString("en-GB"),
    label: new Date(x.startDate).toLocaleDateString("en-GB"),
  }));

  const [product, setProduct] = useState("");
  const [product11, setProduct11] = useState("");
  let baskekList = props.events
  baskekList.sort(
        (a, b) =>
          new Date(b.startDate).getTime() -
          new Date(a.startDate).getTime()
      )
  
 
  let family = props.familyEvents.filter(
    (x) =>
      new Date(x.startDate).getMonth() - new Date().getMonth() < 6 &&
      new Date(x.startDate).getFullYear() - new Date().getFullYear() < 2 &&
      props.events.filter(
        (y) => y.startDate === x.startDate && y.type === "סל מזון"
      )
  );
  const basket_sum = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<10 ? baskek_sum.length:11
    let sum=0;
    let count=0
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket1)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket_sum_average = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
    let sum=0;
    let count=baskek_sum.length<10 ? baskek_sum.length:11;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket1))
    }
  
    return sum/count;
  };

  const basket_sum_average2 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
    let sum=0;
    let count=baskek_sum.length<10 ? baskek_sum.length:11;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket2))
    }
  
    return sum/count;
  };


  const basket_sum_average3 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
    let sum=0;
    let count=baskek_sum.length<10 ? baskek_sum.length:11;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket3))
    }
  
    return sum/count;
  };

  const basket_sum_average4 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
    let sum=0;
    let count=baskek_sum.length<10 ? baskek_sum.length:11;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket4))
    }
  
    return sum/count;
  };

  const basket_sum_average5 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
    let sum=0;
    let count=baskek_sum.length<10 ? baskek_sum.length:11;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket5))
    }
  
    return sum/count;
  };


  const basket_sum_average11 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<9 ? baskek_sum.length:9
        let sum=0;
        let count=baskek_sum.length<9 ? baskek_sum.length:9;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket1))
    }
  
    return sum/count;
  };

  const basket_sum_average22 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<9 ? baskek_sum.length:9
        let sum=0;
        let count=baskek_sum.length<9 ? baskek_sum.length:9;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket2))
    }
  
    return sum/count;
  };


  const basket_sum_average33 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<9 ? baskek_sum.length:9
        let sum=0;
        let count=baskek_sum.length<9 ? baskek_sum.length:9;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket3))
    }
  
    return sum/count;
  };

  const basket_sum_average44 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<9 ? baskek_sum.length:9
        let sum=0;
        let count=baskek_sum.length<9 ? baskek_sum.length:9;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket4))
    }
  
    return sum/count;
  };

  const basket_sum_average55 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<9 ? baskek_sum.length:9
        let sum=0;
        let count=baskek_sum.length<9 ? baskek_sum.length:9;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket5))
    }
  
    return sum/count;
  };



  const basket_sum_average111 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<8 ? baskek_sum.length:8
    let sum=0;
    let count=baskek_sum.length<8? baskek_sum.length:8;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket1))
    }
  
    return sum/count;
  };

  const basket_sum_average222 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<8 ? baskek_sum.length:8
        let sum=0;
        let count=baskek_sum.length<8 ? baskek_sum.length:8;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket2))
    }
  
    return sum/count;
  };


  const basket_sum_average333 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<8 ? baskek_sum.length:8
        let sum=0;
        let count=baskek_sum.length<8? baskek_sum.length:8;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket3))
    }
  
    return sum/count;
  };

  const basket_sum_average444 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<8 ? baskek_sum.length:8
        let sum=0;
        let count=baskek_sum.length<8 ? baskek_sum.length:8;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket4))
    }
  
    return sum/count;
  };

  const basket_sum_average555 = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<8 ? baskek_sum.length:8
        let sum=0;
        let count=baskek_sum.length<8 ? baskek_sum.length:8;
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket5))
    }
  
    return sum/count;
  };




  const basket2_sum = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<10 ? baskek_sum.length:11
    let sum=0;
    let count=0
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket2)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };
  const basket3_sum = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<10 ? baskek_sum.length:11
    let sum=0;
    let count=0
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket3)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };
  const basket4_sum = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<10 ? baskek_sum.length:11
    let sum=0;
    let count=0
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket4)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };
  const basket5_sum = () => {
    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<10 ? baskek_sum.length:11
    let sum=0;
    let count=0
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket5)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket1_sum2 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<9 ? baskek_sum.length:10
    let sum=basket_sum()*(max);
    let count=(max)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket1)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket1_sum3 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<8 ? baskek_sum.length:9
    let sum=basket_sum()*(max)+basket1_sum2()*(max-1)
    let count=(max+max-1)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket1)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket2_sum2 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<9 ? baskek_sum.length:10
    let sum=basket2_sum()*(max);
    let count=(max)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket2)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket2_sum3 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<8 ? baskek_sum.length:9
    let sum=basket2_sum()*(max)+basket2_sum2()*(max-1)
    let count=(max+max-1)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket2)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };



  const basket3_sum2 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<9 ? baskek_sum.length:10
    let sum=basket3_sum()*(max);
    let count=(max)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket3)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket3_sum3 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<8 ? baskek_sum.length:9
    let sum=basket3_sum()*(max)+basket3_sum2()*(max-1)
    let count=(max+max-1)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket3)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };



  const basket4_sum2 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<9 ? baskek_sum.length:10
    let sum=basket4_sum()*(max);
    let count=(max)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket4)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket4_sum3 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<8 ? baskek_sum.length:9
    let sum=basket4_sum()*(max)+basket3_sum2()*(max-1)
    let count=(max+max-1)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket4)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };


  const basket5_sum2 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<9 ? baskek_sum.length:10
    let sum=basket5_sum()*(max);
    let count=(max)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket5)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const basket5_sum3 = () => {

    let baskek_sum = props.events.filter((x)=>x.status===true)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
    let max=baskek_sum.length<8 ? baskek_sum.length:9
    let sum=basket5_sum()*(max)+basket3_sum2()*(max-1)
    let count=(max+max-1)
    for(let i=0; i<max;i++){
      sum=sum+(parseInt(baskek_sum[i].basket5)*(max-i))
      count=count+(max-i)
    }
  
    return sum/count;
  };

  const type_MAD_1 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0; i<max;i++){
          sum=sum+(parseInt(baskek_sum[i].basket1)*(max-i))
          count=count+(max-i)
    }
  let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket1))[0]
    type=parseInt(sum/count)-parseInt(z)
  
    return parseInt(type);
  };
  const type_MAD_22 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    let avarage=0;
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0;i<max;i++){
          let max1=(baskek_sum.length-i)<(10-i) ? (baskek_sum.length-i):(10-i)
          for(let i=0; i<max1;i++){
            sum=sum+(parseInt(baskek_sum[i].basket2)*(max-i))
            count=count+(max-i)
      }
      avarage=sum/count
      }
     
    let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket2))[0]
    type=parseInt(avarage)-parseInt(z)
  
    return parseInt(type);
  };

  const type_MAD_33 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    let avarage=0;
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0;i<max;i++){
          let max1=(baskek_sum.length-i)<(10-i) ? (baskek_sum.length-i):(10-i)
          for(let i=0; i<max1;i++){
            sum=sum+(parseInt(baskek_sum[i].basket3)*(max-i))
            count=count+(max-i)
      }
      avarage=sum/count
      }
     
    let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket3))[0]
    type=parseInt(avarage)-parseInt(z)
  
    return parseInt(type);
  };

  const type_MAD_44 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    let avarage=0;
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0;i<max;i++){
          let max1=(baskek_sum.length-i)<(10-i) ? (baskek_sum.length-i):(10-i)
          for(let i=0; i<max1;i++){
            sum=sum+(parseInt(baskek_sum[i].basket4)*(max-i))
            count=count+(max-i)
      }
      avarage=sum/count
      }
     
    let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket4))[0]
    type=parseInt(avarage)-parseInt(z)
  
    return parseInt(type);
  };

  const type_MAD_55 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    let avarage=0;
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0;i<max;i++){
          let max1=(baskek_sum.length-i)<(10-i) ? (baskek_sum.length-i):(10-i)
          for(let i=0; i<max1;i++){
            sum=sum+(parseInt(baskek_sum[i].basket5)*(max-i))
            count=count+(max-i)
      }
      avarage=sum/count
      }
     
    let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket5))[0]
    type=parseInt(avarage)-parseInt(z)
  
    return parseInt(type);
  };




  const type_MAD_11 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    let avarage=0;
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0;i<max;i++){
          let max1=(baskek_sum.length-i)<(10-i) ? (baskek_sum.length-i):(10-i)
          for(let i=0; i<max1;i++){
            sum=sum+(parseInt(baskek_sum[i].basket1)*(max-i))
            count=count+(max-i)
      }
      avarage=sum/count
      }
     
    let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket1))[0]
    type=parseInt(avarage)-parseInt(z)
  
    return parseInt(type);
  };

  const type_MAD_2 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0; i<max;i++){
          sum=sum+(parseInt(baskek_sum[i].basket2)*(max-i))
          count=count+(max-i)
    }
  let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket2))[0]
    type=parseInt(sum/count)-parseInt(z)
  
    return parseInt(type);
  };

  const type_MAD_3 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0; i<max;i++){
          sum=sum+(parseInt(baskek_sum[i].basket3)*(max-i))
          count=count+(max-i)
    }
  let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket3))[0]
    type=parseInt(sum/count)-parseInt(z)
  
    return parseInt(type);
  };


  const type_MAD_4 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0; i<max;i++){
          sum=sum+(parseInt(baskek_sum[i].basket4)*(max-i))
          count=count+(max-i)
    }
  let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket4))[0]
    type=parseInt(sum/count)-parseInt(z)
  
    return parseInt(type);
  };


  const type_MAD_5 = () => {
    if(product11===""){
      return 0;
    }
    let baskek_sum = props.events.filter((x)=>(new Date(x.startDate)<=new Date(product11))&&x.type==="סל מזון")
    console.log(baskek_sum)
    baskek_sum.sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        )
        let max=baskek_sum.length<10 ? baskek_sum.length:10
        let sum=0;
        let count=0
        for(let i=0; i<max;i++){
          sum=sum+(parseInt(baskek_sum[i].basket5)*(max-i))
          count=count+(max-i)
    }
  let type=0
    let z=(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket5))[0]
    type=parseInt(sum/count)-parseInt(z)
  
    return parseInt(type);
  };


  let family_new=props.families.filter((x)=>x.food && x.status).length
  const items = [
    { date: new Date(), basket1: parseInt(basket_sum()),basket2: parseInt(basket2_sum()),basket3: parseInt(basket3_sum()),basket4: parseInt(basket4_sum()),basket5: parseInt(basket5_sum()) },
    { date: new Date(), basket1: parseInt(basket_sum_average()),basket2: parseInt(basket_sum_average2()),basket3: parseInt(basket_sum_average3()),basket4: parseInt(basket_sum_average4()),basket5: parseInt(basket_sum_average5()) },
    { date: (new Date()).setDate((new Date()).getDate()+12), basket1: parseInt(basket1_sum2()),basket2: parseInt(basket2_sum2()) ,basket3: parseInt(basket3_sum2()),basket4: parseInt(basket4_sum2()),basket5: parseInt(basket5_sum2())},
    { date: (new Date()).setDate((new Date()).getDate()+12), basket1: parseInt(basket_sum_average11()),basket2: parseInt(basket_sum_average22()),basket3: parseInt(basket_sum_average33()),basket4: parseInt(basket_sum_average44()),basket5: parseInt(basket_sum_average55()) },
    { date: (new Date()).setDate((new Date()).getDate()+24), basket1: parseInt(basket1_sum3()),basket2: parseInt(basket2_sum3()),basket3: parseInt(basket3_sum3()),basket4: parseInt(basket4_sum3()),basket5: parseInt(basket5_sum3()) },
    { date: (new Date()).setDate((new Date()).getDate()+24), basket1: parseInt(basket_sum_average111()),basket2: parseInt(basket_sum_average222()),basket3: parseInt(basket_sum_average333()),basket4: parseInt(basket_sum_average444()),basket5: parseInt(basket_sum_average555()) },
  ];

  const items1 = [
    { type:"מצב קיים",basket1:(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket1)) ,basket2: (props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket2)),basket3: (props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket3)),basket4: (props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket4)),basket5:(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket5)) },
    { type:"הפרש",basket1: type_MAD_1(),basket2: parseInt(type_MAD_2()),basket3: parseInt(type_MAD_3()),basket4: parseInt(type_MAD_4()),basket5: parseInt(type_MAD_5()) },
    { type:"MAD", basket1: parseInt(type_MAD_11()),basket2: parseInt(type_MAD_22()),basket3: parseInt(type_MAD_33()),basket4: parseInt(type_MAD_44()),basket5: parseInt(type_MAD_55()) },
    
  ];

  return (
    <div>
       {console.log(product11)}
      {console.log(props.events.filter((x) => new Date(x.startDate).toLocaleDateString("en-GB")===(product11)).map((z)=>z.basket1))}
      <h1 className={classes1.newexpense6}>חיזוי סלים</h1>
      <div className={classes4.card}>
        <div style={{ maxWidth: "200%" }}>
          <div className={classes.tablewrappe22}>
            <div className={classes.direction}>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className={classes.header} th scope="col">
                      תאריכים
                    </th>
                    <th className={classes.header} th scope="col">
                      סל א
                    </th>
                    <th className={classes.header} th scope="col">
                      סל ב
                    </th>
                    <th className={classes.header} th scope="col">
                    סל ג
                    </th>
                    <th className={classes.header} th scope="col">
                  סל ד
                    </th>
                    <th className={classes.header} th scope="col">
                 סל ה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((x) => (
                    <tr>
                      <td>{new Date(x.date).toLocaleDateString("en-GB")}</td>
                      <td>{x.basket1}</td>
                      <td>{x.basket2}</td>
                      <td>{x.basket3}</td>
                      <td>{x.basket4}</td>
                      <td>{x.basket5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       
      
      </div>
      <div className={classes4.card4}>
      <Select
          className="mt-4 col-md-6 col-offset-4"
          options={options2}
          placeholder="בחר תאריך אירוע "
          onChange={(e) => {
            setProduct11(e.value);
          }}
          value={options2.filter((x) => product11 === x.value)}
          autoFocus={true}
        />
        </div>
      <div className={classes4.card3}>
      <div style={{ maxWidth: "200%" }}>
          <div className={classes.tablewrappe22}>
            <div className={classes.direction}>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className={classes.header} th scope="col">
                  
                    </th>
                    <th className={classes.header} th scope="col">
                      סל א
                    </th>
                    <th className={classes.header} th scope="col">
                      סל ב
                    </th>
                    <th className={classes.header} th scope="col">
                    סל ג
                    </th>
                    <th className={classes.header} th scope="col">
                  סל ד
                    </th>
                    <th className={classes.header} th scope="col">
                 סל ה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items1.map((x) => (
                    <tr>
                      <td>{x.type}</td>
                      <td>{x.basket1}</td>
                      <td>{x.basket2}</td>
                      <td>{x.basket3}</td>
                      <td>{x.basket4}</td>
                      <td>{x.basket5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </div>
      <div className={classes3.expenses_basket}>
התפלגות סלים ומוצרים באירוע
      </div>
      <div className={classes4.card1}>
       
          <div className={classes3.expenses955}>
        <Select
          className="mt-4 col-md-6 col-offset-4"
          options={options}
          placeholder="בחר סל "
          onChange={(e) => {
            setProduct(e.value);
          }}
          value={options.filter((x) => product === x.value)}
          autoFocus={true}
        />
      
      </div>
      <Chart7 type={product}/>
          </div>
      
          <div className={classes4.card2}>
          <div className={classes3.expenses9555}>
        <Select
          className="mt-4 col-md-6 col-offset-4"
          options={options1}
          placeholder="בחר מוצר "
          onChange={(e) => {
            setproduct1(e.value);
          }}
          value={options1.filter((x) => product1 === x.value)}
          autoFocus={true}
        />
      
      </div>
      <Chart8 type={product1}/>
          </div>
          <br/>
          <br/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    families:state.families,
    familyEvents: state.familyEvents,
    events: state.events,
    type: state.type,
    selectedDate: state.selectedDate,
    stores: state.stores,
    list_market: state.list_market,
    movements_Inventory: state.movements_Inventory,
    basket: state.Basket,
  };
};

export default connect(mapStateToProps, {
  getMovements,
  getBasket,
  getFamilyEvents,
  getEvents,
  getFamily
})(EqualsPrice);
