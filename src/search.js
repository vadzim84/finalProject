import { CONFIG } from "./config"


export class Search {
  constructor(renderPage, router) {
    this.newArr = [];
    this.renderPage = renderPage;
    this.router = router;
  }

  initSearch(data) {
    const searchBtn = document.querySelector(CONFIG.selectors.searchBtn);
    const searchInput = document.querySelector('.search-btn');
    searchInput.addEventListener('mouseover', e => {
      e.preventDefault();
      searchBtn.classList.remove('hidden');
    })

    searchBtn.addEventListener('input', e => {
      e.preventDefault();
      this.newArr = [];
      const inputValue = searchBtn.value;
      if (inputValue.length > 0) {
        data.forEach((item) => {
          let finde = item.name.toLowerCase().includes(inputValue);
          if (finde && !(this.newArr.includes(item))) {
            this.newArr.push(item);
            this.renderPage.renderSearchProduct(this.newArr);
          }
        })
      } else {
        this.renderPage.renderSearchProduct(null);
        

      }
    })
  }


}