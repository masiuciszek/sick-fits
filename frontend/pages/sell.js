import PropTypes from 'prop-types';
import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/PleaseSignin';

const Sell = () => {
  let a;
  return (
    <div>
      <PleaseSignin>
        <CreateItem />
      </PleaseSignin>
    </div>
  );
};

Sell.propTypes = {};

export default Sell;
