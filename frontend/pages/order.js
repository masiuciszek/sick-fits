import React from 'react';
import PropTypes from 'prop-types';
import PleaseSingnIn from '../components/PleaseSignin';
import Order from '../components/Order';
import OrderList from '../components/OrderList';

const OrderPage = props => (
  <>
    <PleaseSingnIn>
      <h1>OrderPage</h1>
      <Order id={props.query.id} />
    </PleaseSingnIn>
  </>
);

OrderPage.propTypes = {};

export default OrderPage;
