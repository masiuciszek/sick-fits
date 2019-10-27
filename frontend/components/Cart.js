import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
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

const Cart = () => (
  <User>
    {({ data: { me } }) => {
      if (!me) return null;
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
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
              )}
            </Query>
          )}
        </Mutation>
      );
    }}
  </User>
);

Cart.propTypes = {};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
