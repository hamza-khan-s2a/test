import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStroage";
import { currencyType, parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {

  let cartItems = getCartItems()
  const existItem = cartItems.find(x => x.product === item.product)
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x)
    }
  }
  else {
    cartItems = [...cartItems, item]
  }
  setCartItems(cartItems)
  if (forceUpdate) {
    console.log("hey");
    rerender(CartScreen)
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter(x => x.product !== id))
  console.log(getCartItems());
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart'
  } else {
    rerender(CartScreen)
  }
}

const CartScreen = {
  after_render: () => {
    const qtySelects = document.querySelectorAll('.qty-select')

    qtySelects.forEach((selectBox) => {
      selectBox.addEventListener('change', (e) => {
        const item = getCartItems().find(x => x.product === selectBox.id)
        addToCart({ ...item, qty: Number(e.target.value) }, true)
      })
    })
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeFromCart(deleteButton.id)
      })
    })
    document.querySelector('.checkout-button').addEventListener('click', () => { document.location.hash = '/signin' })
  },
  render: async () => {
    const request = parseRequestUrl()
    if (request.id) {

      const product = await getProduct(request.id)
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.qty,
        qty: 1
      })
    }
    const cartItems = getCartItems()
    return `
    <div class = "content cart">
        <div class="cart-list">
          <ul class = "cart-list-container">
            <li>
              <h1 class="hs-h3">Shoping Cart</h1>
              <div>price</div>
            </li>
            ${cartItems.length === 0
        ? '<div> Cart is Empty. <a href = "/#/"> Go Shoping</a></div>'
        : cartItems.map(item => `
        <li>
          <div class="cart-image">
            <img src = "./images/${item.image}" alt = "${item.name}"/>
          </div>
          <div class="cart-name">
              <div>
                <a href = "/#/product/${item.product}">
                  ${item.name}
                </a>
              </div>
              <div>
              Qty : <select class = "qty-select" id = ${item.product}>
              ${[...Array(item.countInStock).keys()].map((count) =>
          item.qty === count + 1
            ? `<option selected value = "${count + 1}">${count + 1}</option>`
            : `<option value = "${count + 1}">${count + 1}</option>`

        )}
              </select>
          <button type = "button" class="delete-button" id = ${item.product}>Delete</button>
          </div>
          </div>   
          <div class = "cart=price">${item.price} ${currencyType()}</div>
        </li>
        `).join("\n")
      }
          </ul >
        </div >
  <div class="cart-action">
    <h1 class="hs-h3">
   
      Subtotal (${cartItems.reduce((accum, currItem) => accum + currItem.qty, 0)} item) :
      ${cartItems.reduce((accum, currItem) => accum + currItem.qty * currItem.price, 0)} ${currencyType()}
    </h1 >
    <button class="primary fw checkout-button">Proceed to Checkout</button>
  </div >
    </div >
  `
  }
};
export default CartScreen