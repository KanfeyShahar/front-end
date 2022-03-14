import { combineReducers } from "redux";
import { addProductsInventory } from "../actions";

export const StoreListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_STORES":
      return [...state.filter((x)=>x.store_id===null), ...action.payload]
    default:
      return state;
  }
};

export const MarketListReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_LIST_MARKET":
      return action.payload;
    default:
      return state;
  }
};


export const FamilyListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_FAMILY":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_FAMILY":
      return [...state, action.payload];
    case "DELETE_PERSON":
      return state.filter((product) => product.name !== action.name);
    case "EDIT_PHONE":
      const Family = state.map((x) => (x.phone = action.payload.phone));
      return Family;
    case "EDIT_FAMILY":
      const newFamily = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newFamily;
    default:
      return state;
  }
};


export const ResourceListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_RESOURCE":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "UPDATE_RESOURCE":
      const newFamily = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newFamily;
    default:
      return state;
  }
};

export const UsersListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_USERS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_USERS":
      return [...state, action.payload];
    case "UPDATE_USERS":
      const newUsers = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newUsers;
    default:
      return state;
  }
};

export const PermissionsListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_PERMISSIONS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_PERMISSIONS":
      return [...state, action.payload];
    case "UPDATE_PERMISSIONS":
      const newUsers = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newUsers;
    default:
      return state;
  }
};

export const calender = (state = [], action) => {
  switch (action.type) {
    case "LIST_HALL":
      return [...state.filter((x)=>x.id===null),...action.payload]
    case "ADD_CALENDER":
      return [...state, action.payload];
    case "DELETE_CALENDER":
      return state.filter((event) => event.id !== action.id);
      case "UPDATE_CALENDER":
       const newCalender= state.map((existingEvent) =>(existingEvent.id === action.id)  ? action.payload : existingEvent)
      return newCalender
    default:
      return state;
  }
};

export const Rooms = (state = [], action) => {
  switch (action.type) {
    case "LIST_ROOMS":
      return [...state.filter((x)=>x.id===null),...action.payload]
    case "ADD_ROOMS":
      return [...state, action.payload];
    case "DELETE_ROOMS":
      return state.filter((event) => event.id !== action.id);
      case "UPDATE_ROOMS":
       const newRooms= state.map((existingEvent) =>(existingEvent.id === action.id)  ? action.payload : existingEvent)
      return newRooms
    default:
      return state;
  }
};



export const BasketReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_BASKET":
    return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_BASKET":
      return [...state, action.payload];
    case "DELETE_PERSON":
      return state.filter((product) => product.name !== action.name);
    case "EDIT_PHONE":
      const Family = state.map((x) => (x.phone = action.payload.phone));
      return Family;
    case "EDIT_BASKET":
      const newFamily = state.map((x) =>
        x.id === action.id 
          ? action.payload
          : x
      );
      return newFamily;
    default:
      return state;
  }
};

export const EquipmentReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_EQUIPMENT":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_EQUIPMENT":
      return [...state, action.payload];
    case "EDIT_EQUIPMENT":
      const newFamily = state.map((x) =>
        x.id === action.id
          ? action.payload
          : x
      );
      return newFamily;
    default:
      return state;
  }
};

export const BasketListReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_LIST_BASKET":
      return [...state, action.payload];
    case "EDIT_LIST_BASKET":
      const newFamily = state.map((x) =>
        x.nameProducts === action.nameProducts &&
        x.manufacture === action.manufacture
          ? ((x.id = x.id),
            (x.nameProducts = x.nameProducts),
            (x.size = x.size),
            (x.type = x.type),
            (x.count = x.count + action.count),
            (x.manufacture = x.manufacture))
          : x
      );
      return newFamily;
    default:
      return state;
  }
};
export const DriverListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_EVENTS_FRIEND":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_DRIVER":
      return [...state, action.payload];
    case "DELETE_MEMBER_EVENT":
      return state.filter(
        (x) => x.id !== action.id 
      );
    case "EDIT_EVENT_MEMBER":
      const newFamily = state.map((x) =>
        x.id === action.id 
          ? action.payload
          : x
      );
      return newFamily;
    default:
      return state;
  }
};

