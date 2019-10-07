import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';

const Page = props => {
  let a;
  return (
    <div>
      <Meta />
      <Header />
      <h1>Page component</h1>
      {props.children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Page;
