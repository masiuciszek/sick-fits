import React from 'react';
import PropTypes from 'prop-types';
import OrderList from '../components/OrderList';
import PleaseSignIn from '../components/PleaseSignin';

const OrdersPages = () => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

OrdersPages.propTypes = {};

export default OrdersPages;
