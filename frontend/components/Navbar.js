import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';
import { TOGGLE_CART_MUTATION } from './Cart';

const Nav = () => (
  <>
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <p>{me && me.name}</p>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <SignOut />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                  <button type="button" onClick={toggleCart}>
                    my cart
                  </button>
                )}
              </Mutation>
            </>
          )}
          {!me && (
            <Link href="/signup">
              <a>sign in</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  </>
);

export default Nav;
