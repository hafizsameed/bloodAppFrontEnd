import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Routes from '../screens/index'
import { createDrawerNavigator } from 'react-navigation-drawer';



const AuthNavigator = createStackNavigator({
    
    login: {
        screen: Routes.Login,
      },
      signup:{
        screen:Routes.Signup
    },
    
 
 

});

const drawer = createDrawerNavigator({
    Home:Routes.Home,
    "Add Post":Routes.PostReq,
    DetailedScreen:Routes.DetailedScreen
  },
  {
    contentComponent:Routes.DrawerComponent,
     drawerBackgroundColor:'#FF3333',drawerType:'slide', overlayColor :'white',
    contentOptions:{
    
      activeTintColor:'white',
      activeBackgroundColor:'#FF3333',
      activeTintbackgroundColor:'white',
      itemsContainerStyle: {
        marginVertical: 10,
      },
      iconContainerStyle: {
        opacity: 0.5,
      }
    }
  }
  )
  AppNavigator=createSwitchNavigator({
      Auth:AuthNavigator,
      drawer:drawer,
  })


export default createAppContainer(AppNavigator);