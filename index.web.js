import {AppRegistry} from 'react-native';
import reportWebVitals from './src/reportWebVitals';

import App from './src/App';
//import {name as appName} from './app.json';


AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {rootTag: document.getElementById('root')});


/*
//import {BrowserRouter} from "react-router-dom";
//import Header from './headerAndFooter/header';
//import Footer from './headerAndFooter/footer';
//import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// require('dotenv').config()
console.log(window.innerHeight)
root.render(
    <BrowserRouter id="contactAccess">
        <div id="contactAccess">
            <Header/>
            <App style={{marginBottom:'10%'}}/>
            <Footer/>
        </div>
    </BrowserRouter>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
