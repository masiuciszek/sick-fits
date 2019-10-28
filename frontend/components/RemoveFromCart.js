import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const BigBtn = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  transition: 300ms ease-in-out;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  // get's called as we get a response back from the server
  const handleUpdate = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });

    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  return (
    <>
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        update={handleUpdate}
        optimisticResponse={{
          __typename: 'mutation',

          removeFromCart: {
            __typename: 'CartItem',
            id,
          },
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <BigBtn
            onClick={() => removeFromCart().catch(err => alert(err.message))}
            title="delete item"
          >
            &times;
          </BigBtn>
        )}
      </Mutation>
    </>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
