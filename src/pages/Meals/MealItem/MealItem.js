import React,{useContext} from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm"
import CartContext from "../../../store/cart-context";

export const MealItem = ({ props, getSelectedName, getSelectedProductNote,getSelectedCategory,getSelectedType,getSelectedSize,getSelectedPrice}) => {

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.code,
      name: props.name,
      price: props.price,
      amount:amount,
      amountActual:amount,
      priceActual:amount*props.price,
      type:props.type,
      manufacture:props.manufacture,
      productNote:props.productNote,
      size:props.size,
      
    });
  };
  return (
    
    <tr>
      {console.log(props)}
      <td>{props.code}</td>
      <td onDoubleClick={() => getSelectedName(props.code)}>{props.name}</td>
      <td onDoubleClick={() => getSelectedProductNote(props.code)}>
        {props.productNote}
      </td>
      <td onDoubleClick={() => getSelectedType(props.code)}>{props.type}</td>
      <td onDoubleClick={() => getSelectedCategory(props.code)}>{props.manufacture}</td>
      <td onDoubleClick={() => getSelectedSize(props.code)}>{props.size}</td>
      <td onDoubleClick={() => getSelectedPrice(props.code)}>₪{props.price}</td>
      <td >
        <MealItemForm id={props.code} onAddToCart={addToCartHandler}/>
      </td>
      {/* <td>40</td> */}
     
 
      

      {/* <td>{formatDateToString(props.created_date)}</td> */}
     
      {/* <td className={((!props.status) && classes.show) || ((props.status) && classes.showHidden)} > {formatDateToString(props.dateEnd)}</td> */}
      
    
           
    </tr>
   
         
  );
};

export default MealItem;


