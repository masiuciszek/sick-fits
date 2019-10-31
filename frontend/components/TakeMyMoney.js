import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const totalItems = cart =>
  cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

const TakeMyMoney = props => {
  const handleToken = res => {
    console.log('handleToken called!!!');
    console.log(res);
  };
  return (
    <User>
      {({ data: { me } }) => (
        <StripeCheckout
          amount={calcTotalPrice(me.cart)}
          name="Sick Fits"
          description={`Order of ${totalItems(me.cart)}`}
          image={me.cart[0].item && me.cart[0].item.image}
          stripeKey="pk_test_hmXEquiVd2akJo2SU4ENOfTC00tYthNSYG"
          currency="GBP"
          email={me.email}
          token={res => handleToken(res)}
        >
          {props.children}
        </StripeCheckout>
      )}
    </User>
  );
};

TakeMyMoney.propTypes = {};

export default TakeMyMoney;
