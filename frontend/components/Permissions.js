// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

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
      {({ data, loading, error }) => (
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
                    <th key={permission}>{permission}</th>
                  ))}
                  <th>👇🏻</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <UserPermissions key={user.id} user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Query>
  </>
);

const UserPermissions = ({ user }) => {
  const [permissions, setPermission] = React.useState(user.permissions);
  const handleChange = e => {
    const checkBox = e.target;

    let updatedPermissions = [...permissions];
    if (checkBox.checked) {
      updatedPermissions.push(checkBox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkBox.value
      );
    }
    setPermission(updatedPermissions);
  };
  return (
    <>
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                {' '}
                <td colSpan="8">
                  <Error error={error} />{' '}
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      name={permission}
                      value={permission}
                      checked={permissions.includes(permission)}
                      onChange={handleChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  onClick={updatePermissions}
                  disabled={loading}
                  type="button"
                >
                  Updat{loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    </>
  );
};

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired,
};

Permissions.propTypes = {};

export default Permissions;
