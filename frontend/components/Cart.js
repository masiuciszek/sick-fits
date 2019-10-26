import React from 'react';
import PropTypes from 'prop-types';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Cart = () => {
  let a;
  return (
    <CartStyles>
      <header>
        <CloseButton title="Close">&times;</CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ items in your cart.</p>
      </header>

      <footer>
        <p>$10.10</p>
        <SickButton>Check out </SickButton>
      </footer>
    </CartStyles>
  );
};

Cart.propTypes = {};

export default Cart;
