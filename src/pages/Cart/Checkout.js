import React,{useRef,useState} from 'react';
import classes from './Checkout.module.css'



const isEmpty = value => value.trim() ==='';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = props => {

    const [formInputsValidity, setFormInputsValidity] =useState({
        name:true,
    });
    const nameInputRef= useRef();
    const centerInputRef= useRef();
    const DateInputRef=useRef();
    const descriptionInputRef=useRef();

    const confirmHandler=(event) => {
        event.preventDefault();

        const enteredName=nameInputRef.current.value;
        const enteredCenter=centerInputRef.current.value;
        const enteredDate=DateInputRef.current.value;
        const enteredDescription=descriptionInputRef.current.value;
    
        const enterdNameIsValid =!isEmpty(enteredName)

        setFormInputsValidity({
            name:enterdNameIsValid
        })

        const formIsValid =enterdNameIsValid;
        if(!formIsValid){
            return;
        }
        const min= 2000;
        const max= 1000000;

        props.onConfirm({
            id: parseInt(10000*Math.random().toFixed(4)),
            name:enteredName,
            center:enteredCenter,
            endDate:enteredDate,
            date: new Date(),
            supplier:false,
            status:false,
            endDateActual:enteredDate,
            desciption:enteredDescription,
            
        })

    };

    return <form onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputsValidity.name ? '': classes.invalid}`}>
            <label htmlFor="name">שם מבצע ההזמנה</label>
            <input type="text" id="name" ref={nameInputRef}/>
            {!formInputsValidity.name && <p>נא כתוב את שם מבצע ההזמנה</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor="center">מרכז</label>
            <input type="text" id="center" ref={centerInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="endDate">תאריך אספקה</label>
          <input type='date' id="endDate" min='2019-01-01' ref={DateInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="description">הערות</label>
            <textarea class="form-control" id="description" rows="3" ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.actions}>
        <button className={classes.submit}>אישור</button>
      
        <button  type='button' onClick={props.onCancel}>ביטול</button>
        </div>
    </form>

}

export default Checkout

  