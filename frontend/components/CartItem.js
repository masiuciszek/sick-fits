import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
`;
const CartItem = ({ item }) => {
  const { image, title, price, quantity } = item.item;

  return (
    <CartItemStyles>
      <img width="100" src={image} alt={title} />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>{formatMoney(price * item.quantity)}</p>-
        <em>
          {quantity} &times; {formatMoney(price)} each
        </em>
      </div>
      <RemoveFromCart id={item.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
