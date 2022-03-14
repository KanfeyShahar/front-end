export const isValidName = (name ='') =>
name.length >0 && name.length<50 ? true : false;
export const isValidNumber = number => (number >0 ? true : false);
export const isValidPhone = (x =' ') => x.length>0 && x.length<11 ? true : false;

export const getElementsValue = id => document.getElementById((id)).value;
export const getIndexByName = (arr, id) =>
  arr.findIndex(arr => arr.id === id);
  export const getIndexByNameFriend = (arr, id) =>
  arr.findIndex(arr => arr.number_id === id);
  export const getIndexByNameProducts = (arr, code) =>
  arr.findIndex(arr => arr.code === code);
  export const getIndexByNameProductsBasket = (arr, id) =>
  arr.findIndex(arr => arr.id_inventory === id);
  export const getIndexByNameInventory = (arr, id,endDate) =>
  arr.findIndex(arr => arr.id === id && arr.endDate === endDate);
  export const getIndexByNameInventory1 = (arr, id,endDate) =>
  arr.findIndex(arr => arr.code === id && arr.endDate === endDate);
  export const getIndexByNameEquipment = (arr, id_equipment,center) =>
  arr.findIndex(arr => arr.id_equipment === id_equipment && arr.center === center);
  export const getIndexByNameProduct = (arr, nameProducts,endDate) =>
  arr.findIndex(arr => arr.nameProducts === nameProducts && arr.endDate === endDate);
  export const getIndexByNameDirection = (arr, id,startDate) =>
  arr.findIndex(arr => arr.id === id && arr.startDate === startDate);
  export const getIndexByNameListProduct = (arr, nameProducts,type, manufacture) =>
  arr.findIndex(arr => arr.nameProducts === nameProducts && arr.type === type && arr.manufacture=== manufacture);
  export const getIndexByNameCar = (arr, id) =>
  arr.findIndex(arr => arr.idCars === id);
export const getIndexByPhone = (arr, phone) =>
arr.findIndex(arr => arr.phone === phone);
  export const formatDateToString = dateStr => {
    const d = new Date(dateStr);
    const months = [
      'ינו',
      'פבר',
      'מרץ',
      'אפר',
      'מאי',
      'יוני',
      'יולי',
      'אוג',
      'ספט',
      'אוק',
      'נוב',
      'דצמ'
    ];
    const [day, month, year] = [
      d.getDate(),
      months[d.getMonth()],
      d.getFullYear()
    ];
    return ` ${day} ${month}, ${year}`;
  };

  export const saveFamilyToLocal = arr => {
    return { families: (localStorage.family = JSON.stringify(arr)) };
  };
  
  
  export const saveVolunteerToLocal = arr => {
    return { Volunteers: (localStorage.volunteer = JSON.stringify(arr)) };
  };

    
  export const saveProductToLocal = arr => {
    return { products: (localStorage.meal = JSON.stringify(arr)) };
  };
  export const saveProductInventoryToLocal = arr => {
    return { productsInventory: (localStorage.inventory = JSON.stringify(arr)) };
  };

  export const saveCarsToLocal = arr => {
    return { cars: (localStorage.car = JSON.stringify(arr)) };
  };

  export const saveMovementsToLocal = arr => {
    return { movements_Inventory: (localStorage.movements = JSON.stringify(arr)) };
  };

  export const saveEventsToLocal = arr => {
    return { events: (localStorage.event = JSON.stringify(arr)) };
  };

  export const saveEquipmentsToLocal = arr => {
    return { equipments: (localStorage.equipment = JSON.stringify(arr)) };
  };

 

  export const  saveCalenderToLocal = arr => {
    return { modalCalender: (localStorage.room = JSON.stringify(arr)) };
  };

  export const  saveUsersToLocal = arr => {
    return { users: (localStorage.user = JSON.stringify(arr)) };
  };
  export const   savePermissionsToLocal = arr => {
    return { permissions: (localStorage.permission = JSON.stringify(arr)) };
  };

  export const   saveRoomsToLocal = arr => {
    return { rooms: (localStorage.room = JSON.stringify(arr)) };
  };