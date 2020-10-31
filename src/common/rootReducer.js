import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import history from './history';
import homeReducer from '../features/home/redux/reducer';
import aboutReducer from '../features/about/redux/reducer';
import authReducer from '../features/auth/redux/reducer';
import causeReducer from '../features/cause/redux/reducer';
import causeMainTypeReducer from '../features/cause-main-type/redux/reducer';
import causeTypeReducer from '../features/cause-type/redux/reducer';
import certificateReducer from '../features/certificate/redux/reducer';
import clientReducer from '../features/client/redux/reducer';
import clientCategoryReducer from '../features/client-category/redux/reducer';
import clientTypeReducer from '../features/client-type/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import configReducer from '../features/config/redux/reducer';
import countryReducer from '../features/country/redux/reducer';
import dashboardReducer from '../features/dashboard/redux/reducer';
import dataReducer from '../features/data/redux/reducer';
import donationReducer from '../features/donation/redux/reducer';
import donationOriginReducer from '../features/donation-origin/redux/reducer';
import emailReducer from '../features/email/redux/reducer';
import iconsReducer from '../features/icons/redux/reducer';
import jobqueueReducer from '../features/jobqueue/redux/reducer';
import langReducer from '../features/lang/redux/reducer';
import moneyReducer from '../features/money/redux/reducer';
import notificationReducer from '../features/notification/redux/reducer';
import paymentTypeReducer from '../features/payment-type/redux/reducer';
import rateReducer from '../features/rate/redux/reducer';
import receiptReducer from '../features/receipt/redux/reducer';
import sessionReducer from '../features/session/redux/reducer';
import siteReducer from '../features/site/redux/reducer';
import siteTypeReducer from '../features/site-type/redux/reducer';
import speciesReducer from '../features/species/redux/reducer';
import sponsorshipReducer from '../features/sponsorship/redux/reducer';
import subspeciesReducer from '../features/subspecies/redux/reducer';
import uiReducer from '../features/ui/redux/reducer';
import userReducer from '../features/user/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  home: homeReducer,
  about: aboutReducer,
  auth: authReducer,
  cause: causeReducer,
  causeMainType: causeMainTypeReducer,
  causeType: causeTypeReducer,
  certificate: certificateReducer,
  client: clientReducer,
  clientCategory: clientCategoryReducer,
  clientType: clientTypeReducer,
  common: commonReducer,
  config: configReducer,
  country: countryReducer,
  dashboard: dashboardReducer,
  data: dataReducer,
  donation: donationReducer,
  donationOrigin: donationOriginReducer,
  email: emailReducer,
  icons: iconsReducer,
  jobqueue: jobqueueReducer,
  lang: langReducer,
  money: moneyReducer,
  notification: notificationReducer,
  paymentType: paymentTypeReducer,
  rate: rateReducer,
  receipt: receiptReducer,
  session: sessionReducer,
  site: siteReducer,
  siteType: siteTypeReducer,
  species: speciesReducer,
  sponsorship: sponsorshipReducer,
  subspecies: subspeciesReducer,
  ui: uiReducer,
  user: userReducer,
};

export default combineReducers(reducerMap);
