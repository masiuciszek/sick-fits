import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Signin from './Signin';
import { CURRENT_USER_QUERY } from './User';

const PleaseSignin = props => (
  <>
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.me) {
          return (
            <div>
              <p>Please sign in before Continue</p>
              <Signin />
            </div>
          );
        }
        return props.children;
      }}
    </Query>
  </>
);

PleaseSignin.propTypes = {};

export default PleaseSignin;
