import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const Reset = props => {
  const [resetData, setResetdata] = useState({
    password: '',
    confirmPassword: '',
  });

  const handlechange = e => {
    setResetdata({ ...resetData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: props.resetToken,
          password: resetData.password,
          confirmPassword: resetData.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(
          reset,
          {
            error,
            loading,
            // @ts-ignore
            called,
          }
        ) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              setResetdata({ password: '', confirmPassword: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password Reset</h2>
              <Error error={error} />

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={resetData.password}
                  onChange={handlechange}
                />
              </label>

              <label htmlFor="confirmPassword">
                Confirm Your Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={resetData.confirmPassword}
                  onChange={handlechange}
                />
              </label>
              <button type="submit">Reset Your Password!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    </>
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
