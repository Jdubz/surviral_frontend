import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  Redirect
} from 'react-router';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import ReactGA from 'react-ga';
import FontFaceObserver from 'fontfaceobserver';
import es6Promise from 'es6-promise';
import 'whatwg-fetch';
import { observer } from 'mobx-react';
import mobx, { observable, action, computed, toJS } from 'mobx';
import $ from 'jquery';

module.exports = {
  React,
  Router,
  Route,
  browserHistory,
  Redirect,
  render,
  ReactGA,
  FontFaceObserver,
  es6Promise,
  observer,
  mobx,
  observable,
  action,
  computed,
  toJS,
  $,
  Link
};
