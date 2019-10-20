import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

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
            </>
          )}
          <Link href={me ? '/signin' : '/signup'}>
            <a>{me ? 'signout' : 'signin'}</a>
          </Link>
        </NavStyles>
      )}
    </User>
  </>
);

export default Nav;
