// @ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import Form from './styles/Form';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      password
      name
    }
  }
`;

const Signup = () => {
  /**
   * @type {name} String
   * @type {email} String
   * @type {password} String
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Mutation mutation={SIGNUP_MUTATION} variables={formData}>
        {(signup, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              /**
               * @type {signup} function
               * @param {mutation} graphql-server
               */
              await signup();
              setFormData({
                name: '',
                email: '',
                password: '',
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Sign up</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    </>
  );
};

Signup.propTypes = {};
export default Signup;
