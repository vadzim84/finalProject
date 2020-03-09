import { CONFIG } from './config';
import { RenderPage } from './renderPage';
import { Router } from './router';
import { Cart } from './cart';
import { Chechout } from './checkout';
import { Checkbox } from './checkbox';
import { Search } from './search';
import { Authirize } from './authorize';

class App {
  constructor() {
    this.products = [];
    this.users = [];
    this.router = new Router();
    this.renderPage = new RenderPage(this.router, this.cart);
    this.cart = new Cart(this.products, this.router);
    this.checkout = new Chechout();
    this.checkbox = new Checkbox();
    this.search = new Search(this.renderPage, this.router);
    this.authorize = new Authirize(this.router);
    this.init();
  }

  init() {
    fetch(`${CONFIG.api}/products`)
      .then((resolve) => resolve.json())
      .then((data) => {
        this.products = data;
        this.renderPage.renderHomePage(data);
        // this.renderPage.initProductPage(data);
        // this.renderPage.initDropdawn(data);
        this.cart.addProduct(data);
        this.cart.initCartPage();
        this.cart.renderCartItem();
        this.search.initSearch(data);
        // this.checkout.initCheckoutPage();
        this.initRouter();
        this.router.render(decodeURI(location.pathname));
      })
  }


  initRouter() {
    this.router.addRouter('', this.renderPage.renderHomePage.bind(this.renderPage, this.products));
    this.router.addRouter('product', this.renderPage.renderProductPage.bind(this.renderPage, this.products));

    this.router.addRouter('cart', this.cart.initCartPage.bind(this.cart, this.products));
    this.router.addRouter('404', this.renderPage.renderError);
    this.router.addRouter('authorizate', this.authorize.initAuthorize.bind(this.authorize));
    // this.router.addRouter('buy', this.authorize.getSingUp.bind(this.authorize));
    this.router.addRouter('search', this.search.initSearch.bind(this.search, this.products));

  }


}

const app = new App();