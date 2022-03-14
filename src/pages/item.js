import React, { useState, useEffect,useContext } from "react";
import "./item.css";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { addListMarket } from "../actions";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { ListContext} from "../store/list-context";

const Item = (props) => {
  // HINT: each "item" in our list names a name,
  // a boolean to tell if its been completed, and a quantity

  const [items, setItems] = useState([]);
  const list = useContext(ListContext);
  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleAddButtonClick = () => {
      console.log(props.submit)
    if (items.length < 10) {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
        isSelected: false,
      };

      const newItems = [...items, newItem];
      setItems(newItems);
      setInputValue("");
      calculateTotal();
    } else {
      Swal.fire({
        title: "לא ניתן להוסיף יותר מ-10 מוצרים",
        icon: "info",
        confirmButtonText: "אישור",
      });
    }
  };


  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
    calculateTotal();
  };

 

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  return (

    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="הוסף משימה"
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total"> {totalItemCount} :סך הכל משימות</div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
    return {
      list_market: state.list_market,
    };
  };
  
  export default connect(mapStateToProps,{addListMarket})(Item);