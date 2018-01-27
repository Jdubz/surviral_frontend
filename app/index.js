import {
  React,
  render,
  es6Promise,
} from 'globalImports';

// components
import Header from 'containers/header/header';
import MyFooter from 'containers/footer/footer';
import HomePage from 'containers/homepage/homepage';

// styles import. It needs to be in the project somewhere once
import styles from 'styles/app.scss';

// keep promises working in IE 11
es6Promise.polyfill();

render(
    <div>
      <Header />
      <HomePage />
      <MyFooter />
    </div>
  , document.getElementById('mount')
);
