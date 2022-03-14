import React,{useContext} from "react";
import axios from 'axios';
import moment from 'moment';
import Swal from "sweetalert2";
import { AuthContext } from "../store/auth-context";




export const loadingData = () =>{
  return{
    type:'LOADING',
  }
}

export const addListMarket = payload => ({
  type: 'ADD_LIST_MARKET',
  payload
});

export const loadingDataNot = () =>{
  return{
    type:'NOT_LOADING',
  }
}

export const addToken= data =>{
  return{
    type:'ADD_TOKEN',
    payload:data
  }
}

export const RemoveToken= data =>{
  return{
    type:'REMOVE_TOKEN',
    payload:data,
  }
}


// family actions
export const addVolunteer = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/friends', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_VOLUNTEER',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr friend add')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};





export const addOrder = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/order', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_PRODUCT_ORDER',
        payload
      })
    })
    .catch((e) => console.log(`there was an error storing to the database ADD_PRODUCT_ORDER: ${e}`))
  }
};

export const getRooms= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/rooms')
    .then(res=> {
      console.log('this is the message we get from the axios for rooms')
      console.log(res.data)
      dispatch({
        type: 'LIST_ROOMS',
        payload: res.data.map(x=>({id:x.id,description:x.description,title:x.title,resourceId:x.resourceId,email:x.email,phone:x.phone,color:x.color,fullName:x.fullName,start:new Date(Date.parse(x.start)),end:new Date(Date.parse(x.end))}))
        
      })
    })
    .catch((err)=> {
      console.log('this is error for rooms')
    });
  }
}

export const getHall= (Auth) => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/hall',{
      headers: {
        'Authorization': 'Bearer '+Auth
      }
    })
    .then(res=> {
      console.log('this is the message we get from the axios for hall')
      console.log(res.data)
      dispatch({
        type: 'LIST_HALL',
        payload: res.data.map(x=>({id:x.id,description:x.description,title:x.title,email:x.email,phone:x.phone,color:x.color,fullName:x.fullName,start:new Date(Date.parse(x.start)),end:new Date(Date.parse(x.end))}))
        
      })
    })
    .catch((err)=> {
      console.log('this is error for hall')
    });
  }
}

export const addUsers = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/user', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_USERS',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
        
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add users')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};
export const addCounter1 = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/counter1', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_COUNTER1',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
        
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add counter1')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};
export const addCounter = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/counter', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_COUNTER',
        payload
      })
    })
    .catch((e) => console.log(`there was an error storing to the database: ${e} Counter`))
  }
};


export const addPermissions = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/permissions', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_PERMISSIONS',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
        
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add permissions')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const addFamily = payload => { 
   return (dispatch) => {
  axios.post('https://kanfey-shahar-backend.herokuapp.com/family', payload)
  .then((res) => {
    dispatch({
      type: 'ADD_FAMILY',
      payload
    })
    Swal.fire({
      icon: "success",
      text: "נוסף בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr add family')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};
export const addFamilyEvent = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/family_events', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_EVENT_FAMILY',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add family event')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const addListBasket = payload => ({
  type: 'ADD_LIST_BASKET',
  payload
});

export const addBasket = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/basket', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_BASKET',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add basket')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}
export const addCalender = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/hall', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_CALENDER',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add calender hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const addRooms = payload =>  {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/rooms', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_ROOMS',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add calender hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};



export const addDriverEvent = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/friends_events', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_DRIVER',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add driver event')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}
export const addEvent = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/events', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_EVENT',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
        
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add event')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};



export const addMovements = payload => {
  return dispatch => {
  axios.post('https://kanfey-shahar-backend.herokuapp.com/movements', payload)
  .then(res => {
    dispatch({
      type: "ADD_MOVEMENTS",
      payload
    })
    Swal.fire({
      icon: "success",
      text: "נוסף בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr add movements')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
}

export const addCar = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/cars', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_CAR',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add car')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const addProductsInventory = payload =>{
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/inventory', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_PRODUCT_INVENTORY',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add products inventory')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};


export const addProductsInventory1 = payload =>{
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/inventory', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_PRODUCT_INVENTORY',
        payload
      })
    })
    .catch((e) => console.log(`there was an error storing to the database: ${e}`))
  }
};

export const addProductsOrder = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/order', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_PRODUCT_ORDER',
        payload
      })
    })
    .catch((e) => console.log(`there was an error storing to the database: ${e}`))
  }
};


