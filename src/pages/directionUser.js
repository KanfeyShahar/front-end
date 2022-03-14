import React, { useState, useEffect } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import waze from "./image/waze.jpg";
import classes from "./styleDirection.module.css";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import {
  updateRowFamilyEvent,
  getEvents,
  getFamilyEvents,
  getFamily,
} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const Displays = () => {};
const Direction = (props) => {
  useEffect(() => {
    props.getEvents();
    props.getFamilyEvents();
    props.getFamily();
  }, []);



  const openNew = (x) =>{
    const address=`${props.familyEvents.address},${props.familyEvents.city}`
    console.log(`https://www.waze.com/ul?ll=${props.families
    .filter((y) => y.id === x)
    .map((z) => z.latitude)}%2C${props.families
    .filter((y) => y.id === x)
    .map((z) => z.longitude)}&navigate=yes&zoom=17`)
    window.open(
        `https://www.waze.com/ul?ll=${props.families
          .filter((y) => y.id === x)
          .map((z) => z.latitude)}%2C${props.families
          .filter((y) => y.id === x)
          .map((z) => z.longitude)}&navigate=yes&zoom=17`
      ,'_blank').focus()
   
  }
  const handleClick = (x) => {
    const prodIdx = getIndexByName(props.familyEvents, x.id);
    props.updateRowFamilyEvent({
      startDate: props.familyEvents[prodIdx].startDate,
      id: props.familyEvents[prodIdx].id,
      number_id: props.familyEvents[prodIdx].number_id,
      firstName: props.familyEvents[prodIdx].firstName,
      lastName: props.familyEvents[prodIdx].lastName,
      phone: props.familyEvents[prodIdx].phone,
      address: props.familyEvents[prodIdx].address,
      city: props.familyEvents[prodIdx].city,
      remarks: props.familyEvents[prodIdx].remarks,
      numberOfPerson: props.familyEvents[prodIdx].numberOfPerson,
      language: props.familyEvents[prodIdx].language,
      direction: props.familyEvents[prodIdx].direction,
      isDeliverd: true,
      details: props.familyEvents[prodIdx].details,
      basket_type: props.familyEvents[prodIdx].basket_type,
    });
    // Swal.fire({
    //   icon: "success",
    //   text: "עודכן בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
  };

  const getSelectedRemarks = (x) => {
    const prodIdx = getIndexByName(props.familyEvents, x.id);
    Swal.fire({
      title: "נא ציין סיבה לאי מסירה",
      input: "text",
      inputValue: props.familyEvents[prodIdx].remarks,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length < 0) {
          return "חייב להקליד סיבה ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        props.familyEvents[prodIdx].remarks !== result.value
      ) {
        props.updateRowFamilyEvent({
          startDate: props.familyEvents[prodIdx].startDate,
          id: props.familyEvents[prodIdx].id,
          number_id: props.familyEvents[prodIdx].number_id,
          firstName: props.familyEvents[prodIdx].firstName,
          lastName: props.familyEvents[prodIdx].lastName,
          phone: props.familyEvents[prodIdx].phone,
          address: props.familyEvents[prodIdx].address,
          city: props.familyEvents[prodIdx].city,
          remarks: result.value,
          numberOfPerson: props.familyEvents[prodIdx].numberOfPerson,
          language: props.familyEvents[prodIdx].language,
          direction: props.familyEvents[prodIdx].direction,
          isDeliverd: props.familyEvents[prodIdx].isDeliverd,
          details: props.familyEvents[prodIdx].details,
          basket_type: props.familyEvents[prodIdx].basket_type,
        });
      }
    });
  };

  const arrangeAddresses = () => {
    let starting_point = {
      lat: 32.807080,
      long: 34.985580
    }

    let familyEventFiltered = props.familyEvents.filter((x)=>x.startDate===date && x.direction ===direction)
    
    if (familyEventFiltered.length === 0 ) {
      return familyEventFiltered
    }

    let familyEventWithCords = familyEventFiltered.map((t)=>{
      let family_info = props.families.filter((y)=>y.id === t.number_id)
      console.log(family_info)
      return {
        ...t,
        latitude: parseFloat(family_info[0]?.latitude),
        longitude: parseFloat(family_info[0]?.longitude)
      }


    })

    let familySorted = []

    while (familyEventWithCords.length>0) {
      let minimalLength = 9999999999999
      let minimalLengthFamily = {}

      familyEventWithCords.forEach((e) => {
        let len = (starting_point.lat- e.latitude)**2 + (starting_point.long - e.longitude)**2
        if (len<minimalLength) {
          minimalLength = len
          minimalLengthFamily = e
        }
      })

      // configuring the starting point to be the next point in the supply chain- the minimal length family
      starting_point = {
        lat: minimalLengthFamily.latitude,
        long: minimalLengthFamily.longitude
      }

      console.log(starting_point)

      familySorted = [...familySorted, minimalLengthFamily]
      familyEventWithCords = familyEventWithCords.filter((e) => e.number_id!==minimalLengthFamily.number_id)

    }

    console.log(familySorted)

    return familySorted

  }

  const options1 = [
    { value: "מסלול 1", label: "מסלול 1" },
    { value: "מסלול 2", label: "מסלול 2" },
    { value: "מסלול 3", label: "מסלול 3" },
    { value: "מסלול 4", label: "מסלול 4" },
    { value: "מסלול 5", label: "מסלול 5" },
    { value: "מסלול 6", label: "מסלול 6" },
    { value: "מסלול 7", label: "מסלול 7" },
    { value: "מסלול 8", label: "מסלול 8" },
    { value: "מסלול 9", label: "מסלול 9" },
    { value: "מסלול 10", label: "מסלול 10" },
    { value: "מסלול 11", label: "מסלול 11" },
    { value: "מסלול 12", label: "מסלול 12" },
    { value: "מסלול 13", label: "מסלול 13" },
    { value: "מסלול 14", label: "מסלול 14" },
    { value: "מסלול 15", label: "מסלול 15" },
    { value: "מסלול 16", label: "מסלול 16" },
    { value: "מסלול 17", label: "מסלול 17" },
    { value: "מסלול 18", label: "מסלול 18" },
    { value: "מסלול 19", label: "מסלול 19" },
    { value: "מסלול 20", label: "מסלול 20" },
  ];
  const options = props.events
    .filter((x) => x.status === false)
    .map((x) => ({
      value: x.startDate,
      label: new Date(x.startDate).toLocaleDateString("en-GB"),
    }));
  const [direction, setDirection] = useState("");
  const [date, setDate] = useState("");
  const [expanded, setexpanded] = useState("");
  return (
    <div className={classes.body1}>
    <div >
      {/* סוג אירוע:{props.events.filter((x)=>x.startDate === new Date()).map((x)=>x.type)} */}
      <div style={{ maxWidth: "95%" }}>
        <div>בחר תאריך אירוע</div>
        <div className={classes.first}>
          <Select
            className="mt-4 col-md-4 col-offset-4"
            options={options}
            placeholder="בחר תאריך אירוע"
            onChange={(e) => {
              setDate(e.value);
            }}
            value={options.filter((x) => date === x.value)}
            autoFocus={true}
          />
        </div>
        <div>בחר מספר מסלול</div>
        <div className={classes.first}>
          <Select
            className="mt-4 col-md-4 col-offset-4"
            options={options1}
            placeholder="בחר מספר מסלול"
            onChange={(e) => {
              setDirection(e.value);
            }}
            value={options1.filter((x) => direction === x.value)}
            autoFocus={true}
          />
        </div>
        פירוט משפחות
        {arrangeAddresses()
          .filter((y) => y.startDate === date && y.direction === direction)
          .map((x) => (
            <div>
              <button
                className={classes.card}
                onClick={() => {
                  if (expanded === "") {
                    setexpanded(x.id);
                  } else if (expanded === x.id) {
                    setexpanded("");
                  } else {
                    setexpanded(x.id);
                  }
                }}
              >
                {x.firstName + " " + x.lastName}
              </button>
              {x.id === expanded && (
                <div>
                  <div className={classes.name}>
                    <div>
                      {" "}
                      {"     "}
                      כתובת:{" "}
                      {x.address +
                        ", " +
                        x.city +
                        ", " +
                        "כניסה" +
                        " " +
                        props.families
                          .filter((y) => y.id === x.number_id)
                          .map((z) => z.entrance) +
                        ", " +
                        "קומה" +
                        props.families
                          .filter((y) => y.id === x.number_id)
                          .map((z) => z.floor) +
                        ", " +
                        "דירה" +
                        " " +
                        props.families
                          .filter((y) => y.id === x.number_id)
                          .map((z) => z.apartment)}{" "}
                      {"     "}{" "}
                      {/* <button
                        className={classes.image}
                        // onClick={window.open(
                        //   `https://www.waze.com/ul?ll=${props.families
                        //     .filter((y) => y.id === x.number_id)
                        //     .map((z) => z.latitude)}%2C${props.families
                        //     .filter((y) => y.id === x.number_id)
                        //     .map((z) => z.latitude)}&navigate=yes&zoom=17`
                        // ,'_blank').focus()}
                        onClick={() => openNew(x.number_id)}
                      >
                        {" "}
                        waze
                      </button> */}
                    </div>
                    <div>טלפון: {x.phone}</div>
                    <div>סוג: {x.basket_type}</div>
                    <div>
                      <button
                        className={classes.button2}
                        onClick={() => {
                          handleClick(x);
                        }}
                      >
                        נמסר בהצלחה
                      </button>
                    </div>
                    <div>
                      <button
                        className={classes.button3}
                        onClick={() => {
                          getSelectedRemarks(x);
                        }}
                      >
                        {" "}
                        סיבה לאי מסירה
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    familyEvents: state.familyEvents,
    events: state.events,
    families: state.families,
  };
};

export default connect(mapStateToProps, {
  updateRowFamilyEvent,
  getEvents,
  getFamilyEvents,
  getFamily,
})(Direction);
