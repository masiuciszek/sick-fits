import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  // eslint-disable-next-line react/display-name
  user: ({ render }) => <User>{render}</User>,
  // eslint-disable-next-line react/display-name
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  // eslint-disable-next-line react/display-name
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { me } = user.data;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="Close">
              &times;
            </CloseButton>
            <Supreme>{me.name}'s Cart</Supreme>
            <p>
              You have {me.cart.length} item
              {me.cart.length > 1 ? 's' : ''} in your cart.
            </p>
          </header>
          <ul>
            {me.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <footer>
            <p> {formatMoney(calcTotalPrice(me.cart))} </p>
            <SickButton>Check out </SickButton>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

Cart.propTypes = {};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };