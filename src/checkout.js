import { CONFIG } from "./config";
import { Authirize } from './authorize';


export class Chechout{
  constructor(products){
    this.products = products;
    this.authorize = new Authirize;
  }

  initCheckoutPage(){
    const chechout = document.querySelectorAll(CONFIG.selectors.checkoutBtnSingle);
    chechout.forEach((item) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const index = item.dataset.id;
        const mainContent = document.querySelector(CONFIG.selectors.mainContentList);
        mainContent.classList.add(CONFIG.hidden);
        this.authorize.getSingIn();
        this.authorize.getSingUp();

      })
    })
    
  }

  // renderCheckoutPage(index){
  //   // this.products
  //   // console.log('this.products', this.products)
  //   const data = {
  //     username: "Zmicier",
  //     "gmail": "zmicierd@gmail.com",
  //     "password": "1234321",
  //   }

  //   fetch(`${CONFIG.api}/users`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('data', data)
        
  //     })
    
  // }


}