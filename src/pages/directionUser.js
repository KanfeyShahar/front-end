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
    //   text: "?????????? ????????????",
    //   confirmButtonText: "??????????",
    //   confirmButtonColor: "green",
    // });
  };

  const getSelectedRemarks = (x) => {
    const prodIdx = getIndexByName(props.familyEvents, x.id);
    Swal.fire({
      title: "???? ???????? ???????? ?????? ??????????",
      input: "text",
      inputValue: props.familyEvents[prodIdx].remarks,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length < 0) {
          return "???????? ???????????? ???????? ";
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
    { value: "?????????? 1", label: "?????????? 1" },
    { value: "?????????? 2", label: "?????????? 2" },
    { value: "?????????? 3", label: "?????????? 3" },
    { value: "?????????? 4", label: "?????????? 4" },
    { value: "?????????? 5", label: "?????????? 5" },
    { value: "?????????? 6", label: "?????????? 6" },
    { value: "?????????? 7", label: "?????????? 7" },
    { value: "?????????? 8", label: "?????????? 8" },
    { value: "?????????? 9", label: "?????????? 9" },
    { value: "?????????? 10", label: "?????????? 10" },
    { value: "?????????? 11", label: "?????????? 11" },
    { value: "?????????? 12", label: "?????????? 12" },
    { value: "?????????? 13", label: "?????????? 13" },
    { value: "?????????? 14", label: "?????????? 14" },
    { value: "?????????? 15", label: "?????????? 15" },
    { value: "?????????? 16", label: "?????????? 16" },
    { value: "?????????? 17", label: "?????????? 17" },
    { value: "?????????? 18", label: "?????????? 18" },
    { value: "?????????? 19", label: "?????????? 19" },
    { value: "?????????? 20", label: "?????????? 20" },
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
      {/* ?????? ??????????:{props.events.filter((x)=>x.startDate === new Date()).map((x)=>x.type)} */}
      <div style={{ maxWidth: "95%" }}>
        <div>?????? ?????????? ??????????</div>
        <div className={classes.first}>
          <Select
            className="mt-4 col-md-4 col-offset-4"
            options={options}
            placeholder="?????? ?????????? ??????????"
            onChange={(e) => {
              setDate(e.value);
            }}
            value={options.filter((x) => date === x.value)}
            autoFocus={true}
          />
        </div>
        <div>?????? ???????? ??????????</div>
        <div className={classes.first}>
          <Select
            className="mt-4 col-md-4 col-offset-4"
            options={options1}
            placeholder="?????? ???????? ??????????"
            onChange={(e) => {
              setDirection(e.value);
            }}
            value={options1.filter((x) => direction === x.value)}
            autoFocus={true}
          />
        </div>
        ?????????? ????????????
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
                      ??????????:{" "}
                      {x.address +
                        ", " +
                        x.city +
                        ", " +
                        "??????????" +
                        " " +
                        props.families
                          .filter((y) => y.id === x.number_id)
                          .map((z) => z.entrance) +
                        ", " +
                        "????????" +
                        props.families
                          .filter((y) => y.id === x.number_id)
                          .map((z) => z.floor) +
                        ", " +
                        "????????" +
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
                    <div>??????????: {x.phone}</div>
                    <div>??????: {x.basket_type}</div>
                    <div>
                      <button
                        className={classes.button2}
                        onClick={() => {
                          handleClick(x);
                        }}
                      >
                        ???????? ????????????
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
                        ???????? ?????? ??????????
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
