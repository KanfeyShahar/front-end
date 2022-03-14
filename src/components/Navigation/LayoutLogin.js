import { Fragment } from 'react';
import MainNavigationLogin from './MainNavigationLogin';

const LayoutLogin = (props) => {
  return (
    <Fragment>
      <MainNavigationLogin />
      <main >{props.children}</main>
    </Fragment>
  );
};

export default LayoutLogin;