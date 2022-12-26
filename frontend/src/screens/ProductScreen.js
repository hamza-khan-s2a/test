import { getProduct } from "../api";
import Rating from "../component/Rating";
import { currencyType, hideLoading, parseRequestUrl, showLoading } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl()
    document.querySelector('.add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`
    })
  },
  render: async () => {
    const request = parseRequestUrl()
    showLoading()
    const product = await getProduct(request.id)
    if (product.error) {
      return `<div>${product.error}</div>`
    }
    hideLoading()
    return `<div class = "content">
      <div class = "back-to-result">
        <a href = "/#/">Back to Result</a>
      </div>
      <div class = "details">
        <div class = "details-image">
          <img src ="./images/${product.image}" alt = "${product.name}" />
        </div>
        <div class = "details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              ${Rating.render({ value: product.rating, text: `${product.numReviews}reviews` })}
            </li>
            <li>
               price : <strong>${product.price} ${currencyType()} </strong>
            </li>
            <li>
               Description : <div>${product.description} </div>
            </li>
          </ul>
        </div>
        <div class = "details-action">
          <ul>
            <li>
              Price : ${product.price} ${currencyType()}
            </li>
            <li>
              Status : ${product.qty > 0 ? '<span class="success">In Stock</span>' : '<span class="error">Unavailible</span>'}
            </li >
            <li>
              <button class = "fw primary add-button">Add to Cart</button>
            </li>
          </ul >
        </div >
      </div >
    </div > `
  },
};
export default ProductScreen;
