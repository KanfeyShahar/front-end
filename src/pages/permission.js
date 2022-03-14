import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updatePermissions ,getPermissions} from "../actions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBaPermissions";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PermissionsList: [...this.props.permissions],
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
    };
  }

  componentDidMount(){
    this.props.getPermissions()
  }

  
  getSelectedHall = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].hall,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].hall !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:result.value,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  };
  
  getSelectedRooms = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].rooms,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].rooms !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:result.value,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  };

  getSelectedProducts = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].products,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].products !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:result.value,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  };

  getSelectedOrders = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].orders,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].orders !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:result.value,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  };

  getSelectedInventory = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].inventory,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].inventory !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:result.value,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  };

  getSelectedMovements = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].movements,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].movements !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:result.value,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  };

  getSelectedEquipments = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].equipments,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].equipments !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:result.value,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  }
  getSelectedCars = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].cars,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].cars !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:result.value,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  }

  getSelectedMonitorInventory = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].monitoring_inventory,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].monitoring_inventory !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:result.value,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  }

  
  getSelectedFriends = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].friends,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].friends !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:result.value,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  }

  getSelectedFamily = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].family,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].family !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:result.value,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  }

  getSelectedEvent = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].event,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].event !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:result.value,
        monitoring_event:this.props.permissions[prodIdx].monitoring_event,
        });
      }
    });
  }

  getSelectedMonitorEvent = (x) => {
    const prodIdx = getIndexByName(this.props.permissions, x.id);
    Swal.fire({
      title: `שנה הרשאה `,
      input: "select",
      inputOptions: {
          'עריכה': 'עריכה',
          'צפיה בלבד': 'צפיה בלבד',
          'אין הרשאה': 'אין הרשאה',
        },
      inputPlaceholder: ' בחר הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.permissions[prodIdx].monitoring_event,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.permissions[prodIdx].monitoring_event !== result.value
      ) {
        this.props.updatePermissions({
        id: this.props.permissions[prodIdx].id,
        type_permission:this.props.permissions[prodIdx].type_permission,
        hall:this.props.permissions[prodIdx].hall,
        rooms:this.props.permissions[prodIdx].rooms,
        products:this.props.permissions[prodIdx].products,
        orders:this.props.permissions[prodIdx].orders,
        inventory:this.props.permissions[prodIdx].inventory,
        movements:this.props.permissions[prodIdx].movements,
        equipments:this.props.permissions[prodIdx].equipments,
        cars:this.props.permissions[prodIdx].cars,
        monitoring_inventory:this.props.permissions[prodIdx].monitoring_inventory,
        friends:this.props.permissions[prodIdx].friends,
        family:this.props.permissions[prodIdx].family,
        event:this.props.permissions[prodIdx].event,
        monitoring_event:result.value,
        });
      }
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

  rowsSearchConfig = () => {
    if (this.state.term === ""  ) {
      return this.props.permissions
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.permissions.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%"}}>
        <div className={classes1.newexpense6}>
        <h1>ניהול סוגי הרשאות</h1>
          <div />
        </div>

        <div className={classes.tablewrapper}>
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
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                  סוג הרשאה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                 אולם
                  </th>
                  <th className={classes.header} th scope="col">
                 חדרים
                  </th>
                  <th className={classes.header} th scope="col">
                    הזמנת מוצרים
                  </th>
                  <th className={classes.header} th scope="col">
                   מעקב הזמנות
                  </th>
                  <th className={classes.header} th scope="col">
                  מלאי
                  </th>
                  <th className={classes.header} th scope="col">
                  תנועות מלאי
                  </th>
                  <th className={classes.header} th scope="col">
                  ניהול ציוד
                  </th>
                  <th className={classes.header} th scope="col">
                 רכבים
                  </th>
                  <th className={classes.header} th scope="col">
                בקרת מלאי
                  </th>
                  <th className={classes.header} th scope="col">
                חברי עמותה
                  </th>
                  <th className={classes.header} th scope="col">
                משפחות
                  </th>
                  <th className={classes.header} th scope="col">
                אירוע
                  </th>
                  <th className={classes.header} th scope="col">
                בקרת אירוע
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td className={classes1.type121}>
                        {x.type_permission}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedHall(x)}>
                        {x.hall}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedRooms(x)}>
                        {x.rooms}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedProducts(x)}>
                        {x.products}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedOrders(x)}>
                        {x.orders}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedInventory(x)}>
                        {x.inventory}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedMovements(x)}>
                        {x.movements}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedEquipments(x)}>
                        {x.equipments}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedCars(x)}>
                        {x.cars}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedMonitorInventory(x)}>
                        {x.monitoring_inventory}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedFriends(x)}>
                        {x.friends}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedFamily(x)}>
                        {x.family}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedEvent(x)}>
                        {x.event}
                      </td>
                      <td className={classes1.type121} onDoubleClick={() => this.getSelectedMonitorEvent(x)}>
                        {x.monitoring_event}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
              מספר סוגי הרשאות: {this.rowsSearchConfig().length}
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
    permissions: state.permissions,
  };
};

export default connect(mapStateToProps, { selectRow, updatePermissions,getPermissions })(
  Permission
);
