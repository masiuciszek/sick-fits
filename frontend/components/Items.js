import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      price
      title
      description
      image
      largeImage
    }
  }
`;

const Items = () => {
  let a;
  return (
    <div>
      <h1>Items</h1>
      <Query query={ALL_ITEMS_QUERY}>
        {payload => {
          console.log(payload);
          return <p>Heyyy</p>;
        }}
      </Query>
    </div>
  );
};

Items.propTypes = {};

export default Items;
