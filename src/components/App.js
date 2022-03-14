import React, {
  Fragment,
  useState,
  useCallback,
  Suspense,
  useEffect,
} from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { toggleActiveV, addToken, RemoveToken} from "../actions";
// import Header from './components/Layout/Header';
import Calender from "../pages/Calender";
// import MainNavigation from "./Navigation/MainNavigation";
import Layout from "./Navigation/Layout";
import LayoutLogin from "./Navigation/LayoutLogin";
import Help from "../pages/help";
import Loader from "../pages/loader";
import { AuthContext } from "../store/auth-context";

const Family = React.lazy(() => import("../pages/family"));
const Prediction = React.lazy(() => import("../pages/prediction"));
const Halls = React.lazy(() => import("../pages/halls"));
const Volunteers = React.lazy(() => import("../pages/volunteers"));
const InventoryProducts = React.lazy(() =>
  import("../pages/InventoryProducts")
);
const MovementsInventory = React.lazy(() => import("../pages/inventoryOut"));
const Goods = React.lazy(() => import("../pages/goods"));
const Cars = React.lazy(() => import("../pages/cars"));
const Shop = React.lazy(() => import("../pages/cart"));
const Event = React.lazy(() => import("../pages/event"));
const OrderList = React.lazy(() => import("../pages/familyListPage"));
const Deliver = React.lazy(() => import("../pages/volunteersEvents"));
const Distribution = React.lazy(() => import("../pages/distribution"));
const FamilyEvent = React.lazy(() => import("../pages/familyEvents"));
const Basket = React.lazy(() => import("../pages/baskets"));
const Home = React.lazy(() => import("../pages/home"));
const Login = React.lazy(() => import("../pages/login"));
const InventoryEvents = React.lazy(() => import("../pages/inventory_events"));
const Counter_inventory = React.lazy(() =>
  import("../pages/counter_inventory")
);
const Direction = React.lazy(() => import("../pages/directionUser"));
const Monitor_Event = React.lazy(() => import("../pages/Monitor_Event"));
const HistoryEvent = React.lazy(() => import("../pages/HistoryEvent"));
const Monitor_inventory = React.lazy(() =>
  import("../pages/monitor_inventory")
);
const Rooms = React.lazy(() => import("../pages/rooms"));
const Permission = React.lazy(() => import("../pages/permission"));
const EqualsPrice = React.lazy(() => import("../pages/equals"));
const Users = React.lazy(() => import("../pages/users"));
const Calender2 = React.lazy(() => import("../pages/CalenderRooms"));
const Calender1 = React.lazy(() => import("../pages/CalenderRoom"));
const Equipments = React.lazy(() => import("../pages/equipment"));
const InventoryProductsHistory = React.lazy(() =>
  import("../pages/InventoryProductsHistory")
);

export const App = (props) => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [user, setUser] = useState("");
  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    setUser(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Fragment>
        <Routes>
        <Route
            exact
            path="/order/equals"
            element={<EqualsPrice />}
          />
        <Route
            exact
            path="/inventory/prediction"
            element={<Prediction />}
          />
          <Route
            exact
            path="/inventory/history"
            element={<InventoryProductsHistory />}
          />
          <Route
            exact
            path="/inventory/counter_events"
            element={<InventoryEvents />}
          />
           <Route
            exact
            path="/orders/monitor_hall"
            element={<Halls />}
          />

          <Route
            exact
            path="/inventory/counter"
            element={<Counter_inventory />}
          />

          <Route exact path="/direction" element={<Direction />} />

          <Route exact path="/events/monitor" element={<Monitor_Event />} />

          <Route exact path="/users/management" element={<Users />} />

          <Route exact path="/events/history" element={<HistoryEvent />} />

          <Route
            exact
            path="/inventory/monitor"
            element={<Monitor_inventory />}
          />

          <Route exact path="/orders/monitor_rooms" element={<Rooms />} />

          <Route exact path="/users/permission" element={<Permission />} />

          <Route exact path="/family/register" element={<Family />} />

          <Route exact path="/help" element={<Help />} />

          <Route exact path="/order/cart" element={<Shop />} />

          <Route exact path="/order/List" element={<OrderList />} />

          <Route exact path="/volunteers/register" element={<Volunteers />} />

          <Route
            exact
            path="/inventory/products"
            element={<InventoryProducts />}
          />

          <Route exact path="/inventory/goods" element={<Goods />} />

          <Route exact path="/inventory/cars" element={<Cars />} />

          <Route
            exact
            path="/inventory/stock_Movements"
            element={<MovementsInventory />}
          />

          <Route
            exact
            path="/order/stock_Movements/orders"
            element={<Cars />}
          />

          <Route exact path="/events/management" element={<Event />} />

          <Route exact path="/events/distibution" element={<Deliver />} />

          <Route exact path="/volunteers/events" element={<Distribution />} />

          <Route exact path="/family/events" element={<FamilyEvent />} />

          <Route exact path="/events/baskets" element={<Basket />} />

          <Route exact path="/home" element={<Home />} user={user} />

          <Route exact path="/inventory/equipments" element={<Equipments />} />

          <Route exact path="/orders/calender" element={<Calender1 />} />

          <Route exact path="/orders/calender_rooms" element={<Calender2 />} />
           <Route exact path="/" element={<Home user={user}/>} />
        </Routes>
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Routes>
          {token && <Route exact path="/" element={<Home user={user} />} />}
          {!token && <Route exact path="/" element={<Login />} />}
        </Routes>
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Router>
          <Layout>{routes}</Layout>
        </Router>
      </Suspense>
    </AuthContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    activeV: state.activeV,
    token_access:state.token_access
  };
};

export default connect(mapStateToProps, { toggleActiveV,addToken,RemoveToken })(App);
