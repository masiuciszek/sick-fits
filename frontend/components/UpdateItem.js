/* eslint-disable no-shadow */
// @ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [formData, setFormData] = useState({});

  const handleChange = e => {
    const { name, type, value } = e.target;

    const val = type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const updateNewItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('Updating Item!!');
    console.log(formData);
    const res = await updateItemMutation({
      variables: {
        id,
        ...formData,
      },
    });
    console.log('Updated!!');
  };

  return (
    <>
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {/** @type {object}data */}
        {/** @type {object}loading */}
        {({ data, loading }) => {
          if (loading) return <p>loading...</p>;
          if (!data.item) return <h3>ahaha!!! No item Found for id {id}! </h3>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={formData}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => updateNewItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.item.price}
                        onChange={handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        defaultValue={data.item.description}
                        onChange={handleChange}
                      />
                    </label>
                    <button type="submit">Submit</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    </>
  );
};

UpdateItem.propTypes = {
  id: PropTypes.string,
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
