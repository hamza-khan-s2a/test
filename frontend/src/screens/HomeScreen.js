import axios from 'axios';
import Rating from '../component/Rating';
import { currencyType, hideLoading, showLoading } from '../utils';
const HomeScreen = {
  render: async () => {
    showLoading()
    const response = await axios({
      url: `/api/product`,
      headers: {
        'content-type': 'application/json',
      },
    });
    const products = response.data;
    hideLoading()
    // if (!response || response.statusText !== 'OK') {
    //   return '<div> Error in Getting Desired Data </div>';
    // }
    console.log(response);
    console.log(products);
    return `
        <ul class="products">
            ${products.map(

      (product, index) => `
                <li>
                <div class="product">
                  <a href="/#/product/${product._id}">
                    <img src="./images/${product.image}" alt="${product.name}" />
                  </a>
                  <div class="product-name">
                    <a href="/#/product/${product._id}">
                    ${product.name}
                    </a>
                  </div>
                  <div class = "prosuct-rating">
                    ${Rating.render({ value: product.rating, text: `${product.noOfReviews} reviews` })}
                  </div>
                  <div class="product-brand">
                  ${product.brand}
                  </div>
                  <div class="product-price">
                    ${product.price} ${currencyType()} 
                  </div>
                </div>
              </li>
                `,
    ).join('')}
        </ul >
  `;
  },
};

export default HomeScreen;
