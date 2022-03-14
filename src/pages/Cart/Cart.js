import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import {addProductsOrder} from "../../actions/index"

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `₪${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler =async (userData) => {
    setIsSubmitting(true);
    props.addProductsOrder({
      id: parseInt(10000*Math.random().toFixed(4)),
      totalAmount:cartCtx.totalAmount,
      items:cartCtx.items,
      userDate:userData,
      locked:false,
    })
    console.log(props.orders)
    console.log(cartCtx.items);
    console.log(cartCtx.totalAmount);
    console.log(userData);
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          amountActual={item.price*item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          {" "}
          הזמנה
        </button>
      )}
      <button className={classes["button--alt"]} onClick={props.onClose}>
        סגור
      </button>
    </div>
  );
  
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>{totalAmount}</span>
        <span>עלות כוללת</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>שומר הזמנה...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
       <div className={classes.actions}>
      <p>ההזמנה נשלחה בהצלחה</p>
     
      <button className={classes.button} onClick={props.onClose}>
        סיום
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
   {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};



const mapStateToProps = (state) => {
  return {
  orders: state.orders,
  };
};

export default connect(mapStateToProps, {addProductsOrder})(Cart);