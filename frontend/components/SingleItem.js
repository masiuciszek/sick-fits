import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => {
  const apa = '';
  console.log(id);
  return (
    <>
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <h3>...Loading</h3>;
          return <h1>{id}</h1>;
        }}
      </Query>
    </>
  );
};

SingleItem.propTypes = {
  id: PropTypes.string,
};

export default SingleItem;
