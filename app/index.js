import {
  React,
  render,
  es6Promise,
} from 'globalImports';
import DevTools from 'mobx-react-devtools';

// components
import Header from 'containers/header/header';
import MyFooter from 'containers/footer/footer';
import HomePage from 'containers/homepage/homepage';

// styles import. It needs to be in the project somewhere once
import styles from 'styles/app.scss';
import config from 'config';

// keep promises working in IE 11
es6Promise.polyfill();

render(
    <div className="app-container">
      <Header />
      <HomePage />
      <MyFooter />
      {(() => {
        if (config.appEnv === 'dev') {
          return <DevTools />;
        }
        return null;
      })()}
    </div>
  , document.getElementById('mount')
);
