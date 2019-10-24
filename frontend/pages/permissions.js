import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import Permissions from '../components/Permissions';

const PermissionPage = () => (
  <div>
    <PleaseSignin>
      <h1>Permissons</h1>
      <Permissions />
    </PleaseSignin>
  </div>
);

export default PermissionPage;
