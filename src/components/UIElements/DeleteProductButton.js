import React from 'react';
import { connect } from 'react-redux';
import { saveProductInventoryToLocal } from "../../helper-functions/index"
import { deleteProduct } from '../../actions/index'
import Swal from "sweetalert2";

const DeleteProductButton = ({ productName,productsInventory, deleteProduct }) => {
  let arrayCOPY=productsInventory.filter((x) => x.id !==productName.id || x.endDate !== productName.endDate)
  const removeProduct = (productName) => {
    Swal.fire({
      title: '?האם ברצונך למחוק מוצר זה',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'כן',
      denyButtonText: `לא`,
    }).then((result) => {
      if (result.isConfirmed) {
        productsInventory.filter((x) => x.id !==productName.id || x.endDate !== productName.endDate)
        console.log(productsInventory)
        Swal.fire('!נמחק בהצלחה', '', 'success')
        
      } else if (result.isDenied) {
        Swal.fire('לא נמחק', '', 'info')
      }
    })
      
  };
 
    return (
      
      <button
        data-product-name={productName}
        id={productName.id, productName.endDate}
        className="btn btn-danger"
        onClick={removeProduct}
      >
        מחיקה
      </button>
    );
  };
  
  const mapStateToProps = state => {
    saveProductInventoryToLocal(state.productsInventory);
    return { productsInventory:state.productsInventory };
  };
  
  export default connect(mapStateToProps, { deleteProduct })(DeleteProductButton);