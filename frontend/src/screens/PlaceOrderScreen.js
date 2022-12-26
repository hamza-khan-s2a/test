import { createOrder } from "../api"
import CheckoutSteps from "../component/CheckoutSteps"
import { clearCart, getCartItems, getPayment, getShipping } from "../localStroage"
import { showLoading, hideLoading, showMessage, currencyType } from '../utils'

const convertCartToOrder = () => {
  const orderItems = getCartItems()
  if (orderItems.length === 0) {
    document.location.hash = '/cart'
  }
  const shipping = getShipping()
  if (!shipping.address) {
    document.location.hash = '/shipping'
  }
  const payment = getPayment()
  if (!payment.paymentMethod) {
    document.location.hash = '/payment'
  }

  const itemPrice = orderItems.reduce((accum, curr) => accum + curr.price * curr.qty, 0)
  const shippingPrice = itemPrice > 1000 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemPrice * 100) / 100;
  const totalPrice = itemPrice + shippingPrice + taxPrice

  return {
    orderItems,
    shipping,
    payment,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }

}


const PlaceOrderScreen = {
  after_render: async () => {
    document.querySelector('#placeorder-button')
      .addEventListener('click', async () => {
        const order = convertCartToOrder()
        showLoading()
        const data = await createOrder(order)
        hideLoading()
        if (data.error) {
          showMessage(data.error)
        } else {
          showMessage(data.message)
          clearCart()
          document.location.hash = `/order/${data.order._id}`
        }
      })
  },
  render: () => {

    const { orderItems, shipping, payment, itemPrice, shippingPrice, taxPrice, totalPrice, } = convertCartToOrder()
    return (`
      <div>
      ${CheckoutSteps.render({ step1: true, step2: true, step3: true, step4: true })} 
      <div class = 'order'>
        <div class = 'order-info'>
          <div>
            <h2>Shipping</h2>
              <div>${shipping.address} , ${shipping.city} , ${shipping.postalCode} , ${shipping.country}</div>
          </div>
          <div>
            <h2>Payment</h2>
            <div>Payment Method : ${payment.paymentMethod}</div>
          </div>
          <div>
            <ul class = 'cart-list-container'>
              <li>
                <h2>Shopping Cart</h2>
                <div>Price</div>
              <li>
              ${orderItems.map((item) => `
                <li>
                  <div class = 'cart-image'>
                    <img src = './images/${item.image}' alt = '${item.name}' />
                  </div>
                  <div class = 'cart-name'>
                    <a href = '/#/product/${item.product}'>${item.name}</a>
                    <div class = 'cart-qty'>
                      Qty : ${item.qty}
                    </div>
                  </div>
                  <div class = 'cart-price'>${item.price} ${currencyType()}</div>
                </li>
              `)}
            </ul>
          </div>
        </div>  
          <div class = 'order-action'>
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li><div>Items</div><div>${itemPrice} ${currencyType()}</div></li>
              <li><div>shipping</div><div>${shippingPrice} ${currencyType()}</div></li>
              <li><div>Tax</div><div>${taxPrice} ${currencyType()}</div></li>
              <li class='total'><div>Order Total</div><div>${totalPrice} ${currencyType()}</div></li>
              <li><button id='placeorder-button' class='primary fw'>Place Order</button ></li>
              
            </ul>
          </div>    
      </div>
    </div >

  `
    )
  }


}

export default PlaceOrderScreen