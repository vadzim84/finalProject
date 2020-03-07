import { CONFIG } from './config';
import { RenderPage } from './renderPage';
import { Router } from './router';
import { Cart } from './cart';
import { Chechout } from './checkout';
import { Checkbox } from './checkbox';

class App {
  constructor() {
    this.products = [];
    this.users = [];
    this.router = new Router();
    this.renderPage = new RenderPage(this.router);
    this.cart = new Cart(this.products);
    this.checkout = new Chechout(this.products);
    this.checkbox = new Checkbox();
    this.init();
  }

  init() {
    fetch(`${CONFIG.api}/products`)
      .then((resolve) => resolve.json())
      .then((data) => {
        this.products = data;
        this.renderPage.renderHomePage(data);
        this.renderPage.initProductPage(data);
        this.cart.addProduct(data);
        this.cart.renderCartPage();
        this.cart.renderCartItem();
        // this.checkout.initCheckoutPage();
        this.initRouter();
        this.router.render(decodeURI(location.pathname));

      })
    // fetch(`${CONFIG.api}/users`)
    //   .then((resolve) => resolve.json())
    //   .then((data) => {
    //   console.log(data);
    // })
  }


  initRouter() {
    this.router.addRouter('', this.renderPage.renderHomePage.bind(this.renderPage, this.products));
    this.router.addRouter('product', this.renderPage.renderProductPage.bind(this.renderPage, this.products));

    this.router.addRouter('cart', this.cart.renderCartPage.bind(this.cart, this.products));
    this.router.addRouter('404', this.renderPage.renderProductPage.bind(this.renderPage, this.products));
    this.router.addRouter('filter', this.renderPage.renderProductPage.bind(this.renderPage, this.products));
    this.router.addRouter('filter', this.renderPage.renderProductPage.bind(this.renderPage, this.products));

  }


}

const app = new App();