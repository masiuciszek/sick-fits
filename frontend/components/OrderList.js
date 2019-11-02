import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

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
const StyledOrderList = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;
const OrderList = () => {
  let a;
  return (
    <Query query={USER_ORDERS_QUERY}>
      {({ data: { orders }, loading, error }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <Error error={error} />;
        console.log(orders);
        return (
          <>
            <h2>You have {orders.length} orders</h2>
            <StyledOrderList>
              {orders.map(order => (
                <OrderItemStyles key={order.id}>
                  <Link href={{ pathname: '/order', query: { id: order.id } }}>
                    <a>
                      <div className="order-meta">
                        <p>
                          {order.items.reduce((a, b) => a + b.quantity, 0)}{' '}
                          Items
                        </p>
                        <p>{order.items.length} Products</p>
                        <p>{order.createdAt.split('').slice(0, 6)}</p>
                        <p>{formatMoney(order.total)}</p>
                      </div>

                      <div className="images">
                        {order.items.map(item => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.title}
                          />
                        ))}
                      </div>
                    </a>
                  </Link>
                </OrderItemStyles>
              ))}
            </StyledOrderList>
          </>
        );
      }}
    </Query>
  );
};

OrderList.propTypes = {};

export default OrderList;
