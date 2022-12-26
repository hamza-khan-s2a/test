import Header from './component/Header';
import CartScreen from './screens/CartScreen';
import DashboardScreen from './screens/DashboardScreen';
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import SigninScreen from './screens/SigninScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/inventory': InventoryScreen

};
const router = async () => {
  showLoading()
  const request = parseRequestUrl();
  const parseUrl = (request.resourse ? `/${request.resourse}` : '/')
    + (request.id ? '/:id' : '')
    + (request.action ? `/${request.action}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.querySelector('#header-container')
  header.innerHTML = await Header.render()
  await Header.after_render()
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading()
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router, false);
