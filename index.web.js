import {AppRegistry} from 'react-native';
import reportWebVitals from './src/reportWebVitals';

import App from './src/App';
//import {name as appName} from './app.json';




AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {rootTag: document.getElementById('root')});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();