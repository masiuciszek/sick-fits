import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <>
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        console.log(data);
        return (
          <div>
            <Error error={error} />
            <div>
              <h2>Manage Permissions</h2>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    {possiblePermissions.map(permission => (
                      <th>{permission}</th>
                    ))}
                    <th>👇🏻</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(user => (
                    <User key={user.id} user={user} />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );
      }}
    </Query>
  </>
);

const User = ({ user }) => {
  const { name, email, id } = user;
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

Permissions.propTypes = {};

export default Permissions;
