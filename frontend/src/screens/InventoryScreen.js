import { addInventory } from "../api";
import { hideLoading, showLoading, showMessage } from "../utils";

const InventoryScreen = {
  after_render: () => {
    let _image
    document.querySelector('.custom-file')
      .addEventListener('change', (e) => {
        _image = e.target.files[0]


      })
    document.querySelector('#inventory-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()
        const inventory = {
          name: document.querySelector('#name').value,
          productCategory: document.querySelector('#category').value,
          price: document.querySelector('#price').value,
          brand: document.querySelector('#brand').value,
          rating: document.querySelector('#rating').value,
          noOfReviews: document.querySelector('#num-reviews').value,
          qty: document.querySelector('#quantity').value,
          // path: document.querySelector('#path').value,
          featuredImage: _image

        }
        showLoading()
        const response = await addInventory(inventory)
        hideLoading()

        if (response.error) {

          showMessage(response.error)
        } else {
          showMessage(response.message)
        }

      })


  },
  render: () => {
    return `
    <div class = "inventory">
      <div class="inventory-content">
      <div class = "form-container">
      <form id = "inventory-form" enctype = "multipart/form-data">
        <ul class = "form-items">
          <li>
            <h1>Inventory </h1>
          </li> 
           
          <li>
            <label for = "name">Name </label>
            <input type = "text" name ="name" id = "name">
          </li> 
          <li>
            <label for = "category">Product category </label>
            <input type = "text" name ="category" id = "category" >
          </li>
          
          <li>
            <label for = "price">Price </label>
            <input type = "number" name ="price" id = "price" min = 1 >
          </li> 
          <li>
            <label for = "brand">brand </label>
            <input type = "text" name ="brand" id = "brand" >
          </li> 
          <li>
            <label for = "rating">Rating </label>
            <input type = "number" name ="rating" id = "rating" min="1" max = "5" >
          </li> 
          <li>
            <label for = "num-reviews">Num of Reviews </label>
            <input type = "number" name ="num-reviews" id = "num-reviews" min="0" >
          </li> 
          <li>
            <label for = "quantity">Quantity</label>
            <input type = "number" name ="quantity" id = "quantity" min="0" >
          </li> 
          
         <li>
         <label for = "featuredImage" class="custom-file-label">Choose File</label>
         <input type = "file" name ="featuredImage" id = "featuredImage"  class="custom-file">
         </li>
        </ul>
        <div class="cart-action">
          <button type="submit" class="primary fw add-inventory-button">Proceed to Checkout</button>
        </div >
      </form>
    </div>
      </div>

    </div>`
  }
}

export default InventoryScreen