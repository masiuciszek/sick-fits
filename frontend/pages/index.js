import Items from '../components/Items';

const Home = props => {
  const { query } = props;

  return (
    <div>
      <h1>Home</h1>
      <Items page={parseFloat(query.page) || 1} />
    </div>
  );
};

export default Home;
