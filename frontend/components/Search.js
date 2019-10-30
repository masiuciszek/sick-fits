import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

const AutoComplete = () => {
  const [items, setItems] = React.useState([]);
  const [laoding, setLoading] = React.useState(false);

  const onChange = debounce(async (e, client) => {
    console.log('Searching...');

    setLoading(true);

    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });

    setItems(res.data.items);
    setLoading(false);
  }, 350);

  return (
    <SearchStyles>
      <div>
        <ApolloConsumer>
          {client => (
            <input
              type="search"
              onChange={e => {
                e.persist();
                onChange(e, client);
              }}
            />
          )}
        </ApolloConsumer>
        <DropDown>
          {items.map(item => (
            <DropDownItem key={item.id}>
              {' '}
              <img width="50" src={item.image} alt={item.title} />
              {item.title}
            </DropDownItem>
          ))}
        </DropDown>
      </div>
    </SearchStyles>
  );
};

AutoComplete.propTypes = {};

export default AutoComplete;
