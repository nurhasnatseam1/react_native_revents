import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

 
//screeens
//events
 import EventDetailedPage from '../screens/events/eventDetailedPage';

import EventFormPage from '../screens/events/eventForm';

import EventListPage from '../screens/events/eventsListPage';
import EventDashboard from '../screens/events/eventDashboard';

//user
import UserDetailedPage from '../screens/user/userDetailedPage';
import AboutPage from '../screens/user/aboutPage';
import AccountPage from '../screens/user/accountPage';
import BasicPage from '../screens/user/basicPage';
import PhotosPage from '../screens/user/photosPage';
//login
import LoginPage from '../screens/auth/login' 
import { createSwitchNavigator, createAppContainer } from 'react-navigation'; 



//eventsBottomTabNavigator




 const eventBottomTabNavigator=createBottomTabNavigator({
      EventListPage:EventListPage,
      EventFormPage:EventFormPage,
      EventDetailedPage:EventDetailedPage,
      eventDashboard:EventDashboard, 
})
 

//userBottomTabNavigator
const userBottomTabNavigator=createBottomTabNavigator({
      AboutPage:AboutPage,
      AccountPage:AccountPage,
      BasicPage:BasicPage,
      PhotosPage:PhotosPage,
      UserDetailedPage:UserDetailedPage,
})


//


const mainContentNavigator=createStackNavigator({
      event:eventBottomTabNavigator,
      user:userBottomTabNavigator
      
})


const rootNavigator=createSwitchNavigator({
      login:LoginPage,
      main:mainContentNavigator
})



export default createAppContainer(rootNavigator)
