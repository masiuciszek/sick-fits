import React from 'react';
import PropTypes from 'prop-types';
import PleaseSignin from '../components/PleaseSignin';
import Permissions from '../components/Permissions';

const permissionPage = () => (
  <div>
    <PleaseSignin>
      <h1>Permissons</h1>
      <Permissions />
    </PleaseSignin>
  </div>
);

permissionPage.propTypes = {};

export default permissionPage;
