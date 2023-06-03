import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import ContactAccess from './contactsAccess/contactAccess.js';
import ContactParameterParser from './contactParameterParser';
import Header from './headerAndFooter/header';
import Footer from './headerAndFooter/footer';
//import './index.css';
//import './App.css';



function App() {

      return (
          <BrowserRouter id='contactAccess'>
              <div id='contactAccess'>
                  <Header/>
                    <Routes id='contactAccess'>
                      <Route path='/' element={<ContactAccess id='ContactAccess'/>} />
                      <Route path='/:contactDetail' element={<ContactParameterParser id='ContactAccess'/>} />
                    </Routes>
                  <Footer/>
              </div>
          </BrowserRouter>
      )
  }
export default App;


/*
import React from 'react'
import AppNavigator from './srcapp/AppNavigator'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// import RecycleTestComponent from './srcapp/screens/RecycleTestComponent'
// import RecycleTest from './srcapp/screens/RecycleTest'

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
        // <NavigationContainer>
        //   <Stack.Navigator initialRouteName="DefineDefaultRecord">
        //     <Stack.Screen name="Define" component={DefineDefaultRecord}/>
        //     <Stack.Screen name="Second" component={SecondScreen}/>
        //   </Stack.Navigator>
        // </NavigationContainer>
          <AppNavigator/>
        //<RecycleTestComponent />
        //<RecycleTest/>
      )

}
*/