export const addProducts = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/products', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_PRODUCT',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add products')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}

// export const addProducts = payload => ({
//   type: 'ADD_PRODUCT',
//   payload  
// });
export const getEvents= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/events')
    .then(res=> {
      console.log('this is the message we get from the axios for event')
      console.log(res.data)
      dispatch({
        type: 'LIST_EVENTS',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for event')
    });
  }
}


export const getResource= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/get_resource')
    .then(res=> {
      console.log('this is the message we get from the axios for event')
      console.log(res.data)
      dispatch({
        type: 'LIST_RESOURCE',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for event')
    });
  }
}
export const getStores= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/stores')
    .then(res=> {
      console.log('this is the message we get from the axios for event')
      console.log(res.data)
      dispatch({
        type: 'LIST_STORES',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for event')
    });
  }
}


export const getCounter= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/counter')
    .then(res=> {
      console.log('this is the message we get from the axios for LIST_COUNTER')
      console.log(res.data)
      dispatch({
        type: 'LIST_COUNTER',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for LIST_COUNTER')
    });
  }
}

export const getCounter1= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/counter1')
    .then(res=> {
      console.log('this is the message we get from the axios for LIST_COUNTER1')
      console.log(res.data)
      dispatch({
        type: 'LIST_COUNTER1',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for LIST_COUNTER1')
    });
  }
}

export const getPermissions= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/permissions')
    .then(res=> {
      console.log('this is the message we get from the axios for permissions')
      console.log(res.data)
      dispatch({
        type: 'LIST_PERMISSIONS',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for permissions')
    });
  }
}



export const getOrders= (Auth) => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/order',
    {
      headers: {
        'Authorization': 'Bearer '+Auth
      }
    }
    )
    .then(res=> {
      console.log('this is the message we get from the axios for LIST_ORDERS')
      console.log(res.data)
      dispatch({
        type: 'LIST_ORDERS',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for LIST_ORDERS')
    });
  }
}

export const getMovements= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/movements')
    .then(res=> {
      console.log('this is the message we get from the axios for movements')
      console.log(res.data)
      dispatch({
        type: 'LIST_MOVEMENTS',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for movements')
    });
  }
}

export const getCars= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/cars')
    .then(res=> {
      console.log('this is the message we get from the axios for cars')
      console.log(res.data)
      dispatch({
        type: 'LIST_CARS',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for cars')
    });
  }
}

export const getFriendEvents= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/friends_events')
    .then(res=> {
      console.log('this is the message we get from the axios for friend event')
      console.log(res.data)
      dispatch({
        type: 'LIST_EVENTS_FRIEND',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for event friend')
    });
  }
}

export const getFamilyEvents= () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/family_events')
    .then(res=> {
      console.log('this is the message we get from the axios for family event')
      console.log(res.data)
      dispatch({
        type: 'LIST_EVENTS_FAMILY',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is error for event family')
    });
  }
}
export const getFriends = () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/friends')
    .then(res=> {
      console.log('this is the message we get from the axios-freind')
      console.log(res.data)
      dispatch({
        type: 'LIST_FRIENDS',
        payload: res.data,
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr -freind')
    });
  }
}

export const getBasket = (Auth) => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/basket')
    .then(res=> {
      console.log('this is the message we get from the axios-basket')
      console.log(res.data)
      dispatch({
        type: 'LIST_BASKET',
        payload: res.data,
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr -basket')
    });
  }
}

export const getFamily = () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/family')
    .then(res=> {
      console.log('this is the message we get from the axios-family')
      console.log(res.data)
      dispatch({
        type: 'LIST_FAMILY',
        payload: res.data,
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr -family')
    });
  }
}


