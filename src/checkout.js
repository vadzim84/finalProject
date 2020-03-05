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
    this.products
    
    
    

  }



}