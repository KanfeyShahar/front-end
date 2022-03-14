import React from 'react';
import { connect } from 'react-redux';
import { saveFamilyToLocal } from '../helper-functions';
import { notAvailiablePerson } from '../actions'; // לעשות פעולה שמעבירה למשפחות לא פעילות


const NotAvailiableProductButton = ({PhonePerson,familiy,notAvailiablePerson })=>{
    return (
           <button 
            data-phone-number={PhonePerson}
            id={PhonePerson}
            className="btn btn-danger"
            onClick={() => notAvailiablePerson(PhonePerson)}
            >לא פעיל</button>


    );
};
const mapStateToProps = state => {
    saveFamilyToLocal(state.families);
    return {familiy: state.families};
};



export default connect(mapStateToProps, {notAvailiablePerson})(NotAvailiableProductButton);

