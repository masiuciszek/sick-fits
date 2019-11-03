import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'asdasd212',
  title: 'cool shoes!',
  price: 3323,
  description: 'love this shoes',
  image: 'show.jpg',
  largeImage: 'showxxl.jpg',
};

describe('<Item/>', () => {
  it('renders adn displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    // console.log(wrapper.debug());
    const priceTag = wrapper.find('PriceTag');
    expect(priceTag.children().text()).toBe('£33.23');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');

    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
  });
});
