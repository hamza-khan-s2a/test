export const getCartItems = () => {
  const cartItem = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItem;
};

export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
};

export const setUserInfo = ({
  id = '',
  name = '',
  email = '',
  password = '',
  token = '',
  isAdmin = false
}) => {

  localStorage.setItem('userInfo', JSON.stringify({
    id, name, email, password, token, isAdmin
  }))
}

export const clearUser = () => {
  localStorage.removeItem('userInfo')
}

export const getUserInfo = () => {

  const dara = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : { name: '', email: '', password: '' }
  return dara
}

export const getShipping = () => {
  const shipping = localStorage.getItem('shipping') ?
    JSON.parse(localStorage.getItem('shipping')) :
    {
      address: "",
      city: "",
      postalCode: "",
      country: ""
    }
  return shipping
}

export const setShipping = ({
  address = '',
  city = '',
  postalCode = '',
  country = ''
}) => {
  localStorage.setItem('shipping', JSON.stringify({ address, city, postalCode, country }))
}

export const getPayment = () => {
  const payment = localStorage.getItem('payment') ?
    JSON.parse(localStorage.getItem('payment')) :
    {
      paymentMethod: 'Cash on Delivery',
    }
  return payment
}

export const setPayment = ({
  paymentMethod = 'Cash on Delivery'
}) => {
  localStorage.setItem('payment', JSON.stringify({ paymentMethod }))
}

export const clearCart = () => {
  localStorage.removeItem('cartItems')
}