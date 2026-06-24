import {cart, addToCart} from '../data/cart.js';
import{products} from '../data/products.js';
import { moneyCents } from './utils/money.js';


function renderProducts(products){



let productsHTML = '';
products.forEach((product) => {

  productsHTML = productsHTML + `

  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
    </div>

    <div class="product-price">
      $${moneyCents(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
        Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}" >
      Add to Cart
    </button>
  </div>`
    ;

});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

attachCartEvents();
}

renderProducts(products);



function updateCartQuantity(){
   let cartQuantity = 0;

      cart.forEach((cartItem) =>{

        cartQuantity += cartItem.quantity;

      });
       document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}

function attachCartEvents(){


document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {

    button.addEventListener('click', () => {

      const productContainer = button.closest('.product-container');

      const addMessage = productContainer.querySelector('.added-to-cart');

      addMessage.classList.add('added-to-cart-visible');

       setTimeout(() =>{
        addMessage.classList.remove('added-to-cart-visible');
      }, 1500);
      

      const productId = button.dataset.productId;

      addToCart(productId);

      updateCartQuantity();
      // console.log(addMessage);


    });

  });
}

  //search button code 

  document.querySelector('.search-button')
  .addEventListener('click', () => {

    const searchText = document.querySelector('.search-bar')
      .value
      .toLowerCase();

    const filteredProducts = products.filter((product) => {

      const nameMatch =
        product.name.toLowerCase().includes(searchText);

      const keywordMatch =
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchText)
        );

      return nameMatch || keywordMatch;
    });

    if(filteredProducts.length === 0){
      document.querySelector('.js-products-grid').innerHTML = 
      `<div class="no-products">
      No Products Found
      </div>
      
      `;
      return;
    }

    renderProducts(filteredProducts);
    // attachCartEvents();
  });

  //support key
  document.querySelector('.search-bar')
  .addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
      document.querySelector('.search-button').click();
    }
  });






  //logout button function code 
  document.querySelector('.js-btn-logout').addEventListener('click', () =>{
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if(isLoggedIn){
      localStorage.removeItem('isLoggedIn');
      window.location.replace('index.html');

    }
   
  });





