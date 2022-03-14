import { PermCameraMic } from "@material-ui/icons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from 'redux-logger'
import {
  FamilyListReducer,
  VolunteerListReducer,
  selectedFamilyReducer,
  selectedVolunteerReducer,
  modalDisplayReducer,
  modalDisplayActive,
  modalDisplayFood,
  modalDisplayHot,
  modalDisplayActiveV,
  modalDisplayReducerV,
  ProductListReducer,
  modalDisplayReducerProduct,
  inventoryProductReducer,
  CarListReducer,
  modalDisplayActiveCars,
  MovementsListReducer,
  modalDisplayRemove,
  EventListReducer,
  modalDisplayReducerEvent,
  DriverListReducer,
  selectedEventDate,
  EventFamilyListReducer,
  modalDisplayReducerEventFamily,
  modalDisplayReducerEventFamily1,
  selectedEventDateNO,
  modalDisplayReducerEventFamily2,
  selectedEventDateFood,
  BasketListReducer,
  BasketReducer,
  EquipmentReducer,
  orderProducts,
  modalDisplayHelp,
  modalCalender,
  calender,
  modalDisplayReducerCalender,
  modalDisplaySee,
  UsersListReducer,
  modalDisplayActiveUsers,
  PermissionsListReducer,
  Rooms,
  modalDocumnetEvnet,
  CounterListReducer,
  CounterListReducer1,
  Loading,
  TOKENListReducer,
  StoreListReducer,
  MarketListReducer,
  ResourceListReducer
} from "./reducers/index";

const reducer = combineReducers({
  families: FamilyListReducer,
  cars: CarListReducer,
  selected: selectedFamilyReducer,
  modal: modalDisplayReducer,
  active: modalDisplayActive,
  activeFood: modalDisplayFood,
  activeHot: modalDisplayHot,
  activeV: modalDisplayActiveV,
  activeCars: modalDisplayActiveCars,
  volunteers: VolunteerListReducer,
  selectedV: selectedVolunteerReducer,
  modalV: modalDisplayReducerV,
  products: ProductListReducer,
  modalChange: modalDisplayReducerProduct,
  productsInventory: inventoryProductReducer,
  movements_Inventory: MovementsListReducer,
  modalI: modalDisplayRemove,
  events: EventListReducer,
  activeEvents: modalDisplayReducerEvent,
  driversEvent: DriverListReducer,
  selectedDate: selectedEventDate,
  familyEvents: EventFamilyListReducer,
  type: modalDisplayReducerEventFamily,
  type_no_direction: modalDisplayReducerEventFamily1,
  date_no_direction: selectedEventDateNO,
  type_foods: modalDisplayReducerEventFamily2,
  type_foods_date: selectedEventDateFood,
  basketProducts: BasketListReducer,
  Basket: BasketReducer,
  equipments: EquipmentReducer,
  orders: orderProducts,
  modalHelp: modalDisplayHelp,
  modalCalender: modalCalender,
  calender: calender,
  modalCalender: modalDisplayReducerCalender,
  modalSee: modalDisplaySee,
  users:UsersListReducer,
  activeUsers:modalDisplayActiveUsers,
  permissions:PermissionsListReducer,
  rooms:Rooms,
  documentEvent:modalDocumnetEvnet,
  counter_inventory:CounterListReducer,
  show_counter:CounterListReducer1,
  Loading:Loading,
  token_access:TOKENListReducer,
  stores:StoreListReducer,
  list_market:MarketListReducer,
  resource:ResourceListReducer

  // volunteersList:volunteersList,
  // familyList:familyList,
  // MealsList:MealsList,
});


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk) ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
