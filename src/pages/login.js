import React, { useState, useRef, useEffect,useContext, Fragment } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { NavLink} from 'react-router-dom';
import { getUsers,loadingData } from "../actions";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./login.module.css";
import logo from "../pages/image/logo.jpg";
import classes1 from "./auth.module.css";
import Loader from "./loader";
import Card1 from "./Card1";
import { AuthContext } from "../store/auth-context";

const Login = (props) => {
  const auth = useContext(AuthContext)
  useEffect(() => {
    props.getUsers();
  }, []);
  const [loading,setloading]=useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    password: true,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

const enteredEmail1 = email;
 const enteredPassword1 = password;

 const check = props.users.filter((y)=>y.email === email && y.status === true).length>0

 const check2 = props.users.filter((y)=>y.password === password ).length>0

const enterdEmailIsValid2 = (/^\S+@\S+\.\S+$/.test(enteredEmail1) && check) || email ==="" ;
const enterdPasswordIsValid2 = (password.length > 6) || (password === "");


const valid =()=>{
  const enterdEmailIsValid = /^\S+@\S+\.\S+$/.test(enteredEmail1) && check;
  const enterdPasswordIsValid = enteredPassword1.length > 6;
if(enterdEmailIsValid && enterdPasswordIsValid){
  return <button class="btn btn-primary" onClick={()=><NavLink to="/home"></NavLink>}>אישור</button>
}
else{
  return <button className="btn btn-secondary" disabled>
  אישור
</button>
}
}

  const confirmHandler = async (event) => {
    const user= props.users.filter((y)=>y.email === email )
    user.map((x)=>x.password=enteredPassword1)
    event.preventDefault();
    try{
     setloading(true)
     await axios.post('https://kanfey-shahar-backend.herokuapp.com/user_login',user).then((res)=>{
       setloading(false)
       console.log(res.data)
      auth.login(res.data.userId,res.data.token)
      })
    }catch(err){
      setloading(false)
      Swal.fire({
        icon: "error",
        text: "סיסמה שגויה, במידה ושכחת סיסמה פנה למנהל המערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    }

  };

  return (
    <Fragment>
       {loading && <Loader/>}
    <Card1 className={classes1.authentication}>
      <h2>כניסה למערכת</h2>
      <hr />

      <form className={classes1.card} onSubmit={confirmHandler}>
        {!enterdEmailIsValid2 ? (
          <p className={classes1.invalid1}>אימייל</p>
        ) : (
          <labal>אימייל</labal>
        )}
        <div>
          <input
            id="email"
            type="email"
            className="form-control"
            ref={emailInputRef}
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!enterdEmailIsValid2 && (
            <p className={classes1.invalid}>אימייל לא קיים במערכת- פנה למנהל המערכת</p>
          )}
        </div>
        <br />
        {!enterdPasswordIsValid2? (
          <p className={classes1.invalid1}>סיסמה</p>
        ) : (
          <labal>סיסמה</labal>
        )}
        <div></div>
        <input
          id="password"
          type="password"
          className="form-control"
          ref={passwordInputRef}
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!enterdPasswordIsValid2 && (
          <p className={classes1.invalid}>סיסמה שגויה </p>
        )}
        <br />
        <br />
        {valid()}
      </form>
    </Card1>
    </Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    users: state.users,
    Loading:state.Loading
  };
};

export default connect(mapStateToProps,{getUsers,loadingData})(Login);
