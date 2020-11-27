import { CONFIG } from "./config";
import { Chechout } from "./checkout";


export class Cart {
  constructor(router) {
    this.arrProduct = [];
    this.cartArr = [];
    this.checkout = new Chechout();
    this.products = [];
    this.router = router;
  }

  addProduct() {
    const btnAdd = document.querySelectorAll(CONFIG.selectors.btnAdd);
    btnAdd.forEach((item) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const product = {
          id: item.dataset.id,
          quantity: 1
        }
        if (this.arrProduct.length > 0) {
          const find = this.arrProduct.find(item => Number(item.id) === Number(product.id))
          if (find) {
            find.quantity += 1;
          } else { this.arrProduct.push(product) }
        } else {
          this.arrProduct.push(product);
        }
        this.jsonStr();
        const lenArr = this.arrProduct.length;
        const cartIcon = document.querySelector(CONFIG.selectors.cartIcon);
        cartIcon.innerHTML = '';
        const div = document.createElement('div');
        cartIcon.append(div);
        div.innerHTML = `<span class="xbox-cart servlist_xbox">${lenArr}</span>`;
      })
    })
  }

  renderCartItem() {
    if (window.localStorage.cart) {
      const arr = window.JSON.parse(localStorage.getItem("cart"));
      this.arrProduct = arr;
      const lenArr = this.arrProduct.length;
      const cartIcon = document.querySelector(CONFIG.selectors.cartIcon);
      cartIcon.innerHTML = '';
      if (lenArr > 0) {
        const div = document.createElement('div');
        cartIcon.append(div);
        div.innerHTML = `<span class="xbox-cart servlist_xbox">${lenArr}</span>`;
      }
    }
  }

  initCartPage(data) {
    this.products = data;
    const cartBtn = document.querySelector(CONFIG.selectors.cartBtn);
    cartBtn.addEventListener('click', e => {
      e.preventDefault();
      window.history.pushState(null, null, '/cart');
      this.router.render(decodeURI(location.pathname));
      this.renderCartPage(data);
    })
  }

  renderCartPage() {
    const index = location.pathname.split('/')[1].trim();
    if (String(index) === String('cart')) {
      const mainContent = document.querySelector(CONFIG.selectors.mainContent);
      mainContent.innerHTML = '';
      const vat = document.querySelector(CONFIG.selectors.cartHeader);
      vat.classList.remove(CONFIG.hidden);
      this.filterArr();
      this.cartArr.forEach((item) => {
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
                          <select class="select">
                            <option value="1">1</option>
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
                        <div class="col-1 cart-price">$${Number(item.price) * Number(item.quantity)}</div>
                        <div class="col-3 checkout-btn-single"  data-id="${item.id}"><button>Checkout</button></div>
                      </div>
                    </div>`;
        if (item.quantity > 1) {
          const qntt = div.querySelectorAll('option')
          qntt.forEach((index) => {
            if (Number(index.value) === Number(item.quantity)) {
              index.selected = true;
            }
          })
        }
      })
      const val = document.querySelector(CONFIG.selectors.cartFooter);
      val.classList.remove(CONFIG.hidden);
      this.getSum();
      this.checkout.initCheckoutPage();
      this.selectQnt();
    }
    const removeBtn = document.querySelectorAll(CONFIG.selectors.removeBtn);
    removeBtn.forEach((item) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        this.removeCartProduct(item);
      })
    })
  }

  removeCartProduct(product) {
    product.parentElement.parentElement.parentElement.classList.add(CONFIG.hidden);
    const index = product.dataset.id;
    const gfhdg = this.arrProduct.find(i => String(i.id) === String(index));
    let ind = this.arrProduct.indexOf(gfhdg);
    this.arrProduct.splice(ind, 1);
    this.filterArr();
    this.jsonStr();
    this.renderCartItem();
    this.getSum();
  }

  getSum() {
    const cartResult = document.querySelector(CONFIG.selectors.cartResult);
    this.sum = 0;
    this.cartArr.forEach((item) => {
      this.sum += Number(item.price) * Number(item.quantity);
    })
    const div = document.createElement('div');
    cartResult.innerHTML = '';
    cartResult.append(div);
    div.innerHTML = `<div class="result-price">$${this.sum}</div>`;
  }

  filterArr() {
    this.cartArr = [];
    this.products.forEach((item) => {
      this.arrProduct.forEach((index) => {
        if (Number(item.id) === Number(index.id)) {
          item.quantity = index.quantity;
          this.cartArr.push(item);
        }
      })
    })

  }

  selectQnt() {
    const select = document.querySelectorAll('select');
    select.forEach((item) => {
      item.addEventListener('change', e => {
        const id = item.parentElement.parentElement.dataset.id;
        const qnt = item.value;
        const find = this.arrProduct.find(item => Number(item.id) === Number(id));
        find.quantity = qnt;
        this.jsonStr();
        this.renderCartPage();
      })
    })
  }

  jsonStr() {
    // window.localStorage.removeItem('cart');
    const data = JSON.stringify(this.arrProduct);
    window.localStorage.setItem("cart", data);
  }



}