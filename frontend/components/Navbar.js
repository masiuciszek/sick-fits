import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Navbar = () => (
  <div>
    <h1>Navbar</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
  </div>
);

Navbar.propTypes = {};

export default Navbar;
