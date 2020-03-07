import { CONFIG } from "./config";


export class Chechout{
  constructor(products){
    this.products = products;
  }

  initCheckoutPage(){
    const chechout = document.querySelectorAll(CONFIG.selectors.checkoutBtnSingle);
    chechout.forEach((item) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const index = item.dataset.id;
        this.renderCheckoutPage(index);
      })
    })
  }

  renderCheckoutPage(index){
    // this.products
    // console.log('this.products', this.products)
    const data = {
      username: "Zmicier",
      "gmail": "zmicierd@gmail.com",
      "password": "1234321",
    }

    fetch(`${CONFIG.api}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        
      })
    
  }


}