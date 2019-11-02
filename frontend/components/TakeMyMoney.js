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

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

const totalItems = cart =>
  cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

const TakeMyMoney = props => {
  //
  const handleToken = async (res, createOrder) => {
    NProgress.start();
    console.log(res);
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    console.log(order);
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };
  return (
    <User>
      {({ data: { me } }) => (
        <Mutation
          mutation={CREATE_ORDER_MUTATION}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {createOrder => (
            <StripeCheckout
              amount={calcTotalPrice(me.cart)}
              name="Sick Fits"
              description={`Order of ${totalItems(me.cart)}`}
              image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
              stripeKey="pk_test_hmXEquiVd2akJo2SU4ENOfTC00tYthNSYG"
              currency="GBP"
              email={me.email}
              token={res => handleToken(res, createOrder)}
            >
              {props.children}
            </StripeCheckout>
          )}
        </Mutation>
      )}
    </User>
  );
};

TakeMyMoney.propTypes = {};

export default TakeMyMoney;
