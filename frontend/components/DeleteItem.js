// @ts-nocheck
/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

/**
 *
 * @type {string} text
 */
const DeleteItem = ({ text, icon, id }) => {
  const update = (cache, payload) => {
    // update's client so it matches with the server

    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  return (
    <>
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={update}
      >
        {(deleteItem, { error }) => (
          <DeleteBtn
            onClick={() => {
              if (confirm('Are you sure you want to Delete?')) {
                deleteItem();
              }
            }}
          >
            {text} <span>{icon}</span>
          </DeleteBtn>
        )}
      </Mutation>
    </>
  );
};

DeleteItem.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string.isRequired,
};
const DeleteBtn = styled.button`
  background: #ed3233;
`;
export default DeleteItem;
