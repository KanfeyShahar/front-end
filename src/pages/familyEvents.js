import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  toggleActiveEventsFamily,
  selectEvent,
  deleteEventFamily,
  getFamily,
  getEvents,
  getFamilyEvents,
  updateRowEvents,
  updateRowFamilyEvent1
} from "../actions";
import * as IoIcons from "react-icons/io";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRowFamilyEvent, updatePhone,getBasket } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar1 from "../components/ActionBarEventFamily";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class FamilyEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyEventList: [...this.props.familyEvents],
      selected: "",
      type: [...this.props.type],
      MasterCheckedDeliverd: false,
      labalBasket: "סל מזון",
      term: "",
      basket_type: "",
      currentPage: 1,
      postsPerPage: 10,
      // componentDidUpdate() {
      //   this.props.toggleActiveEventsFamily(this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)).then(() => {
      //     alert(this.props.selectedDate);
      //   });
      // }

      // columnHeaders: [
      //   {
      //     name: "שם ראש משפחה",
      //   },
      //   {
      //     name: "שם משפחה",
      //   },
      //   {
      //     name: "טלפון",
      //   },
      //   {
      //     name: "עיר",
      //   },
      //   {
      //     name: "רחוב",
      //   },
      //   {
      //     name: "מספר בניין",
      //   },
      //   {
      //     name: "נפשות",
      //   },
      //   {
      //     name: "תאריך הוספה",
      //   },
      //   {
      //     name: " מצב",
      //   },
      // ],
    };
  }

  componentDidMount() {
    this.props.getFamily();
    this.props.getEvents();
    this.props.getFamilyEvents();
    this.props.getBasket()
  }

  sortRowsFirstName() {
    this.setState({
      familyEventList: this.props.familyEvents.sort((a, b) => {
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
      familyEventList: this.props.familyEvents.sort((a, b) => {
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
      familyEventList: this.props.familyEvents.sort((a, b) => {
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

  sortRowsDirection() {
    this.setState({
      familyEventList: this.props.familyEvents.sort((a, b) => {
        let nameA = a.direction.toLowerCase();
        let nameB = b.direction.toLowerCase();
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
      familyEventList: this.props.familyEvents.sort(
        (a, b) => a.direction - b.direction
      ),
    });
  }

  onMasterCheckBasket(e) {
    // Check/ UnCheck All Items
    this.props.familyEvents.map((x) => (x.selectBasket = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedselectBasket: e.target.checked,
      familyEventList: this.props.familyEvents.filter((e) => e.selectBasket),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckBasket(e, item) {
    this.props.familyEvents.map((x) => {
      if (x.id === item.id && x.startDate === item.startDate) {
        x.selectBasket = e.target.checked;
        const prodIdx = getIndexByName(this.props.familyEvents, item.id);
        this.props.updateRowFamilyEvent1({
          selectBasket: this.props.familyEvents[prodIdx].selectBasket,
        });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.familyEvents.length;
    const totalCheckedItems = this.props.familyEvents.filter(
      (e) => e.selectBasket
    ).length;

    // Update State
    this.setState({
      MasterCheckedDeliverd: totalItems === totalCheckedItems,

      familyEventList: this.props.familyEvents.filter((e) => e.selectBasket),
    });
  }

  handleClick() {
    const idx = this.props.events
      .filter((x) => x.startDate === this.state.selected)
      .map((y) => y.id); 
    const prodIdx = getIndexByName(this.props.events, idx[0]);
    this.props.familyEvents
      .filter((x) => x.selectBasket)
      .map((x) =>
        this.props.updateRowFamilyEvent({
          selectDirection: false,
          selectBasket: false,
          id: x.id,
          serialNumber:x.serialNumber,
          startDate: x.startDate,
          firstName: x.firstName,
          lastName: x.lastName,
          city: x.city,
          address: x.address,
          phone: x.phone,
          numberOfPerson: x.numberOfPerson,
          language: x.language,
          direction: x.direction,
          isDeliverd: x.isDeliverd,
          remarks: x.remarks,
          basket_type: this.state.basket_type,
          number_id: x.number_id,
          details: x.details,
        })
      );
    // Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
  }

  getSelectedRemarks = (ChangeFirstName) => {
    const prodIdx = getIndexByName(this.props.familyEvents, ChangeFirstName);
    Swal.fire({
      title: "הערות",
      input: "text",
      inputValue: this.props.familyEvents[prodIdx].remarks,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length < 0) {
          return "חייב להקליד תפקיד באירוע ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.familyEvents[prodIdx].remarks !== result.value
      ) {
        this.props.updateRowFamilyEvent({
          startDate: this.props.familyEvents[prodIdx].startDate,
          id: this.props.familyEvents[prodIdx].id,
          number_id: this.props.familyEvents[prodIdx].number_id,
          firstName: this.props.familyEvents[prodIdx].firstName,
          lastName: this.props.familyEvents[prodIdx].lastName,
          phone: this.props.familyEvents[prodIdx].phone,
          address: this.props.familyEvents[prodIdx].address,
          city: this.props.familyEvents[prodIdx].city,
          remarks: result.value,
          numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
          language: this.props.familyEvents[prodIdx].language,
          direction: this.props.familyEvents[prodIdx].direction,
          isDeliverd: this.props.familyEvents[prodIdx].isDeliverd,
          details: this.props.familyEvents[prodIdx].details,
          basket_type: this.props.familyEvents[prodIdx].basket_type,
          serialNumber:this.props.familyEvents[prodIdx].serialNumber
        });
      }
    });
  };

  getSelectedDirection = (ChangeDirection) => {
    selectRow(ChangeDirection);
    const prodIdx = getIndexByName(this.props.familyEvents, ChangeDirection);
    Swal.fire({
      title: `שנה מסלול `,
      input: "select",
      inputOptions: {
        "מסלול 1": "מסלול 1",
        "מסלול 2": "מסלול 2",
        "מסלול 3": "מסלול 3",
        "מסלול 4": "מסלול 4",
        "מסלול 5": "מסלול 5",
        "מסלול 6": "מסלול 6",
        "מסלול 7": "מסלול 7",
        "מסלול 8": "מסלול 8",
        "מסלול 9": "מסלול 9",
        "מסלול 10": "מסלול 10",
        "מסלול 11": "מסלול 11",
        "מסלול 12": "מסלול 12",
        "מסלול 13": "מסלול 13",
        "מסלול 14": "מסלול 14",
        "מסלול 15": "מסלול 15",
        "מסלול 16": "מסלול 16",
        "מסלול 17": "מסלול 17",
        "מסלול 18": "מסלול 18",
        "מסלול 19": "מסלול 19",
        "מסלול 20": "מסלול 20",
      },
      inputPlaceholder: "בחר מסלול",
      inputValue: this.props.familyEvents[prodIdx].direction,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור מסלול";
        }
      },
    }).then((result) => {
      {
        this.props.updateRowFamilyEvent({
          startDate: this.props.familyEvents[prodIdx].startDate,
          id: this.props.familyEvents[prodIdx].id,
          number_id: this.props.familyEvents[prodIdx].number_id,
          firstName: this.props.familyEvents[prodIdx].firstName,
          lastName: this.props.familyEvents[prodIdx].lastName,
          phone: this.props.familyEvents[prodIdx].phone,
          address: this.props.familyEvents[prodIdx].address,
          city: this.props.familyEvents[prodIdx].city,
          remarks: this.props.familyEvents[prodIdx].remarks,
          numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
          language: this.props.familyEvents[prodIdx].language,
          direction: result.value,
          isDeliverd: this.props.familyEvents[prodIdx].isDeliverd,
          details: this.props.familyEvents[prodIdx].details,
          basket_type: this.props.familyEvents[prodIdx].basket_type,
          serialNumber:this.props.familyEvents[prodIdx].serialNumber
        });
      }
    });
  };

  getSelectedBasket = (ChangeDirection) => {
    selectRow(ChangeDirection);
    const prodIdx = getIndexByName(this.props.familyEvents, ChangeDirection);
    Swal.fire({
      title: `שנה מספר סל `,
      input: "select",
      inputOptions: {
        "סל א": "סל א",
        "סל ב": "סל ב",
        "סל ג": "סל ג",
        "סל ד": "סל ד",
        "סל ה": "סל ה",
      },
      inputPlaceholder: "בחר מסלול",
      inputValue: this.props.familyEvents[prodIdx].direction,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור סוג סל";
        }
      },
    }).then((result) => {
      {
        this.props.updateRowFamilyEvent({
          startDate: this.props.familyEvents[prodIdx].startDate,
          id: this.props.familyEvents[prodIdx].id,
          number_id: this.props.familyEvents[prodIdx].number_id,
          firstName: this.props.familyEvents[prodIdx].firstName,
          lastName: this.props.familyEvents[prodIdx].lastName,
          phone: this.props.familyEvents[prodIdx].phone,
          address: this.props.familyEvents[prodIdx].address,
          city: this.props.familyEvents[prodIdx].city,
          remarks: this.props.familyEvents[prodIdx].remarks,
          numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
          language: this.props.familyEvents[prodIdx].language,
          direction: this.props.familyEvents[prodIdx].direction,
          isDeliverd: this.props.familyEvents[prodIdx].isDeliverd,
          details: this.props.familyEvents[prodIdx].details,
          basket_type: result.value,
          serialNumber:this.props.familyEvents[prodIdx].serialNumber
        });
      }
    });
  };

  getSelectedStatus = (ChangeDirection) => {
    const prodIdx = getIndexByName(this.props.familyEvents, ChangeDirection);
    Swal.fire({
      title: `שנה סטטוס משלוח `,
      input: "select",
      inputOptions: {
        מוכן: "מוכן",
        "לא מוכן": " לא מוכן",
      },
      inputPlaceholder: "בחר סטטוס משלוח",
      inputValue: this.props.familyEvents[prodIdx].details,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור סטטוס משלוח  ";
        }
      },
    }).then((result) => {
      {
        this.props.updateRowFamilyEvent({
          startDate: this.props.familyEvents[prodIdx].startDate,
          id: this.props.familyEvents[prodIdx].id,
          number_id: this.props.familyEvents[prodIdx].number_id,
          firstName: this.props.familyEvents[prodIdx].firstName,
          lastName: this.props.familyEvents[prodIdx].lastName,
          phone: this.props.familyEvents[prodIdx].phone,
          address: this.props.familyEvents[prodIdx].address,
          city: this.props.familyEvents[prodIdx].city,
          remarks: this.props.familyEvents[prodIdx].remarks,
          numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
          language: this.props.familyEvents[prodIdx].language,
          direction: this.props.familyEvents[prodIdx].direction,
          isDeliverd: this.props.familyEvents[prodIdx].isDeliverd,
          details: result.value,
          basket_type: this.props.familyEvents[prodIdx].basket_type,
          serialNumber:this.props.familyEvents[prodIdx].serialNumber
        });
      }
    });
  };

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.familyEvents.map((x) => (x.isDeliverd = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedDeliverd: e.target.checked,
      familyEventList: this.props.familyEvents.filter((e) => e.isDeliverd),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.familyEvents.map((x) => {
      if (x.id === item.id && x.startDate === item.startDate) {
        x.isDeliverd = e.target.checked;
        const prodIdx = getIndexByName(this.props.familyEvents, item.id);
        this.props.updateRowFamilyEvent1({
          startDate: this.props.familyEvents[prodIdx].startDate,
          id: this.props.familyEvents[prodIdx].id,
          number_id: this.props.familyEvents[prodIdx].number_id,
          firstName: this.props.familyEvents[prodIdx].firstName,
          lastName: this.props.familyEvents[prodIdx].lastName,
          phone: this.props.familyEvents[prodIdx].phone,
          address: this.props.familyEvents[prodIdx].address,
          city: this.props.familyEvents[prodIdx].city,
          remarks: this.props.familyEvents[prodIdx].remarks,
          numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
          language: this.props.familyEvents[prodIdx].language,
          direction: this.props.familyEvents[prodIdx].direction,
          isDeliverd:  e.target.checked,
          details:this.props.familyEvents[prodIdx].details,
          basket_type: this.props.familyEvents[prodIdx].basket_type,
          serialNumber:this.props.familyEvents[prodIdx].serialNumber
        });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.familyEvents.length;
    const totalCheckedItems = this.props.familyEvents.filter(
      (e) => e.isDeliverd
    ).length;

    // Update State
    this.setState({
      MasterCheckedDeliverd: totalItems === totalCheckedItems,

      familyEventList: this.props.familyEvents.filter((e) => e.isDeliverd),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      familyEventList: this.props.familyEvents.filter((e) => e.isDeliverd),
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
  removeProduct = (item) => {
    const prodIdx = getIndexByName(this.props.familyEvents, item.id);
    Swal.fire({
      title: "? האם ברצונך למחוק רשומה זו",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "כן",
      confirmButtonColor: "green",
      denyButtonText: `לא`,
      denyButtonColor: `red`,
    }).then((result) => {
      if (result.isConfirmed) {
        const DeleteFamily = {
          startDate: this.props.familyEvents[prodIdx].startDate,
          id: this.props.familyEvents[prodIdx].id,
          number_id: this.props.familyEvents[prodIdx].number_id,
          firstName: this.props.familyEvents[prodIdx].firstName,
          lastName: this.props.familyEvents[prodIdx].lastName,
          phone: this.props.familyEvents[prodIdx].phone,
          address: this.props.familyEvents[prodIdx].address,
          city: this.props.familyEvents[prodIdx].city,
          remarks: this.props.familyEvents[prodIdx].remarks,
          numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
          language: this.props.familyEvents[prodIdx].language,
          direction: this.props.familyEvents[prodIdx].direction,
          isDeliverd: this.props.familyEvents[prodIdx].isDeliverd,
          details: this.props.familyEvents[prodIdx].details,
          basket_type: this.props.familyEvents[prodIdx].basket_type,
          serialNumber:this.props.familyEvents[prodIdx].serialNumber
        };
        this.props.deleteEventFamily(DeleteFamily);
        // Swal.fire({
        //   title: " נמחק בהצלחה",
        //   icon: "success",
        //   confirmButtonText: "אישור",
        // });
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
      return this.props.familyEvents.filter(
        (x) => x.startDate === this.state.selected
      ).sort((a,b)=>b.serialNumber-a.serialNumber)
    }
      else {
        return this.props.familyEvents.filter(
          (x) =>(x.startDate === this.state.selected) &&(
            x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.city.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.address.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.numberOfPerson.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          x.language.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          x.basket_type.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
          )
           
        ).sort((a,b)=>b.serialNumber-a.serialNumber)
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
      .filter((x) => x.status === false)
      .map((x) => ({
        value: x.startDate,
        label: new Date(x.startDate).toLocaleDateString("en-GB"),
      }));

    const options1 = [
      { value: "סל א", label: "סל א" },
      { value: "סל ב", label: "סל ב" },
      { value: "סל ג", label: "סל ג" },
      { value: "סל ד", label: "סל ד" },
      { value: "סל ה", label: "סל ה" },
    ];
    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense6}>
          <h1>משפחות באירוע</h1>
          סוג אירוע:
          {this.props.events
            .filter(
              (x) => x.status === false && x.startDate === this.state.selected
            )
            .map((x) => x.type)}
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
            {this.state.labalBasket.localeCompare(
              this.props.events
                .filter(
                  (x) =>
                    x.status === false && x.startDate === this.state.selected
                )
                .map((x) => x.type)
            ) === 0 ? (
              <div>
                {" "}
                <Select
                  className="mt-4 col-md-6 col-offset-4"
                  options={options1}
                  placeholder="בחר סל מזון"
                  onChange={(e) => {
                    this.setState({ basket_type: e.value });
                  }}
                  value={options1.filter(
                    (x) => this.state.basket_type === x.value
                  )}
                  autoFocus={true}
                />{" "}
              </div>
            ) : ""}
          </div>
          {this.state.labalBasket.localeCompare(
              this.props.events
                .filter(
                  (x) =>
                    x.status === false && x.startDate === this.state.selected
                )
                .map((x) => x.type)
            ) === 0 ? <div className={classes.row1}>
            <button
              class="btn btn-outline-primary"
              onClick={() => this.handleClick()}
            >
              שיוך סל
            </button>
          </div> : ""}
          {this.state.labalBasket.localeCompare(
            this.props.events
              .filter(
                (x) => x.status === false && x.startDate === this.state.selected
              )
              .map((x) => x.type)
          ) === 0 ? (
            <div>
              {" "}
              <div>
                מספר סלים מסוג זה שהוגדרו:
                {this.state.basket_type === "סל א"
                  ? this.props.events
                      .filter((x) => x.startDate === this.state.selected)
                      .map((y) => y.basket1)
                  : this.state.basket_type === "סל ב"
                  ? this.props.events
                      .filter((x) => x.startDate === this.state.selected)
                      .map((y) => y.basket2)
                  : this.state.basket_type === "סל ג"
                  ? this.props.events
                      .filter((x) => x.startDate === this.state.selected)
                      .map((y) => y.basket3)
                  : this.state.basket_type === "סל ד"
                  ? this.props.events
                      .filter((x) => x.startDate === this.state.selected)
                      .map((y) => y.basket4)
                  : this.state.basket_type === "סל ה"
                  ? this.props.events
                      .filter((x) => x.startDate === this.state.selected)
                      .map((y) => y.basket5)
                  : ""}
              
            {", "} {"   "} {"   "} {"   "}
                מספר סלים מסוג זה שסווגו:
                {this.state.basket_type === "סל א"
                  ? this.props.familyEvents.filter(
                      (x) =>
                        x.startDate === this.state.selected &&
                        x.basket_type === "סל א"
                    ).length
                  : this.state.basket_type === "סל ב"
                  ? this.props.familyEvents.filter(
                      (x) =>
                        x.startDate === this.state.selected &&
                        x.basket_type === "סל ב"
                    ).length
                  : this.state.basket_type === "סל ג"
                  ? this.props.familyEvents.filter(
                      (x) =>
                        x.startDate === this.state.selected &&
                        x.basket_type === "סל ג"
                    ).length
                  : this.state.basket_type === "סל ד"
                  ? this.props.familyEvents.filter(
                      (x) =>
                        x.startDate === this.state.selected &&
                        x.basket_type === "סל ד"
                    ).length
                  : this.state.basket_type === "סל ה"
                  ? this.props.familyEvents.filter(
                      (x) =>
                        x.startDate === this.state.selected &&
                        x.basket_type === "סל ה"
                    ).length
                  : ""}
             </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={classes.tablewrapper2}>
          <ActionBar1
            date={this.state.selected}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.child1}></th>
                  <th className={classes.header} th scope="col">
                    ראש משפחה
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsFirstName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    שם משפחה
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsLastName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    עיר
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsCity()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    כתובת
                  </th>
                  <th className={classes.header} th scope="col">
                    טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                    נפשות בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                    שפה
                  </th>
                  {this.state.labalBasket.localeCompare(
                    this.props.events
                      .filter(
                        (x) =>
                          x.status === false &&
                          x.startDate === this.state.selected
                      )
                      .map((x) => x.type)
                  ) === 0 && (
                    <th className={classes.header} th scope="col">
                      סל
                    </th>
                  )}
                  <th className={classes.header} th scope="col">
                    הערות
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsDirection()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  {this.state.labalBasket.localeCompare(
                    this.props.events
                      .filter(
                        (x) =>
                          x.status === false &&
                          x.startDate === this.state.selected
                      )
                      .map((x) => x.type)
                  ) === 0 && (
                    <th className={classes.header} th scope="col">
                      מצב משלוח
                    </th>
                  )}
                  <th className={classes.header} th scope="col">
                    נמסר
                  </th>
                  
                  <th className={classes.header} th scope="col">
                   סיבה לאי מסירה
                  </th>
                  <th className={classes.header} th scope="col">
                    מחיקה
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td className={classes.child1}>
                        {" "}
                        <input
                          key={x.SelectDirection}
                          type="checkbox"
                          checked={x.selectBasket}
                          className="form-check-input"
                          id="rowcheck{x.selectBasket}"
                          onChange={(e) => this.onItemCheckBasket(e, x)}
                        />
                      </td>
            
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.firstName)}</td>
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.lastName)}</td>
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.city)}</td>
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.address)}</td>
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.phone)}</td>
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.numberOfPerson)}</td>
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.language)}</td>
             
                      {this.state.labalBasket.localeCompare(
                        this.props.events
                          .filter(
                            (x) =>
                              x.status === false &&
                              x.startDate === this.state.selected
                          )
                          .map((x) => x.type)
                      ) === 0 && (
                        <td onDoubleClick={() => this.getSelectedBasket(x.id)}>
                          {x.basket_type}
                        </td>
                      )}
                      <td>{this.props.families.filter((y)=>y.id === x.number_id).map((y)=>y.remarks)}</td>
                      {/* <td onDoubleClick={() => this.getSelectedDirection(x.id)}>
                        {x.direction}
                      </td> */}
                  
                      {this.state.labalBasket.localeCompare(
                        this.props.events
                          .filter(
                            (x) =>
                              x.status === false &&
                              x.startDate === this.state.selected
                          )
                          .map((x) => x.type)
                      ) === 0 && (
                        <td onDoubleClick={() => this.getSelectedStatus(x.id)}>
                          {x.details}
                        </td>
                      )}
                      <td className={x.isDeliverd ? "hot" : ""}>
                        <input
                          type="checkbox"
                          checked={x.isDeliverd}
                          className="form-check-input"
                          id="rowcheck{x.isDeliverd}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      </td>
                      <td onDoubleClick={() => this.getSelectedRemarks(x.id)}>
                        {x.remarks}
                      </td>
                      <td>
                        <button
                          className={classes.child1}
                          className="btn btn-info"
                          onClick={() => this.removeProduct(x)}
                        >
                          <IoIcons.IoMdTrash />
                          מחיקה
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
            <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              מספר משפחות באירוע: {this.rowsSearchConfig().length}
            </button>
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
    families: state.families,
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRowFamilyEvent,
  updatePhone,
  toggleActiveEventsFamily,
  selectEvent,
  deleteEventFamily,
  getFamily,
  getEvents,
  getFamilyEvents,
  updateRowEvents,
  updateRowFamilyEvent1,
  getBasket
})(FamilyEvent);
