import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';

const Item = props => (
  <div>
    <SingleItem id={props.query.id} />
  </div>
);

Item.propTypes = {
  query: PropTypes.object.isRequired,
};

export default Item;
