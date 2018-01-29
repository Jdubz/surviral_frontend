import {
  React,
  render,
  es6Promise,
} from 'globalImports';
import DevTools from 'mobx-react-devtools';

// components
import Header from 'containers/header/header';
import MyFooter from 'containers/footer/footer';
import Pager from 'containers/pager/pager';

// styles import. It needs to be in the project somewhere once
import styles from 'styles/app.scss';
import config from 'config';

// keep promises working in IE 11
es6Promise.polyfill();

render(
    <div className="app-container">
      <Header />
      <Pager />
      <MyFooter />
      <DevTools />
    </div>
  , document.getElementById('mount')
);
