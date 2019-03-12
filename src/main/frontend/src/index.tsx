import 'file-loader?name=./index.html!./index.html';
import './index.css';
import React from 'react';
import {render} from 'react-dom';
import App from './App';


render(
  <App/>,
  document.getElementById('graphiql')
);
