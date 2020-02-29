import { CONFIG } from './config';

class App{
  constructor(){
    this.products = [];
    this.users = [];
    this.init();

  }

  init(){
    fetch(`${CONFIG.api}/products`)
      .then((resolve) => resolve.json())
      .then((data) => {
      console.log(data);
    })
    fetch(`${CONFIG.api}/users`)
      .then((resolve) => resolve.json())
      .then((data) => {
      console.log(data);
    })
  }

}

const app = new App();