// @ts-nocheck
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;
const Signin = () => {
  const [data, setData] = useState({
    email: '',
  });

  const saveToState = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Mutation mutation={REQUEST_RESET_MUTATION} variables={data}>
      {(reset, { error, loading, called }) => (
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            await reset();
            setData({ email: '' });
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Request a password reset</h2>
            <Error error={error} />
            {!error && !loading && called && (
              <p>Success! Check your email for a reset link!</p>
            )}
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                value={data.email}
                onChange={saveToState}
              />
            </label>

            <button type="submit">Request Reset!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signin;
