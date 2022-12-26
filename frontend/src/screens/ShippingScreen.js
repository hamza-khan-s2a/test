import { getUserInfo, getShipping, setShipping } from "../localStroage"
import CheckoutSteps from "../component/CheckoutSteps"

const ShippingScreen = {
  after_render: () => {
    document.querySelector('#shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()
        setShipping({
          address: document.querySelector('#address').value,
          city: document.querySelector('#city').value,
          postalCode: document.querySelector('#postalCode').value,
          country: document.querySelector('#country').value,
        })
        document.location.hash = '/payment'
      })
  },
  render: () => {
    const { name } = getUserInfo()
    if (!name) {
      document.location.hash = '/'
    }
    const { address, city, postalCode, country } = getShipping()
    return (`
    ${CheckoutSteps.render({ step1: true, step2: true })} 
<div class = "form-container">
  <form id = "shipping-form">
    <ul class = "form-items">
      <li>
        <h1>Shipping </h1>
      </li> 
      <li>
        <label for = "address">Address </label>
        <input type = "text" name ="address" id = "address" value = ${address} >
      </li> 
      <li>
        <label for = "city">City </label>
        <input type = "text" name ="city" id = "city" value = ${city}>
      </li> 
      <li>
        <label for = "postalCode">Postal Code </label>
        <input type = "text" name ="postalCode" id = "postalCode" value = ${postalCode}>
      </li> 
      <li>
        <label for = "country">Country </label>
        <input type = "text" name ="country" id = "country" value = ${country}>
      </li> 
      
      <li>
        <button type = "submit" class="primary">Continue </button>
      </li>  
  
    </ul>
  </form>
</div>
`)

  }
}


export default ShippingScreen