export const EventFamilyListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_EVENTS_FAMILY":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_EVENT_FAMILY":
      return [...state, action.payload];
    case "DELETE_FAMILY_EVENT":
      return state.filter(
        (x) => x.id !== action.id 
      );
    case "EDIT_PHONE":
      const Family = state.map((x) => (x.phone = action.payload.phone));
      return Family;
    case "EDIT_EVENT_FAMILY":
      const newFamily = state.map((x) =>
        x.id === action.id 
          ? action.payload
          : x
      );
      return newFamily;
    default:
      return state;
  }
};

export const EventListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_EVENTS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_EVENT":
      return [...state, action.payload];
    case "EDIT_EVENT":
      const newEvent = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newEvent;
    default:
      return state;
  }
};

export const MovementsListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_MOVEMENTS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_MOVEMENTS":
      return [...state, action.payload];
    case "DELETE_MOVEMENTS":
      return state.filter(
        (x) => x.id !== action.id || x.endDate !== action.endDate
      );
    case "EDIT_PHONE":
      const Family = state.map((x) => (x.phone = action.payload.phone));
      return Family;
    case "EDIT_MOVEMENTS":
      const newMovements = state.map((x) =>
        x.id === action.id && x.endDate === action.endDate ? action.payload : x
      );
      return newMovements;
    default:
      return state;
  }
};
export const CarListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_CARS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_CAR":
      return [...state, action.payload];
    case "EDIT_CARS":
      const newFamily = state.map((x) =>
        x.id === action.id 
          ? action.payload
          : x
      );
      return newFamily;
    default:
      return state;
  }
};
export const inventoryProductReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_INVENTORY":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_PRODUCT_INVENTORY":
      return [...state, action.payload];
    case "DELETE_PRODUCT":
      return state.filter(
        (x) => x.id !== action.id
      );
    case "EDIT_PRODUCT_INVENTORY":
      const newProduct = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newProduct;
    default:
      return state;
  }
};

export const orderProducts = (state =[], action) => {
  switch (action.type) {
    case "LIST_ORDERS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_PRODUCT_ORDER":
      state.push(action.payload);
    case "DELETE_PRODUCT":
      return state.filter(
        (x) => x.id !== action.id || x.endDate !== action.endDate
      );
    case "EDIT_PRODUCT_ORDER_MAIN":
      const newProduct = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newProduct;
    case "EDIT_PRODUCT_ORDER_UNDER":
      const newOrder = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newOrder;
    case "EDIT_PRODUCT_ITEMS":
      const prodIdx = state.findIndex((arr) => arr.id === action.id);
      const unchangedEventState = state.filter((e)=> e.id!==action.id)
      let chagnedEventItemsList = state[prodIdx].items.map((x)=>  x.id !== action.id1 ? x : action.payload.items)
      chagnedEventItemsList = {
        id: action.payload.id,
        totalAmount: action.payload.totalAmount,
        locked:action.payload.locked,
        userDate: action.payload.userDate,
        items:chagnedEventItemsList
      }

      return [...unchangedEventState, chagnedEventItemsList]

      // const arr = state;

      // const arr1 = arr[prodIdx].items;
      // const prodIdx1 = arr1.findIndex((arr2) => arr2.id === action.id1);
      // const arr3=state[prodIdx];
      // const order = state.map((x) => 
      //       x.id === action.id && x.items.forEach((y)=> y.id === action.id1) ? action.payload : x)
      // return order
        
    default:
      return state;
  }
};

export const ProductListReducer = (state=[], action) => {
  switch (action.type) {
    case "LIST_PRODUCTS":
      return [...state.filter((x)=>x.code===null), ...action.payload]
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "DELETE_PERSON":
      return state.filter((product) => product.name !== action.name);
    case "EDIT_PHONE":
      const Product = state.map((x) => (x.phone = action.payload.phone));
      return Product;
    case "EDIT_PRODUCT":
      const newProduct = state.map((x) =>
        x.code === action.code ? action.payload : x
      );
      return newProduct;
    default:
      return state;
  }
};
export const VolunteerListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_FRIENDS":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_VOLUNTEER":
      return [...state, action.payload];
    case "DELETE_VOLUNTEER":
      return state.filter((product) => product.name !== action.name);
    case "EDIT_VOLUNTEER":
      const newVolunteer = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newVolunteer;
    default:
      return state;
  }
};


