import { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  });
  const { title, description, image, largeImage, price } = formData;


  const handleChange = e => {
    const { name, type, value } = e.target;

    const val = type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <>
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={formData}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createItem();
              console.log(res);
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={title}
                onChange={handleChange}
              />
              <label htmlFor="title">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                required
                value={price}
                onChange={handleChange}
              />
              <label htmlFor="title">Description</label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                required
                value={description}
                onChange={handleChange}
              />
            </fieldset>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Mutation>
    </>
  );
};

CreateItem.propTypes = {};

export default CreateItem;
export { CREATE_ITEM_MUTATION };