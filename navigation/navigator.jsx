import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';




//screeens
//events
import EventDetailedPage from '../screens/events/eventDetailedPage';
import EventFormPage from '../screens/events/eventForm';
import EventListPage from '../screens/events/eventsListPage';


//user
import UserDetailedPage from '../screens/user/userDetailedPage';
import AboutPage from '../screens/user/aboutPage';
import AccoutPage from '../screens/user/accountPage';
import basicPage from '../screens/user/basicPage';
import PhotosPage from '../screens/user/photosPage';
//login
import LoginPage from '../screens/auth/login'



//eventsBottomTabNavigator


const eventBottomTabNavigator=createBottomTabNavigator({
      EventListPage:EventListPage,
      EventFormPage:EventFormPage,
      EventFormPage:EventFormPage,
})



//