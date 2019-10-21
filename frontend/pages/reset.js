import PropTypes from 'prop-types';
import Requestreset from '../components/Requestreset';
import Reset from '../components/Reset';

const resetPage = ({ query }) => (
  <div>
    <p>Reset Your Password {query.resetToken}</p>

    <Reset resetToken={query.resetToken} />
  </div>
);

resetPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default resetPage;
