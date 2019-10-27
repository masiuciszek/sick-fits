import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  let a;
  return (
    <div>
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
        {addToCart => (
          <button type="button" onClick={addToCart}>
            Add to cart 🛒
          </button>
        )}
      </Mutation>
    </div>
  );
};

AddToCart.propTypes = {
  id: PropTypes.string,
};

export default AddToCart;
