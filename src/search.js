import { CONFIG } from "./config"


export class Search{
  constructor(renderPage, router){
    this.newArr = [];
    this.renderPage = renderPage;
    this.router = router;

  }

  initSearch(data){
    const searchBtn = document.querySelector(CONFIG.selectors.searchBtn);
    searchBtn.addEventListener('input', e => {
      e.preventDefault();
      window.history.pushState(null, null, '/search');
      this.router.render(decodeURI(location.pathname));
      this.newArr = [];
      const inputValue = searchBtn.value;
      if(inputValue.length > 2){
      // var re = new RegExp(`${inputValue});
      data.forEach((item) => {
        // const str = 
        let finde = item.name.toLowerCase().includes(inputValue);
        if (finde && !(this.newArr.includes(item))) {
          this.newArr.push(item);
          console.log('this.newArr', this.newArr)
        this.renderPage.renderSearchProduct(this.newArr);
        }
      })
    }
    })
  }



}