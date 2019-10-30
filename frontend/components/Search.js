import React from 'react';
import PropTypes from 'prop-types';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Router from 'next/router';
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

const routeToItem = item => {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
};

const AutoComplete = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  resetIdCounter();

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
      <Downshift
        onChange={routeToItem}
        itemToString={item => (item === null ? '' : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <ApolloConsumer>
              {client => (
                <input
                  {...getInputProps({
                    type: 'search',
                    placeholder: 'Search For An Item',
                    id: 'search',
                    className: loading ? 'loading' : '',
                    onChange: e => {
                      e.persist();
                      onChange(e, client);
                    },
                  })}
                />
              )}
            </ApolloConsumer>
            {isOpen && (
              <DropDown>
                {items.map((item, index) => (
                  <DropDownItem
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    {' '}
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </DropDownItem>
                ))}
                {!loading && !items.length && (
                  <DropDownItem>Nothing to show for {inputValue}</DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
};

AutoComplete.propTypes = {};

export default AutoComplete;
