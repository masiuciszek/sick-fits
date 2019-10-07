import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Header = () => (
  <div>
    <div className="bar">
      <a href="#">Sick fits</a>
      <Navbar />
    </div>
    <div className="sub-bar">
      <p>search</p>
    </div>
    <div>cart</div>
  </div>
);

Header.propTypes = {};

export default Header;
