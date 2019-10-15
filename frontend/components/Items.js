// @ts-nocheck
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      price
      title
      description
      image
      largeImage
    }
  }
`;

const Items = ({ page }) => {
  let a;
  return (
    <Center>
      <Pagination page={page} />
      <h1>Items</h1>
      <Query
        query={ALL_ITEMS_QUERY}
        variables={{ skip: page * perPage - perPage, first: perPage }}
      >
        {({ data, error, loading }) => {
          console.log(data);
          if (loading) return <h3>...Loading</h3>;
          if (error) return <h3>{error.message}</h3>;
          return (
            <ItemList>
              {' '}
              {data.items.map(item => (
                /**
                 * @type {object} item
                 */
                <Item key={item.id} item={item} />
              ))}{' '}
            </ItemList>
          );
        }}
      </Query>
      <Pagination page={page} />
    </Center>
  );
};

Items.propTypes = {
  page: PropTypes.string,
};

const Center = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default Items;
export { ALL_ITEMS_QUERY };