export const CounterListReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_COUNTER":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_COUNTER":
      return [...state, action.payload];
    case "EDIT_COUNTER":
      const newVolunteer = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newVolunteer;
    default:
      return state;
  }
};

export const TOKENListReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return [state, action.payload];
    case "REMOVE_TOKEN":
      const newVolunteer = state.map((x) =>
      x.token === action.token ? action.payload : x
    );
    return newVolunteer;
    default:
      return state;
  }
};

export const CounterListReducer1 = (state = [], action) => {
  switch (action.type) {
    case "LIST_COUNTER1":
      return [...state.filter((x)=>x.id===null), ...action.payload]
    case "ADD_COUNTER1":
      return [...state, action.payload];
    case "EDIT_COUNTER1":
      const newVolunteer = state.map((x) =>
        x.id === action.id ? action.payload : x
      );
      return newVolunteer;
    default:
      return state;
  }
};


export const selectedFamilyReducer = (state = "", action) => {
  switch (action.type) {
    case "SELECT_FAMILY":
      return action.phone;
    default:
      return state;
  }
};
export const selectedEventDate = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_DATE":
      return action.payload;
    default:
      return state;
  }
};
export const selectedEventDateFood = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_TYPE_FOOD_DATE":
      return action.payload;
    default:
      return state;
  }
};
export const selectedEventDateNO = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_DATE_NO_DIRECTION":
      return action.payload;
    default:
      return state;
  }
};
export const modalDisplayReducerEventFamily = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_TYPE":
      return action.payload;
    default:
      return state;
  }
};
export const modalDisplayReducerEventFamily1 = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_TYPE_NO_DIRECTION":
      return action.payload;
    default:
      return state;
  }
};
export const modalDisplayReducerEventFamily2 = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_TYPE_FOOD":
      return action.payload;
    default:
      return state;
  }
};
export const selectedVolunteerReducer = (state = "", action) => {
  switch (action.type) {
    case "SELECT_VOLUNTEER":
      return action.phone;
    default:
      return state;
  }
};
export const modalDisplayReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return !state;
    default:
      return state;
  }
};

export const modalDisplayActive = (state = true, action) => {
  switch (action.type) {
    case "NOT_ACTIVE":
      return !state;
    default:
      return state;
  }
};

export const modalDisplayActiveUsers = (state = true, action) => {
  switch (action.type) {
    case "NOT_ACTIVE_USERS":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayActiveCars = (state = true, action) => {
  switch (action.type) {
    case "NOT_ACTIVE_CAR":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayFood = (state = true, action) => {
  switch (action.type) {
    case "NOT_FOOD":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayHot = (state = true, action) => {
  switch (action.type) {
    case "NOT_HOT":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayActiveV = (state = true, action) => {
  switch (action.type) {
    case "NOT_ACTIVEE":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayReducerV = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return !state;
    default:
      return state;
  }
};

export const modalDisplayReducerProduct = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODALL":
      return !state;
    default:
      return state;
  }
};

export const modalCalender = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_CALENDER":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayRemove = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_REMOVE":
      return !state;
    default:
      return state;
  }
};

export const modalDisplayHelp = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_HELP":
      return !state;
    default:
      return state;
  }
};
export const modalDisplaySee = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL_SEE':
      return !state;
    default:
      return state;
  }
};
export const modalDisplayReducerEvent = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_EVENT":
      return !state;
    default:
      return state;
  }
};
export const modalDisplayReducerCalender = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_CALENDER":
      return !state;
    default:
      return state;
  }
};

export const Loading = (state = false, action) => {
  switch (action.type) {
    case 'EDIT_FAMILY':
      return false;
      case 'LOADING':
      return !state;
      case 'NOT_LOADING':
        return state
    default:
      return state;
  }
};

export const modalDocumnetEvnet = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_DOCUMENTS_EVENT":
      return !state;
    default:
      return state;
  }
};
