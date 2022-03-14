import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toggleActive, toggleFood, toggleHot, getFamily,loadingData,loadingDataNot } from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRow,updateRow1, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBar";
import Pagination from "./pagination";
import Loader from "./loader"
import "./switch.css";
import "./row.css";
import { GiConsoleController } from "react-icons/gi";


class Family extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyList: [...this.props.families],
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      loader:false,
      term: "",
      currentPage: 1,
      postsPerPage: 10,

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
  }

  sortRows() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
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
  sortRowsLast() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
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
      familyList: this.props.families.sort((a, b) => {
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
  sortRowsAddress() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
        let nameA = a.address.toLowerCase();
        let nameB = b.address.toLowerCase();
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
      familyList: this.props.families.sort(
        (a, b) => a.numberOfPerson - b.numberOfPerson
      ),
    });
  }

  sortRowDate() {
    this.setState({
      familyList: this.props.families.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      ),
    });
  }

  onMasterCheckHot(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.hot = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedHot: e.target.checked,
      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckHot(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id) {
        x.hot = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          hot: e.target.checked,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
        });
        console.log(this.props.families);
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter((e) => e.hot).length;

    // Update State
    this.setState({
      MasterCheckedHot: totalItems === totalCheckedItems,

      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRowsHot() {
    this.setState({
      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  onMasterCheckFood(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.food = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedFood: e.target.checked,
      familyList: this.props.families.filter((e) => e.food),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckFood(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id) {
        x.food = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          food: e.target.checked,
          status: this.props.families[prodIdx].status,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
        });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter((e) => e.food).length;

    // Update State
    this.setState({
      MasterCheckedFood: totalItems === totalCheckedItems,

      familyList: this.props.families.filter((e) => e.food),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRowsFood() {
    this.setState({
      familyList: this.props.families.filter((e) => e.food),
    });
  }

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      familyList: this.props.families.filter((e) => e.status),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id) {
        x.status = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: e.target.checked,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          dateEnd: new Date(),
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });

        if (!item.status) {
          item.dateEnd = new Date();
        }
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      familyList: this.props.families.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      familyList: this.props.families.filter((e) => e.status),
    });
  }

  getSelectedFirstName = (ChangeFirstName) => {
    selectRow(ChangeFirstName);
    const prodIdx = getIndexByName(this.props.families, ChangeFirstName);
    Swal.fire({
      title: "עדכן את שם ראש המשפחה",
      input: "text",
      inputValue: this.props.families[prodIdx].firstName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם ראש משפחה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].firstName !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: result.value,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };
  getSelectedLastName = (ChangeLastName) => {
    selectRow(ChangeLastName);
    const prodIdx = getIndexByName(this.props.families, ChangeLastName);
    Swal.fire({
      title: `שנה שם משפחה`,
      input: "text",
      inputValue: this.props.families[prodIdx].lastName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם משפחה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].lastName !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: result.value,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };
  getSelectedPhone = (ChangePhone) => {
    selectRow(ChangePhone);
    const prodIdx = getIndexByName(this.props.families, ChangePhone);

    Swal.fire({
      title: `שנה מספר טלפון`,
      input: "text",
      inputValue: this.props.families[prodIdx].phone,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד מספר טלפון ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].phone !== result.value &&
        getIndexByPhone(this.props.families, result.value) === -1
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: result.value,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      } else if (this.props.families[prodIdx].phone === result.value) {
        Swal.fire({
          icon: "warning",
          title: "מספר הטלפון לא שונה",
          confirmButtonText: "אישור",
          confirmButtonColor: "orange",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "מספר הטלפון שהזנת קיים במערכת",
          confirmButtonText: "אישור",
          confirmButtonColor: "red",
        });
      }
    });
  };
  getSelectedAddress = (ChangeAddress) => {
  
    selectRow(ChangeAddress);
    const prodIdx = getIndexByName(this.props.families, ChangeAddress);
    let old_address=this.props.families[prodIdx].address;
    let old_city=this.props.families[prodIdx].city
    Swal.fire({
      title: `שינוי שם רחוב `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].address,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "כתובת";
        }
      },
    }).then((result) => {
      if (
        result.value 
      ) {
        let new_address=result.value
        Swal.fire({
          title: `שינוי עיר`,
          input: "text",
          confirmButtonText: "אישור",
          confirmButtonColor: "green",
          inputValue: this.props.families[prodIdx].city,
          inputValidator: (value) => {
            if (value.length <= 0) {
              return "חייב עיר";
            }
          },
        }).then((result) => {
          this.props.loadingData()
          if (
            result.value 
          ) {
            try {
             
              this.props.updateRow1({
                id: this.props.families[prodIdx].id,
                firstName: this.props.families[prodIdx].firstName,
                lastName: this.props.families[prodIdx].lastName,
                phone: this.props.families[prodIdx].phone,
                address: new_address,
                city: result.value,
                remarks: this.props.families[prodIdx].remarks,
                numberOfPerson: this.props.families[prodIdx].numberOfPerson,
                language: this.props.families[prodIdx].language,
                created_date: this.props.families[prodIdx].created_date,
                status: this.props.families[prodIdx].status,
                food: this.props.families[prodIdx].food,
                hot: this.props.families[prodIdx].hot,
                dateEnd: this.props.families[prodIdx].dateEnd,
                floor: this.props.families[prodIdx].floor,
                entrance: this.props.families[prodIdx].entrance,
                apartment: this.props.families[prodIdx].apartment,
                latitude: this.props.families[prodIdx].latitude,
                longitude: this.props.families[prodIdx].longitude,
              });
            } catch (e) {
              this.props.updateRow({
                id: this.props.families[prodIdx].id,
                firstName: this.props.families[prodIdx].firstName,
                lastName: this.props.families[prodIdx].lastName,
                phone: this.props.families[prodIdx].phone,
                address: old_address,
                city: old_city,
                remarks: this.props.families[prodIdx].remarks,
                numberOfPerson: this.props.families[prodIdx].numberOfPerson,
                language: this.props.families[prodIdx].language,
                created_date: this.props.families[prodIdx].created_date,
                floor: this.props.families[prodIdx].floor,
                entrance: this.props.families[prodIdx].entrance,
                apartment: this.props.families[prodIdx].apartment,
                status: this.props.families[prodIdx].status,
                food: this.props.families[prodIdx].food,
                hot: this.props.families[prodIdx].hot,
                dateEnd: this.props.families[prodIdx].dateEnd,
                latitude: this.props.families[prodIdx].latitude,
                longitude: this.props.families[prodIdx].longitude,
              });
              Swal.fire({
                icon: "warning",
                title: "הכתובת לא תקינה, נא הקלד כתובת חדשה",
                confirmButtonText: "אישור",
                confirmButtonColor: "orange",
              });
            }
            
          }
        });
      }
    });
  };

  getSelectedLanguage = (ChangeLanguage) => {
    selectRow(ChangeLanguage);
    const prodIdx = getIndexByName(this.props.families, ChangeLanguage);
    Swal.fire({
      title: `שנה שפת אם `,
      input: "select",
      inputOptions: {
        עברית: "עברית",
        אנגלית: "אנגלית",
        רוסית: "רוסית",
        ערבית: "ערבית",
      },
      inputPlaceholder: "בחר שפה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].language,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "שפה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].language !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: result.value,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };
  getSelectedCity = (ChangeCity) => {
    selectRow(ChangeCity);
    const prodIdx = getIndexByName(this.props.families, ChangeCity);
    Swal.fire({
      title: ` שינוי עיר`,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].city,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד עיר";
        }
      },
    }).then((result) => {
      if (result.value && this.props.families[prodIdx].city !== result.value) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: result.value,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };

  getSelectedFloor = (ChangeNumberOfHome) => {
    selectRow(ChangeNumberOfHome);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfHome);
    Swal.fire({
      title: ` עדכן קומה : `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].floor,
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].floor !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: result.value,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };

  getSelectedEntrance = (ChangeNumberOfHome) => {
    selectRow(ChangeNumberOfHome);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfHome);
    Swal.fire({
      title: ` עדכן כניסה : `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].entrance,
    }).then((result) => {
     
      if (
        result.value &&
        this.props.families[prodIdx].entrance !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: result.value,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };

  getSelectedApartment = (ChangeNumberOfHome) => {
    selectRow(ChangeNumberOfHome);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfHome);
    Swal.fire({
      title: ` עדכן מספר דירה : `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].apartment,
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].apartment !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          apartment: result.value,
          entrance: this.props.families[prodIdx].entrance,
        });
      }
    });
  };



  getSelectedRemark = (ChangeNumberOfHome) => {
    selectRow(ChangeNumberOfHome);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfHome);
    Swal.fire({
      title: ` עדכן הערות : `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].remarks,
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].remarks !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: result.value,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          dateEnd: this.props.families[prodIdx].dateEnd,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };
  getSelectedNumberOfPerson = (ChangeNumberOfPerson) => {
    selectRow(ChangeNumberOfPerson);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfPerson);
    Swal.fire({
      title: ` שנה את מספר הנפשות במשפחה: `,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].numberOfPerson,
      inputValidator: (value) => {
        if (value <= 1) {
          return "מספר הנפשות חייב להיות לפחות 1";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].numberOfPerson !== result.value
      ) {
        this.props.loadingData()
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: parseInt(result.value),
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
          latitude: this.props.families[prodIdx].latitude,
          longitude: this.props.families[prodIdx].longitude,
          floor: this.props.families[prodIdx].floor,
          entrance: this.props.families[prodIdx].entrance,
          apartment: this.props.families[prodIdx].apartment,
        });
      }
    });
  };

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

  rowsSearchConfig = () => {
    if (this.state.term === "" && this.props.active) {
      return this.props.families.filter((x) => x.status);
    }
    if (this.state.term === "סל מזון" && this.props.active) {
      return this.props.families.filter((x) => x.status && x.food);
    }
    if (
      this.state.term === "ארוחה חמה" &&
      this.props.active &&
      this.props.activeHot
    ) {
      return this.props.families.filter((x) => x.status && x.hot);
    }
    if (this.state.term === "" && !this.props.active) {
      return this.props.families.filter((x) => !x.status);
    } else {
      return this.props.families.filter(
        (x) =>
          x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.city.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.address.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.language.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
      );
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.families.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        {this.props.Loading && <Loader/>}
        <div className={classes1.newexpense40}>
          <h1>משפחות בעמותה</h1>

          <div class="toggle-button-cover">
            <div class="button-cover">
              <div class="button r" id="button-1">
                <input
                  type="checkbox"
                  class="checkbox"
                  onClick={() => this.props.toggleActive()}
                />
                <div class="knobs"></div>
                <div class="layer"></div>
              </div>
            </div>
          </div>

          <div />
        </div>

        <div className={classes.tablewrappe22}>
          {/* <button
            className="btn btn-outline-info"
            onClick={() => {
              this.setState({
                familyList: this.props.families.reverse(),
              });
            }}
          >
            חזרה למצב הקודם
          </button>{" "} */}
          <ActionBar
            family={this.props.families.filter((x) => x.status)}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                    שם ראש משפחה
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    שם משפחה
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsLast()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    טלפון
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
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsAddress()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">קומה</th>
                  <th className={classes.header} th scope="col">דירה</th>
                  <th className={classes.header} th scope="col">כניסה</th>
                  <th className={classes.header} th scope="col">
                    נפשות בפועל
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowNumber()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    שפה
                  </th>

                  <th className={classes.header} th scope="col">
                    פעילה
                  </th>
                  <th className={classes.header} th scope="col">
                    סל מזון
                  </th>
                  <th className={classes.header} th scope="col">
                    ארוחה חמה
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך הוספה
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th
                    className={
                      (this.props.active && classes.showHidden) ||
                      (!this.props.active && classes.header)
                    }
                    th
                    scope="col"
                  >
                    תאריך סיום
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    הערות
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig().sort( (a, b) =>new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime())
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td onDoubleClick={() => this.getSelectedFirstName(x.id)}>
                        {x.firstName}
                      </td>
                      <td onDoubleClick={() => this.getSelectedLastName(x.id)}>
                        {x.lastName}
                      </td>
                      <td onDoubleClick={() => this.getSelectedPhone(x.id)}>
                        {x.phone}
                      </td>
                      <td onDoubleClick={() => this.getSelectedAddress(x.id)}>
                        {x.city}
                      </td>
                      <td onDoubleClick={() => this.getSelectedAddress(x.id)}>
                        {x.address}
                      </td>
                      <td onDoubleClick={() => this.getSelectedFloor(x.id)}>{x.floor}</td>
                      <td onDoubleClick={() => this.getSelectedApartment(x.id)}>{x.apartment}</td>
                      <td onDoubleClick={() => this.getSelectedEntrance(x.id)}>{x.entrance}</td>
                      <td
                        onDoubleClick={() =>
                          this.getSelectedNumberOfPerson(x.id)
                        }
                      >
                        {x.numberOfPerson}
                      </td>
                      <td onDoubleClick={() => this.getSelectedLanguage(x.id)}>
                        {x.language}
                      </td>

                      <td key={x.id} className={x.status ? "status" : ""}>
                        <input
                          type="checkbox"
                          checked={x.status}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      </td>
                      <td key={x.food} className={x.food ? "food" : ""}>
                        <input
                          type="checkbox"
                          checked={x.food}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheckFood(e, x)}
                        />
                      </td>
                      <td className={x.hot ? "hot" : ""}>
                        <input
                          type="checkbox"
                          checked={x.hot}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheckHot(e, x)}
                        />
                      </td>
                      <td>
                        {new Date(x.created_date).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        className={
                          (!x.status && classes.show) ||
                          (x.status && classes.showHidden)
                        }
                      >
                        {" "}
                        {new Date(x.dateEnd).toLocaleDateString("en-GB")}
                      </td>
                      <td onDoubleClick={() => this.getSelectedRemark(x.id)}>
                        {x.remarks}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button
                className="btn btn-primary"
                onClick={() => this.getSelectedRows()}
              >
                מספר משפחות: {this.rowsSearchConfig().length}
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
    families: state.families,
    active: state.active,
    activeFood: state.activeFood,
    activeHot: state.activeHot,
    Loading:state.Loading
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRow,
  updatePhone,
  toggleActive,
  toggleFood,
  toggleHot,
  getFamily,
  loadingData,
  updateRow1
})(Family);
