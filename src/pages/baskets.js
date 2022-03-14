import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  toggleActiveEventsFamily,
  selectEvent,
  deleteEventFamily,
  toggleModal,
  updateRowBasket,
  selectEventNoDirection,
  toggleActiveDateFood,
  updateRowInventory,getEvents,getBasket,getInventory,addMovements
} from "../actions";
import DirectionRoute from "../components/DirectionRoute";
import ButtonAdd from "../components/ButtonAdd";
import * as IoIcons from "react-icons/io";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import {
  getIndexByNameProduct,
  getIndexByNameDirection,
  getIndexByNameInventory,
  getIndexByNameInventory1,
  getIndexByName,
  getIndexByNameProducts
} from "../helper-functions";
import { selectRow, updateRowFamilyEvent, updatePhone ,updateRowEvents} from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarBasket";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BasketList: [...this.props.Basket],
      selected: "",
      type: [...this.props.type],
      MasterCheckedDeliverd: false,
      term: "",
      direction: "",
      currentPage: 1,
      postsPerPage: 10,
   
    };
  }

  componentDidMount() {
    this.props.getEvents()
    this.props.getBasket()
    this.props.getInventory()
   }

  getSelectedNumber1 = () => {
    const idx =this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.id)
    console.log(idx[0])
    const prodIdx = getIndexByName(this.props.events, idx[0]);
    Swal.fire({
      title: "עדכן כמות סלים מסוג א",
      input: "number",
      inputValue: this.props.events[prodIdx].basket1,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value< 0 ) {
          return "חייב להקליד כמות סלים, במידה ואין הקלד 0 ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].basket1 !== result.value
      ) {
        console.log(result.value)
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].name,
          startDate: this.props.events[prodIdx].startDate,
          dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket1: parseInt(result.value),
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
          
      });
        }
    });
  };

  getSelectedNumber2 = () => {
    const idx =this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.id)
    console.log(idx[0])
    const prodIdx = getIndexByName(this.props.events, idx[0]);
    Swal.fire({
      title: "עדכן כמות סלים מסוג ב",
      input: "number",
      inputValue: this.props.events[prodIdx].basket2,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value< 0 ) {
          return "חייב להקליד כמות סלים, במידה ואין הקלד 0 ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].basket2 !== result.value
      ) {
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].name,
          startDate: this.props.events[prodIdx].startDate,
          dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket2: result.value,
          basket1: this.props.events[prodIdx].basket1,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,

      });
        }
    });
  };

  getSelectedNumber3 = () => {
    const idx =this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.id)
    console.log(idx[0])
    const prodIdx = getIndexByName(this.props.events, idx[0]);
    Swal.fire({
      title: "עדכן כמות סלים מסוג ג",
      input: "number",
      inputValue: this.props.events[prodIdx].basket3,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value< 0 ) {
          return "חייב להקליד כמות סלים, במידה ואין הקלד 0 ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].basket3 !== result.value
      ) {
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].name,
          startDate: this.props.events[prodIdx].startDate,
          dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket3: result.value,
          basket2: this.props.events[prodIdx].basket2,
          basket1: this.props.events[prodIdx].basket1,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
      });
        }
    });
  };
  getSelectedNumber4 = () => {
    const idx =this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.id)
    console.log(idx[0])
    const prodIdx = getIndexByName(this.props.events, idx[0]);
    Swal.fire({
      title: "עדכן כמות סלים מסוג ד",
      input: "number",
      inputValue: this.props.events[prodIdx].basket4,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value< 0 ) {
          return "חייב להקליד כמות סלים, במידה ואין הקלד 0 ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].basket4 !== result.value
      ) {
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].name,
          startDate: this.props.events[prodIdx].startDate,
          dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket4: result.value,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket1: this.props.events[prodIdx].basket1,
          basket5: this.props.events[prodIdx].basket5,
      });
        }
    });
  };
  getSelectedNumber5 = () => {
    const idx =this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.id)
    console.log(idx[0])
    const prodIdx = getIndexByName(this.props.events, idx[0]);
    Swal.fire({
      title: "עדכן כמות סלים מסוג ה",
      input: "number",
      inputValue: this.props.events[prodIdx].basket5,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value< 0 ) {
          return "חייב להקליד כמות סלים, במידה ואין הקלד 0 ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].basket5 !== result.value
      ) {
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].name,
          startDate: this.props.events[prodIdx].startDate,
          dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket5: result.value,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket1: this.props.events[prodIdx].basket1,
      });
        }
    });
  };


  sortRowsFirstName() {
    this.setState({
      BasketList: this.props.Basket.sort((a, b) => {
        let nameA = a.firstName.toLowerCase();
        let nameB = b.firstName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowsLastName() {
    this.setState({
      BasketList: this.props.Basket.sort((a, b) => {
        let nameA = a.lastName.toLowerCase();
        let nameB = b.lastName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }

  sortRowsCity() {
    this.setState({
      BasketList: this.props.Basket.sort((a, b) => {
        let nameA = a.city.toLowerCase();
        let nameB = b.city.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowNumber() {
    this.setState({
      BasketList: this.props.Basket.sort((a, b) => a.direction - b.direction),
    });
  }

  getSelectedBasket1 = (
    id,
    id_inventory,
    count2,
    count3,
    count4,
    count5,
  ) => {
    const sum =
      parseInt(count2) + parseInt(count3) + parseInt(count4) + parseInt(count5);
    const prodIdx = getIndexByName(this.props.Basket, id);
    const prodIdx1 = getIndexByName(
      this.props.productsInventory,
      id_inventory
    );
    Swal.fire({
      title: "עדכן כמות",
      input: "number",
      inputValue: this.props.Basket[prodIdx].count_real1,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (
          value < 0 ||
          this.props.productsInventory[prodIdx1].count < sum + parseInt(value)
        )
          return "כמות המלאי אינה תקינה, וודא שהכמות אינה עולה מעל כמות המלאי הרשומה";
      },
    }).then((result) => {
      {
        this.props.updateRowBasket({
          startDate: this.props.Basket[prodIdx].startDate,
          id_inventory:this.props.Basket[prodIdx].id_inventory,
          id: this.props.Basket[prodIdx].id,
          nameProducts: this.props.Basket[prodIdx].nameProducts,
          size: this.props.Basket[prodIdx].size,
          type: this.props.Basket[prodIdx].type,
          count: this.props.Basket[prodIdx].count,
          manufacture: this.props.Basket[prodIdx].manufacture,
          count_real1: result.value,
          count_real2: this.props.Basket[prodIdx].count_real2,
          count_real3: this.props.Basket[prodIdx].count_real3,
          count_real4: this.props.Basket[prodIdx].count_real4,
          count_real5: this.props.Basket[prodIdx].count_real5,
          sum:
            parseInt(this.props.Basket[prodIdx].count_real2) +
            parseInt(this.props.Basket[prodIdx].count_real3) +
            parseInt(result.value) +
            parseInt(this.props.Basket[prodIdx].count_real4) +
            parseInt(this.props.Basket[prodIdx].count_real5),
          locked: this.props.Basket[prodIdx].locked,
          endDate: this.props.Basket[prodIdx].endDate,
          code: this.props.Basket[prodIdx].code,
          serialNumber:this.props.Basket[prodIdx].serialNumber
        });
      }
    });
  };

  getSelectedBasket2 = (
    id,
    id_inventory,
    count1,
    count3,
    count4,
    count5,
  ) => {
    const sum =
      parseInt(count1) + parseInt(count3) + parseInt(count4) + parseInt(count5);
      const prodIdx = getIndexByName(this.props.Basket, id);
      const prodIdx1 = getIndexByName(
        this.props.productsInventory,
        id_inventory
      );
    Swal.fire({
      title: "עדכן כמות",
      input: "number",
      inputValue: this.props.Basket[prodIdx].count_real2,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (
          value < 0 ||
          this.props.productsInventory[prodIdx1].count < sum + parseInt(value)
        )
          return "כמות המלאי אינה תקינה, וודא שהכמות אינה עולה מעל כמות המלאי הרשומה";
      },
    }).then((result) => {
      {
        this.props.updateRowBasket({
          startDate: this.props.Basket[prodIdx].startDate,
          id: this.props.Basket[prodIdx].id,
          id_inventory:this.props.Basket[prodIdx].id_inventory,
          nameProducts: this.props.Basket[prodIdx].nameProducts,
          size: this.props.Basket[prodIdx].size,
          type: this.props.Basket[prodIdx].type,
          count: this.props.Basket[prodIdx].count,
          manufacture: this.props.Basket[prodIdx].manufacture,
          count_real1: this.props.Basket[prodIdx].count_real1,
          count_real2: result.value,
          count_real3: this.props.Basket[prodIdx].count_real3,
          count_real4: this.props.Basket[prodIdx].count_real4,
          count_real5: this.props.Basket[prodIdx].count_real5,
          locked: this.props.Basket[prodIdx].locked,
          sum:
            parseInt(this.props.Basket[prodIdx].count_real1) +
            parseInt(this.props.Basket[prodIdx].count_real3) +
            parseInt(result.value) +
            parseInt(this.props.Basket[prodIdx].count_real4) +
            parseInt(this.props.Basket[prodIdx].count_real5),
          endDate: this.props.Basket[prodIdx].endDate,
          code: this.props.Basket[prodIdx].code,
          serialNumber:this.props.Basket[prodIdx].serialNumber
        });
      }
    });
  };

  getSelectedBasket3 = (
    id,
    id_inventory,
    count1,
    count2,
    count4,
    count5,
  ) => {
    const sum =
      parseInt(count1) + parseInt(count2) + parseInt(count4) + parseInt(count5);
    const prodIdx = getIndexByName(this.props.Basket, id);
    const prodIdx1 = getIndexByName(
      this.props.productsInventory,
      id_inventory
    );
    Swal.fire({
      title: "עדכן כמות",
      input: "number",
      inputValue: this.props.Basket[prodIdx].count_real3,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (
          value < 0 ||
          this.props.productsInventory[prodIdx1].count < sum + parseInt(value)
        )
          return "כמות המלאי אינה תקינה, וודא שהכמות אינה עולה מעל כמות המלאי הרשומה";
      },
    }).then((result) => {
      {
        this.props.updateRowBasket({
          startDate: this.props.Basket[prodIdx].startDate,
          id: this.props.Basket[prodIdx].id,
          id_inventory:this.props.Basket[prodIdx].id_inventory,
          nameProducts: this.props.Basket[prodIdx].nameProducts,
          size: this.props.Basket[prodIdx].size,
          type: this.props.Basket[prodIdx].type,
          count: this.props.Basket[prodIdx].count,
          manufacture: this.props.Basket[prodIdx].manufacture,
          count_real1: this.props.Basket[prodIdx].count_real1,
          count_real2: this.props.Basket[prodIdx].count_real2,
          count_real3: result.value,
          count_real4: this.props.Basket[prodIdx].count_real4,
          count_real5: this.props.Basket[prodIdx].count_real5,
          locked: this.props.Basket[prodIdx].locked,
          sum:
            parseInt(this.props.Basket[prodIdx].count_real1) +
            parseInt(this.props.Basket[prodIdx].count_real2) +
            parseInt(result.value) +
            parseInt(this.props.Basket[prodIdx].count_real4) +
            parseInt(this.props.Basket[prodIdx].count_real5),
          endDate: this.props.Basket[prodIdx].endDate,
          code: this.props.Basket[prodIdx].code,
          serialNumber:this.props.Basket[prodIdx].serialNumber
        });
      }
    });
  };
  getSelectedBasket4 = (
    id,
    id_inventory,
    count1,
    count2,
    count3,
    count5,
  ) => {
    const sum =
      parseInt(count1) + parseInt(count2) + parseInt(count3) + parseInt(count5);
    const prodIdx = getIndexByName(this.props.Basket, id);
    const prodIdx1 = getIndexByName(
      this.props.productsInventory,
      id_inventory
  
    );
    Swal.fire({
      title: "עדכן כמות",
      input: "number",
      inputValue: this.props.Basket[prodIdx].count_real4,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (
          value < 0 ||
          this.props.productsInventory[prodIdx1].count < sum + parseInt(value)
        )
          return "כמות המלאי אינה תקינה, וודא שהכמות אינה עולה מעל כמות המלאי הרשומה";
      },
    }).then((result) => {
      {
        this.props.updateRowBasket({
          startDate: this.props.Basket[prodIdx].startDate,
          id: this.props.Basket[prodIdx].id,
          id_inventory:this.props.Basket[prodIdx].id_inventory,
          nameProducts: this.props.Basket[prodIdx].nameProducts,
          size: this.props.Basket[prodIdx].size,
          type: this.props.Basket[prodIdx].type,
          count: this.props.Basket[prodIdx].count,
          manufacture: this.props.Basket[prodIdx].manufacture,
          count_real1: this.props.Basket[prodIdx].count_real1,
          count_real2: this.props.Basket[prodIdx].count_real2,
          count_real4: result.value,
          count_real3: this.props.Basket[prodIdx].count_real3,
          count_real5: this.props.Basket[prodIdx].count_real5,
          locked: this.props.Basket[prodIdx].locked,
          sum:
            parseInt(this.props.Basket[prodIdx].count_real1) +
            parseInt(this.props.Basket[prodIdx].count_real2) +
            parseInt(result.value) +
            parseInt(this.props.Basket[prodIdx].count_real3) +
            parseInt(this.props.Basket[prodIdx].count_real5),
          endDate: this.props.Basket[prodIdx].endDate,
          code: this.props.Basket[prodIdx].code,
          serialNumber:this.props.Basket[prodIdx].serialNumber
        });
      }
    });
  };
  getSelectedBasket5 = (
    id,
    id_inventory,
    count1,
    count2,
    count3,
    count4,
  ) => {
    const sum =
      parseInt(count1) + parseInt(count2) + parseInt(count3) + parseInt(count4);
    const prodIdx = getIndexByName(this.props.Basket, id);
    const prodIdx1 = getIndexByName(
      this.props.productsInventory,
      id_inventory,
    );
    Swal.fire({
      title: "עדכן כמות",
      input: "number",
      inputValue: this.props.Basket[prodIdx].count_real4,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (
          value < 0 ||
          this.props.productsInventory[prodIdx1].count < sum + parseInt(value)
        )
          return "כמות המלאי אינה תקינה, וודא שהכמות אינה עולה מעל כמות המלאי הרשומה";
      },
    }).then((result) => {
      {
        this.props.updateRowBasket({
          startDate: this.props.Basket[prodIdx].startDate,
          id: this.props.Basket[prodIdx].id,
          id_inventory:this.props.Basket[prodIdx].id_inventory,
          nameProducts: this.props.Basket[prodIdx].nameProducts,
          size: this.props.Basket[prodIdx].size,
          type: this.props.Basket[prodIdx].type,
          count: this.props.Basket[prodIdx].count,
          manufacture: this.props.Basket[prodIdx].manufacture,
          count_real1: this.props.Basket[prodIdx].count_real1,
          count_real2: this.props.Basket[prodIdx].count_real2,
          count_real5: result.value,
          count_real3: this.props.Basket[prodIdx].count_real3,
          locked: this.props.Basket[prodIdx].locked,
          count_real4: this.props.Basket[prodIdx].count_real4,
          sum:
            parseInt(this.props.Basket[prodIdx].count_real1) +
            parseInt(this.props.Basket[prodIdx].count_real2) +
            parseInt(result.value) +
            parseInt(this.props.Basket[prodIdx].count_real3) +
            parseInt(this.props.Basket[prodIdx].count_real4),
          endDate: this.props.Basket[prodIdx].endDate,
          code: this.props.Basket[prodIdx].code,
          serialNumber:this.props.Basket[prodIdx].serialNumber
        });
      }
    });
  };

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      familyEventList: this.props.Basket.filter((e) => e.selectDirection),
    });
  }
  showSearchTerm = () => {
    if (this.state.term === "") {
      return;
    }
    return (
      <p>
        תוצאות החיפוש :{this.state.term}
        <button
          className="btn btn-sm btn-info"
          onClick={() => this.setState({ term: "" })}
        >
          מחק חיפוש
        </button>
      </p>
    );
  };
  getRemoveProduct = (productName) => {
    Swal.fire({
      title: "? האם לנעול סל זה ",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "כן",
      confirmButtonColor: "green",
      denyButtonText: `לא`,
      denyButtonColor: `red`,
    }).then((result) => {
      if (result.isConfirmed) {
        const prodIdx = getIndexByName(this.props.Basket,productName.id);
        const prodIdx1 = getIndexByNameInventory1(
          this.props.productsInventory,
          productName.code,
          productName.endDate,
        );

        this.props.updateRowInventory({
          id: this.props.productsInventory[prodIdx1].id,
          code:this.props.productsInventory[prodIdx1].code,
          nameProducts: this.props.productsInventory[prodIdx1].nameProducts,
          size: this.props.productsInventory[prodIdx1].size,
          type: this.props.productsInventory[prodIdx1].type,
          count:
            parseInt(this.props.productsInventory[prodIdx1].count) -
            parseInt(this.props.Basket[prodIdx].sum),
          endDate: this.props.productsInventory[prodIdx1].endDate,
          manufacture: this.props.productsInventory[prodIdx1].manufacture,
        });
        this.props.updateRowBasket({
          startDate: this.props.Basket[prodIdx].startDate,
          id: this.props.Basket[prodIdx].id,
          id_inventory: this.props.Basket[prodIdx].id_inventory,
          nameProducts: this.props.Basket[prodIdx].nameProducts,
          size: this.props.Basket[prodIdx].size,
          type: this.props.Basket[prodIdx].type,
          count:
            parseInt(this.props.Basket[prodIdx].count) -
            parseInt(this.props.Basket[prodIdx].sum),
          manufacture: this.props.Basket[prodIdx].manufacture,
          count_real1: this.props.Basket[prodIdx].count_real1,
          count_real2: this.props.Basket[prodIdx].count_real2,
          count_real5: this.props.Basket[prodIdx].count_real5,
          count_real3: this.props.Basket[prodIdx].count_real3,
          locked: true,
          count_real4: this.props.Basket[prodIdx].count_real4,
          sum: this.props.Basket[prodIdx].sum,
          endDate: this.props.Basket[prodIdx].endDate,
          code: this.props.Basket[prodIdx].code,
          serialNumber:this.props.Basket[prodIdx].serialNumber
        });
        this.props.addMovements({
          id:10000*Math.random().toFixed(4),
          name:this.props.productsInventory[prodIdx1].nameProducts,
          code:this.props.productsInventory[prodIdx1].code,
          center:"הדר הכרמל",
          type:this.props.productsInventory[prodIdx1].type,
          manufacture:this.props.productsInventory[prodIdx1].manufacture,
          size:this.props.productsInventory[prodIdx1].size,
          count:this.props.Basket[prodIdx].sum,
          endDate:this.props.Basket[prodIdx].endDate,
          status:"מלאי יוצא-סל מזון",
          created_date:this.state.selected
        })
        Swal.fire({
          title: " השינוי בוצע בהצלחה",
          icon: "success",
          confirmButtonText: "אישור",
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: " נשאר ללא שינוי ",
          icon: "info",
          confirmButtonText: "אישור",
        });
      }
    });
  };

  rowsSearchConfig = () => {
    if (this.state.term === "") {
      return this.props.Basket.filter(
        (x) => x.startDate === this.state.selected
      ).sort((a,b)=> b.serialNumber-a.serialNumber)
    }
      else {
        return this.props.Basket.filter(
          (x) => x.startDate === this.state.selected &&(
            JSON.stringify(x.code).toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.nameProducts.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
            x.type.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
            x.manufacture.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
            x.size.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1  ||
            x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
          )
         
        );
      }
      
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.rowsSearchConfig().slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    // const options1= this.props.events.filter((x)=>x.status === false).map(x => ({
    //   "value":x.type,
    //   "label": x.type
    // }))
    const options = this.props.events
      .filter((x) => x.status === false && x.type.includes("סל מזון"))
      .map((x) => ({
        value: x.startDate,
        label: new Date(x.startDate).toLocaleDateString("en-GB"),
      }));

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense6}>
          <h1>חלוקת סלי מזון</h1>
          <div />
          <div className={classes1.newExpense12}>
            <Select
              className="mt-4 col-md-6 col-offset-4"
              options={options}
              placeholder="בחר תאריך אירוע"
              onChange={(e) => {
                this.setState({ selected: e.value }, () =>
                  this.props.toggleActiveEventsFamily(
                    this.props.events
                      .filter(
                        (x) =>
                          x.status === false &&
                          x.startDate === this.state.selected
                      )
                      .map((x) => x.type)
                  )
                );

                this.props.selectEvent(e.value);

                this.setState({
                  type: this.props.events
                    .filter(
                      (x) =>
                        x.status === false &&
                        x.startDate === this.state.selected
                    )
                    .map((x) => x.type),
                });
              }}
              value={options.filter((x) =>
                this.state.selected.includes(x.value)
              )}
              autoFocus={true}
            />
          </div>
          <button type="button" class="btn btn-primary" onDoubleClick={()=>this.getSelectedNumber1()}>
            {this.props.events
              .filter((x) => x.startDate === this.state.selected)
              .map((y) => y.basket1)}
            :סל א
          </button>
          {"  "}{" "}
          <button type="button" class="btn btn-primary" onDoubleClick={()=>this.getSelectedNumber2()}>
            {this.props.events
              .filter((x) => x.startDate === this.state.selected)
              .map((y) => y.basket2)}
            :סל ב
          </button>
          {"  "}{" "}
          <button type="button" class="btn btn-primary" onDoubleClick={()=>this.getSelectedNumber3()}>
          {this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.basket3)}:סל ג
          </button>
          {"  "}{" "}
          <button type="button" class="btn btn-primary" onDoubleClick={()=>this.getSelectedNumber4()}>
          {this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.basket4)}:סל ד
          </button>
          {"  "}{" "}
          <button type="button" class="btn btn-primary" onDoubleClick={()=>this.getSelectedNumber5()}>
          {this.props.events.filter((x)=>x.startDate === this.state.selected).map((y)=>y.basket5)}:סל ה
          </button>
        </div>
        <div className={classes.tablewrapper}>
          <ActionBar 
            selected={this.state.selected}
            basket={this.props.Basket.filter(
              (x) => x.startDate === this.state.selected
            )}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   מק"ט
                  </th>
                  <th className={classes.header} th scope="col">
                    שם מוצר
                  </th>
                  <th className={classes.header} th scope="col">
                    יחידת מידה
                  </th>
                  <th className={classes.header} th scope="col">
                    סוג
                  </th>
                  <th className={classes.header} th scope="col">
                    יצרן
                  </th>
                  <th className={classes.header} th scope="col">
                    כמות במלאי
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך תפוגה
                  </th>
                  <th className={classes.header} th scope="col">
                    א
                  </th>
                  <th className={classes.header} th scope="col">
                    ב
                  </th>
                  <th className={classes.header} th scope="col">
                    ג
                  </th>
                  <th className={classes.header} th scope="col">
                    ד
                  </th>
                  <th className={classes.header} th scope="col">
                    ה
                  </th>
                  <th className={classes.header} th scope="col">
                    סך הכל
                  </th>
                  <th className={classes.header} th scope="col">
                    נעול
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr >
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>{x.code}</td>
                      <td>{x.nameProducts}</td>
                      <td>{x.size}</td>
                      <td>{x.type}</td>
                      <td>{x.manufacture}</td>
                      <td>{this.props.productsInventory.filter((y)=>y.code ===x.code && y.endDate===x.endDate ).map((z)=>z.count)}</td>
                      <td>{new Date(x.endDate).toLocaleDateString("en-GB")}</td>
                      {(!x.locked && (
                        <td
                          onDoubleClick={() =>
                            this.getSelectedBasket1(
                              x.id,
                              x.id_inventory,
                              x.count_real2,
                              x.count_real3,
                              x.count_real4,
                              x.count_real5,
                            )
                          }
                        >
                          {x.count_real1}
                        </td>
                      )) ||
                        (x.locked && <td>{x.count_real1}</td>)}
                      {(!x.locked && (
                        <td
                          onDoubleClick={() =>
                            this.getSelectedBasket2(
                              x.id,
                              x.id_inventory,
                              x.count_real1,
                              x.count_real3,
                              x.count_real4,
                              x.count_real5,
                            )
                          }
                        >
                          {x.count_real2}
                        </td>
                      )) ||
                        (x.locked && <td>{x.count_real2}</td>)}
                      {(!x.locked && (
                        <td
                          onDoubleClick={() =>
                            this.getSelectedBasket3(
                              x.id,
                              x.id_inventory,
                              x.count_real1,
                              x.count_real2,
                              x.count_real3,
                              x.count_real5,
                             
                            )
                          }
                        >
                          {x.count_real3}
                        </td>
                      )) ||
                        (x.locked && <td>{x.count_real3}</td>)}
                      {(!x.locked && (
                        <td
                          onDoubleClick={() =>
                            this.getSelectedBasket4(
                              x.id,
                              x.id_inventory,
                              x.count_real1,
                              x.count_real2,
                              x.count_real3,
                              x.count_real5,
                            
                            )
                          }
                        >
                          {x.count_real4}
                        </td>
                      )) ||
                        (x.locked && <td> {x.count_real4}</td>)}
                      {(!x.locked && (
                        <td
                          onDoubleClick={() =>
                            this.getSelectedBasket5(
                              x.id,
                              x.id_inventory,
                              x.count_real1,
                              x.count_real2,
                              x.count_real3,
                              x.count_real4,
                              
                            )
                          }
                        >
                          {x.count_real5}
                        </td>
                      )) ||
                        (x.locked && <td>{x.count_real5}</td>)}
                      <td>{x.sum}</td>
                      {(!x.locked && (
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => this.getRemoveProduct(x)}
                          >
                            {" "}
                            נעילה
                          </button>
                        </td>
                      )) ||
                        (x.locked && (
                          <td>
                            <button
                              type="button"
                              class="btn btn-secondary btn-sm"
                              disabled
                            >
                              {" "}
                              נעול
                            </button>
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
              <button
                className="btn btn-primary"
                onClick={() => this.getSelectedRows()}
              >
               מספר רשומות: {this.rowsSearchConfig().length}
              </button>
            </table>

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    familyEvents: state.familyEvents,
    events: state.events,
    type: state.type,
    selectedDate: state.selectedDate,
    date_no_direction: state.date_no_direction,
    type_no_direction: state.type_no_direction,
    Basket: state.Basket,
    productsInventory: state.productsInventory,
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRowBasket,
  updateRowFamilyEvent,
  updatePhone,
  toggleActiveEventsFamily,
  selectEvent,
  toggleModal,
  deleteEventFamily,
  selectEventNoDirection,
  toggleActiveDateFood,
  updateRowInventory,
  updateRowEvents,
  getEvents,getBasket,getInventory,addMovements
})(Basket);
