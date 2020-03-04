import { CONFIG } from "./config";


export class Cart{
  constructor(product){
    this.arrProduct = [];
  }

  addProduct(products){
    const btnAdd = document.querySelectorAll(CONFIG.selectors.btnAdd);
    btnAdd.forEach((item) => {
      item.addEventListener('click', e => {
        const index = item.dataset.id;
        products.forEach((item) => {
          if (item.id === Number(index)) {
            this.arrProduct.push(item);
            const data = JSON.stringify(this.arrProduct);
            window.localStorage.setItem("cart", data)
            // const lenArr = this.arrProduct.length;
            // const cartIcon = document.querySelector(CONFIG.selectors.cartIcon);
            // // const xboxCart = document.querySelector(CONFIG.selectors.xboxCart);
            // cartIcon.innerHTML = '';
            // const div = document.createElement('div');
            // cartIcon.append(div);
            // div.innerHTML = `<span class="xbox-cart servlist_xbox">${lenArr}</span>`
          }
        })
      })
    })
  
  }
  renderCartItem(){
    if(window.localStorage.cart){
      const arr = window.JSON.parse(localStorage.getItem("cart"));
      this.arrProduct.push(arr);

      // const data = window.JSON.stringify(this.arrProduct);
      // window.localStorage.getItem("cart", data)
      const lenArr = this.arrProduct[0].length;
      const cartIcon = document.querySelector(CONFIG.selectors.cartIcon);
      // const xboxCart = document.querySelector(CONFIG.selectors.xboxCart);
      cartIcon.innerHTML = '';
      const div = document.createElement('div');
      cartIcon.append(div);
      div.innerHTML = `<span class="xbox-cart servlist_xbox">${lenArr}</span>`
    }
    

    
    
  }

}