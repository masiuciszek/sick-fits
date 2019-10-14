// @ts-nocheck
import PropTypes from 'prop-types';
import UpdateItem from '../components/UpdateItem';

const Update = ({ query }) => {
  let a;
  console.log(query, ' query');
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
