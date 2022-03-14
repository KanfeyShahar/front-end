import React, { useContext ,useEffect,useState} from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import classes from "./Expenses.module.css";

const Prediction = (props)=>{
    const options =props.movements_Inventory.map((x) => ({
        "value": x.nameProducts,
        "label": x.nameProducts,
      }));
      const [product, setProduct] = useState("");
return (
    <div>
    <h1>חיזוי</h1>
     <div >
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
       </div>

)
}

const mapStateToProps = (state) => {
    return {
    movements_Inventory: state.movements_Inventory,
     basket: state.basket,
      };
  };
  
  export default connect(mapStateToProps)(
    Prediction
  );