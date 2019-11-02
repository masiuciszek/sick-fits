import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from './ErrorMessage';
// orders
const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;
const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;
const OrderList = () => {
  let a;
  return (
    <Query query={USER_ORDERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <Error error={error} />;
        return (
          <>
            <h2>You have {data.orders.length} orders</h2>
          </>
        );
      }}
    </Query>
  );
};

OrderList.propTypes = {};

export default OrderList;
