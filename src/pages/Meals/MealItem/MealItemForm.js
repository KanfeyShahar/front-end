import { useRef,useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 0.2 ||
            enteredAmountNumber > 50
          ) {
            setAmountIsValid(false);
            return;
          }
      
          props.onAddToCart(enteredAmountNumber);
        };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "text",
          min: "1",
          max: "1000",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!amountIsValid && <p>.הקש כמות גדולה מ-0</p>}
    </form>
  );
};

export default MealItemForm;
