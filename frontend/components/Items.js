// @ts-nocheck
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Item from './Item';

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
    <Center>
      <h1>Items</h1>
      <Query query={ALL_ITEMS_QUERY}>
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
    </Center>
  );
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