export const getInventory = () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/inventory')
    .then(res=> {
      console.log('this is the message we get from the axios-family')
      console.log(res.data)
      dispatch({
        type: 'LIST_INVENTORY',
        payload: res.data,
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr -inventory')
    });
  }
}

export const getProducts = () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/products')
    .then(res=> {
      console.log('this is the message we get from the axios')
      dispatch({
        type: 'LIST_PRODUCTS',
        payload: res.data,
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr')
    });
  }
}

export const getUsers = () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/user')
    .then(res=> {
      console.log('this is the message we get from the axios user')
      dispatch({
        type: 'LIST_USERS',
        payload: res.data,
        
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr user')
    });
  }
}


export const getEquipment = () => {
  return (dispatch) => {
    axios.get('https://kanfey-shahar-backend.herokuapp.com/equipment')
    .then(res=> {
      console.log('this is the message we get from the axios')
      dispatch({
        type: 'LIST_EQUIPMENT',
        payload: res.data,
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr equipment' )
    });
  }
}




export const addEquipments = payload => {
  return (dispatch) => {
    axios.post('https://kanfey-shahar-backend.herokuapp.com/equipment', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_EQUIPMENT',
        payload
      })
      Swal.fire({
        icon: "success",
        text: "נוסף בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr add equipments')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};;

export const deleteProduct = payload => {
  return (dispatch) => {
    axios.delete('https://kanfey-shahar-backend.herokuapp.com/delete_inventory',{ data: { id: payload.id } })
    .then(res=> {
      console.log('delete!!!')
      dispatch({
        type: 'DELETE_PRODUCT',
        payload,
        id:payload.id
      })
      Swal.fire({
        title: "המוצר נמחק בהצלחה",
        icon: "success",
        confirmButtonText: "אישור",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr delete_inventory')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}

export const deleteEventMember = payload => {
  return (dispatch) => {
    axios.delete('https://kanfey-shahar-backend.herokuapp.com/delete_friend_event',{ data: { id: payload.id } })
    .then(res=> {
      console.log('delete!!!')
      dispatch({
        type: 'DELETE_MEMBER_EVENT',
        payload,
        id:payload.id
      })
      Swal.fire({
        title: " נמחק בהצלחה",
        icon: "success",
        confirmButtonText: "אישור",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}
export const deleteEventFamily = payload => {
  return (dispatch) => {
    axios.delete('https://kanfey-shahar-backend.herokuapp.com/delete_family_event',{ data: { id: payload.id } })
    .then(res=> {
      console.log('delete!!!')
      dispatch({
        type: 'DELETE_FAMILY_EVENT',
        payload,
        id:payload.id
      })
      Swal.fire({
        title: " נמחק בהצלחה",
        icon: "success",
        confirmButtonText: "אישור",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const deleteCalender = payload => {
  return (dispatch) => {
    axios.delete('https://kanfey-shahar-backend.herokuapp.com/delete_hall',{ data: { id: payload.id } })
    .then(res=> {
      console.log('delete!!!')
      dispatch({
        type: 'DELETE_CALENDER',
        payload,
        id:payload.id
      })
      Swal.fire({
        icon: "success",
        text: "נמחק בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr DELETE_CALENDER')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};
export const deleteRooms = payload => {
  return (dispatch) => {
    axios.delete('https://kanfey-shahar-backend.herokuapp.com/delete_rooms',{ data: { id: payload.id } })
    .then(res=> {
      console.log('delete!!!')
      dispatch({
        type: 'DELETE_ROOMS',
        payload,
        id:payload.id
      })
      Swal.fire({
        icon: "success",
        text: "נמחק בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr DELETE_CALENDER_Rooms')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const deleteMovements = payload => ({
  type: 'DELETE_MOVEMENTS',
  payload,
  id:payload.id,
  endDate:payload.endDate
});

export const notAvailiablePerson = phone => ({
  type: 'DELETE_PERSON',
  phone
});
export const updateRowResource = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_resource', payload)
  .then(res => {
    dispatch({
      type: "UPDATE_RESOURCE",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((e) => console.log(`there was an erro updating the product with error ${e} family`))
}
};

export const updateRowInventory = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_inventory', payload)
  .then(res => {
    dispatch({
      type: "EDIT_PRODUCT_INVENTORY",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "נוסף בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((e) => console.log(`there was an erro updating the product with error ${e} family`))
}
};

export const updateRowInventory1 = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_inventory', payload)
  .then(res => {
    dispatch({
      type: "EDIT_PRODUCT_INVENTORY",
      payload,
      id: payload.id
    })
  })
  .catch((e) => console.log(`there was an erro updating the product with error ${e} family`))
}
};


export const updateRowCalender = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_hall', payload)
  .then(res => {
    dispatch({
      type: "UPDATE_CALENDER",
      payload,
      id:payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};
export const updateRowRooms = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_rooms', payload)
  .then(res => {
    dispatch({
      type: "UPDATE_ROOMS",
      payload,
      id:payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update rooms')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};


export const updateUsers = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_user', payload)
  .then(res => {
    dispatch({
      type: "UPDATE_USERS",
      payload,
      id:payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};


export const updateCounter = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_counter', payload)
  .then(res => {
    dispatch({
      type: "EDIT_COUNTER",
      payload,
      id:payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};

export const updateCounter1 = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_counter1', payload)
  .then(res => {
    dispatch({
      type: "EDIT_COUNTER1",
      payload,
      id:payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};



export const updatePermissions = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_permissions', payload)
  .then(res => {
    dispatch({
      type: "UPDATE_PERMISSIONS",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};;

export const updateRowOrderMain = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_order', payload)
  .then(res => {
    dispatch({
      type: "EDIT_PRODUCT_ORDER_MAIN",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};

export const updateRowItems = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_order1', payload)
  .then(res => {
    dispatch({
      type: "EDIT_PRODUCT_ITEMS",
      payload,
      id: payload.id,
      id1:payload.items.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};;

export const updateRowOrderUnder = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_order', payload)
  .then(res => {
    dispatch({
      type: "EDIT_PRODUCT_ORDER_UNDER",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};

export const updateRowListBasketProduct= payload => ({
  type: 'EDIT_LIST_BASKET',
  payload,
  nameProducts: payload.nameProducts,
  manufacture:payload.manufacture,
  count: payload.count
});
export const updateRowBasket= payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_basket', payload)
  .then(res => {
    dispatch({
      type: "EDIT_BASKET",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};;


export const updateRowBasket1= payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_basket', payload)
  .then(res => {
    dispatch({
      type: "EDIT_BASKET",
      payload,
      id: payload.id
    })
  })
  .catch((e) => console.log(`there was an erro updating the product with error ${e} basket`))
}
};;


export const updateEquipment= payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_equipmet', payload)
  .then(res => {
    dispatch({
      type: "EDIT_EQUIPMENT",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};;

export const updateRow = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_family', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_FAMILY',
        payload,
        id: payload.id
      })
      Swal.fire({
        icon: "success",
        text: "עודכן בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};


export const updateRow1 = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_family_address', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_FAMILY',
        payload,
        id: payload.id
      })
      Swal.fire({
        icon: "success",
        text: "עודכן בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
    });
  }
};
export const updateRowCars = payload => {
  return dispatch => {
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_car', payload)
  .then(res => {
    dispatch({
      type: "EDIT_CARS",
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};;


export const updateRowP = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_product', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_PRODUCT',
        payload,
        code: payload.code
      })
      Swal.fire({
        icon: "success",
        text: "עודכן בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}

// export const updateRowP = payload => ({
//   type: 'EDIT_PRODUCT',
//   payload,
//   code: payload.code
// });
export const updateRowEvents = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_event', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_EVENT',
        payload,
        id: payload.id
      })
      Swal.fire({
        icon: "success",
        text: "עודכן בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const updateRowFamilyEvent = payload => {
  return dispatch =>{
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_family_event', payload)
  .then(res => {
    dispatch({
      type: 'EDIT_EVENT_FAMILY',
      payload,
      id: payload.id
    })
    Swal.fire({
      icon: "success",
      text: "עודכן בהצלחה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    });
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
    Swal.fire({
      icon: "error",
      text: "חלה שגיאה, נסה שנית",
      confirmButtonText: "אישור",
      confirmButtonColor: "red",
    })
  });
}
};

export const updateRowFamilyEvent1 = payload => {
  return dispatch =>{
  axios.put('https://kanfey-shahar-backend.herokuapp.com/update_family_event', payload)
  .then(res => {
    dispatch({
      type: 'EDIT_EVENT_FAMILY',
      payload,
      id: payload.id
    })
  })
  .catch((err)=> {
    console.log('this is errrrrrorrrroorrrrr update hall')
  });
}
};


export const updateRowMemberEvent = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_friend_event', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_EVENT_MEMBER',
        payload,
        id: payload.id
      })
      Swal.fire({
        icon: "success",
        text: "עודכן בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
}

export const updateRowMemberEvent1 = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_friend_event', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_EVENT_MEMBER',
        payload,
        id: payload.id
      })
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
    });
  }
}


export const updateRowOrder = payload => ({
  type: 'EDIT_PRODUCT',
  payload,
  id: payload.id
});
export const selectEvent = payload => ({
  type: 'CHANGE_DATE',
  payload,
});

export const updateRowV = payload => {
  return dispatch => {
    axios.put('https://kanfey-shahar-backend.herokuapp.com/update_friend', payload)
    .then(res => {
      dispatch({
        type: 'EDIT_VOLUNTEER',
        payload,
        id: payload.id
      })
      Swal.fire({
        icon: "success",
        text: "עודכן בהצלחה",
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
      });
    })
    .catch((err)=> {
      console.log('this is errrrrrorrrroorrrrr update hall')
      Swal.fire({
        icon: "error",
        text: "חלה שגיאה, נסה שנית",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      })
    });
  }
};

export const updatePhone = payload => ({
  type: 'EDIT_PHONE',
  payload,
  phone: payload.phone
});


export const selectRow = phone => ({
  type: 'SELECT_FAMILY',
  phone
});



// Modal actions
export const toggleModal = () => ({
  type: 'TOGGLE_MODAL'
});
export const toggleModalSee = () => ({
  type: 'TOGGLE_MODAL_SEE'
});

export const toggleModalCalender = () => ({
  type: 'TOGGLE_MODAL_CALENDER'
});
export const toggleModalHelp = () => ({
  type: 'TOGGLE_MODAL_HELP'
});
export const toggleModalDocumentEvent = () => ({
  type: 'TOGGLE_MODAL_DOCUMENTS_EVENT'
});

export const toggleActive = () => ({
  type: 'NOT_ACTIVE'
});
export const toggleActiveUsers = () => ({
  type: 'NOT_ACTIVE_USERS'
});

export const toggleActiveCars = () => ({
  type: 'NOT_ACTIVE_CAR'
});
export const toggleFood = () => ({
  type: 'NOT_FOOD'
});
export const toggleHot = () => ({
  type: 'NOT_HOT'
});

export const toggleActiveV = () => ({
  type: 'NOT_ACTIVEE'
});

export const toggleModalV = () => ({
  type: 'TOGGLE_MODAL'
});

export const toggleModalP = () => ({
  type: 'TOGGLE_MODALL'
});
export const toggleModalRemove = () => ({
  type: 'TOGGLE_MODAL_REMOVE'
});
export const toggleActiveEvents = () => ({
  type: 'TOGGLE_MODAL_EVENT'
});


export const toggleActiveEventsFamily = payload => ({
  type: 'CHANGE_TYPE',
  payload,
});

export const toggleActiveDirectionType = payload => ({
  type: 'CHANGE_TYPE_NO_DIRECTION',
  payload,
});

export const toggleActiveTypeFood = payload => ({
  type: 'CHANGE_TYPE_FOOD',
  payload,
});


export const toggleActiveDateFood = payload => ({
  type: 'CHANGE_TYPE_FOOD_DATE',
  payload,
});


export const selectEventNoDirection = payload => ({
  type: 'CHANGE_DATE_NO_DIRECTION',
  payload,
});

export const selectBasketFriend = payload => ({
  type: 'CHANGE_BASKET_FRIEND',
  payload,
});


// fetching data starts here

