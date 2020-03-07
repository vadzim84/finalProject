import { CONFIG } from "./config";
import { Chechout } from "./checkout";


export class Cart{
  constructor(product){
    this.arrProduct = [];
    this.checkout = new Chechout();
    
  }

  addProduct(products){
    const btnAdd = document.querySelectorAll(CONFIG.selectors.btnAdd);
    btnAdd.forEach((item) => {
      item.addEventListener('click', e => {
        console.log('e', e)
        const index = item.dataset.id;
        products.forEach((item) => {
          if (item.id === Number(index)) {
            this.arrProduct.push(item);
            const data = JSON.stringify(this.arrProduct);
            window.localStorage.setItem("cart", data)
            const lenArr = this.arrProduct.length;
            const cartIcon = document.querySelector(CONFIG.selectors.cartIcon);
            cartIcon.innerHTML = '';
            const div = document.createElement('div');
            cartIcon.append(div);
            div.innerHTML = `<span class="xbox-cart servlist_xbox">${lenArr}</span>`
          }
        })
      })
    })
  }


  renderCartItem(){
    if(window.localStorage.cart){
      const arr = window.JSON.parse(localStorage.getItem("cart"));
      this.arrProduct = arr;
      const lenArr = this.arrProduct.length;
      const cartIcon = document.querySelector(CONFIG.selectors.cartIcon);
        cartIcon.innerHTML = '';
      if(lenArr > 0){
        const div = document.createElement('div');
        cartIcon.append(div);
        div.innerHTML = `<span class="xbox-cart servlist_xbox">${lenArr}</span>`;
      }
    }
  }

  renderCartPage(){
    const cartBtn = document.querySelector(CONFIG.selectors.cartBtn);
    cartBtn.addEventListener('click', e => {
      e.preventDefault();
      window.history.pushState(null, null, '/cart');
      // this.router.render(decodeURI(location.pathname));
      this.reRenderCartPage();
      
    })
  }
  reRenderCartPage(){
    const index = location.pathname.split('/')[1].trim();
    console.log('index', index)
     if(String(index) === String('cart')){
      const mainContent = document.querySelector(CONFIG.selectors.mainContent);
      mainContent.innerHTML = '';
      const vat = document.querySelector(CONFIG.selectors.cartHeader);
      vat.classList.remove(CONFIG.hidden);
      this.arrProduct.forEach((item) => {
      const div = document.createElement('div');
      mainContent.append(div);
      div.innerHTML = `
                      <div class="container cart-page">
                        <div class="row"  data-id="${item.id}">
                        <div class="col-3"><img src="${item.image}" alt=""></div>
                        <div class="col-4">
                          <div class="title-product-cart">${item.name}</div>
                          <div class="remove-btn"  data-id="${item.id}"><button>Remove</button></div>
                        </div>
                        <div class="col-1 cart-select">
                          <select class=" select" name="" id="">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div class="col-1 cart-price">$${item.price}</div>
                        <div class="col-3 checkout-btn-single"  data-id="${item.id}"><button>Checkout</button></div>
                      </div>
                    </div>`;
                  })
                  const val = document.querySelector(CONFIG.selectors.cartFooter);
                  val.classList.remove(CONFIG.hidden);
                  const cartResult = document.querySelector(CONFIG.selectors.cartResult);
                  this.sum = 0;
                  this.arrProduct.forEach((item) => {
                    this.sum += Number(item.price);
                  })
                  const div = document.createElement('div');
                  cartResult.innerHTML = '';
                  cartResult.append(div);
                  div.innerHTML = `<div class="result-price">$${this.sum}</div>`;
                  this.removeCartProduct();
                  this.checkout.initCheckoutPage();
    }
  }
  


  removeCartProduct(){
    const removeBtn = document.querySelectorAll(CONFIG.selectors.removeBtn);
    removeBtn.forEach((item) => {
      item.addEventListener('click', e =>{
        item.parentElement.parentElement.parentElement.classList.add(CONFIG.hidden);
        const index = item.dataset.id;
        const gfhdg = this.arrProduct.find(i => String(i.id) !== String(index));
        let ind = this.arrProduct.indexOf(gfhdg);
        this.arrProduct.splice(ind, 1);
        console.log('this.arrProduct', this.arrProduct)
        window.localStorage.removeItem('cart');
        const data = JSON.stringify(this.arrProduct);
        window.localStorage.setItem("cart", data);
        this.renderCartItem();
        this.reRenderCartPage();
      })
    })
  }
}