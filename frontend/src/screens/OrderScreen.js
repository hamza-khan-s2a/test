import { getOrder } from "../api"

import { currencyType, parseRequestUrl } from '../utils'



const OrderScreen = {
  after_render: async () => { },
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id)
    console.log(request.id);

    return (`
    <div>
    <h1>Order ${_id}</h1>
    <div class = 'order'>
      <div class = 'order-info'>
      <div>
      <h2>Shipping</h2>
        <div>${shipping.address} , ${shipping.city} , ${shipping.postalCode} , ${shipping.country}</div>
      ${isDelivered
        ? `<div class = "success"> Delivered at ${deliveredAt}</div>`
        : `<div class = "error">Not Delivered </div>`
      }
    </div>
    <div>
      <h2>Payment</h2>
      <div>Payment Method : ${payment.paymentMethod}</div>
      ${isPaid
        ? `<div class = "success"> Delivered at ${paidAt}</div>`
        : `<div class = "error">Not Paid </div>`
      }
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
                  <img src = '${item.image}' alt = '${item.name}' />
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
            <li><button id='placeorder-button' class='primary fw'>
            <a href = '/'>Continue Shopping</a>
            </button ></li>
            
          </ul>
        </div>    
    </div>h
  </div >

`
    )

  }

}
export default OrderScreen