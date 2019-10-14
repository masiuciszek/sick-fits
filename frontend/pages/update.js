// @ts-nocheck
import PropTypes from 'prop-types';
import UpdateItem from '../components/UpdateItem';

const Update = ({ query }) => {
  let a;
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
};

Update.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Update;
