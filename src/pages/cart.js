

import { useState } from 'react';
import Meals from './Meals/Meals';
import CartProvider from '../store/CartProvider';

function Shop() {


  return (
    <CartProvider>
      <main>
        <Meals />
      </main>
     </CartProvider>
  );
}

export default Shop;