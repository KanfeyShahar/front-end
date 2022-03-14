import React,{useState,useEffect} from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import Monitor from "../components/monitor_inventory/chart1"
import TableEvent from "../components/monitor_inventory/tableInventoryMonth."
import TableCar from "../components/monitor_inventory/carChart"
import TableCar1 from "../components/monitor_inventory/carChart1"
import Chart2 from "../components/monitor_inventory/chart2";
import classes from "./Expenses.module.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProducts,getCars,getMovements,getInventory} from "../actions";
import InventoryMonitor from "./InventoryMonitor";




const Monitor_inventory = (props) => {
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
  useEffect(() => {
    props.getProducts()
    props.getCars()
    props.getMovements()
    props.getInventory()

  },[]);
    const options =unique.map((x) => ({
        "value": x.name,
        "label": x.name,
      }));
      const [product, setProduct] = useState("");
      const handleClick = (name) => {
        setProduct(name);
      };
    return (
        <div>
          
        <h1 className={classes.expenseH3}> בקרת מלאי וציוד</h1>
        <Tabs>
    <TabList>
    <Tab>התראות</Tab>
    <Tab>בקרת מלאי מינימום</Tab>
     
    </TabList>
    <TabPanel>
   
        <div className={classes.expenses90}>
        רכבים שהטסט שלהם פג תוקפו החודש
          <TableCar/>
      </div>
      <div className={classes.expenses92}>
      מוצרים שפג תוקפם החודש
          <TableEvent/>
         
      </div>
      <div className={classes.expenses900}>
        רכבים שנדרשים לטיפול בחודש הקרוב
          <TableCar1/>
      </div>
    
          {/* <div className={classes.expenses96}>
      
      <Chart2 product={product} />
     
      </div> */}
      <div className={classes.expenses91}>
         <label className={classes.expenses94}>מלאי נכנס מול מלאי יוצא</label>
         <div className={classes.expenses9110}>
      <Select
        className="mt-4 col-md-6 col-offset-4"
        options={options}
        placeholder="בחר מוצר "
        onChange={(e)  => {
            setProduct(e.value)
        }}
       
        value={options.filter((x) => product===(x.value))}
        autoFocus={true}
      />
       </div>
          <Monitor product={product}/>
      </div>
      </TabPanel>
      <TabPanel>
        <InventoryMonitor/>
      </TabPanel>
      </Tabs>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      products:state.products,
      movements_Inventory:state.movements_Inventory
    };
  };
  
  export default connect(mapStateToProps,{getProducts,getCars,getMovements,getInventory})(Monitor_inventory);
  