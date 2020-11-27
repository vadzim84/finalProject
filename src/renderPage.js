import { CONFIG } from "./config";

export class RenderPage {
  constructor(router, cart) {
    this.router = router;
    this.cart = cart;
    // this.homeButton();
  }

  renderHomePage(products) {
    const saleProd = document.querySelector('.home-page');
    window.addEventListener('resize', e => {
      e.preventDefault();
      const whidth = document.documentElement.clientWidth;
      if (whidth < 845) {
        saleProd.classList.add('hidden')
      }
      else saleProd.classList.remove('hidden')
    })

    const productsList = document.querySelector(CONFIG.selectors.productsList);
    const productCard = document.querySelector('.products');
    productCard.innerHTML = '';
    products.forEach(item => {
      const div = document.createElement('div');
      productsList.append(div);
      div.innerHTML = `
                <div class="col-fore">
                  <div class="product-item" data-id="${item.id}">
                    <a href="#" class=""><img src="${item.image}" height="" alt="" /></a>
                    <h2 class="titleEl"><a href="#">${item.name}</a></h2>
                  </div>
                  <div class="cost"><span>$ </span>${item.price}</div>
                  <button class="btn-add" data-id="${item.id}">ADD TO CART</button>
                </div>`

    });
    productsList.querySelectorAll('.product-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const index = item.dataset.id;
        window.history.pushState(null, null, `/product/${index}`);
        this.router.render(decodeURI(location.pathname));
      })
    })
    // this.initProductPage(products);
    this.cart.addProduct(products)
  }


  initDropdawn(products) {
    const high = document.querySelector('.high');
    const low = document.querySelector('.low');
    const rating = document.querySelector('.rating');

    high.addEventListener('click', e => {
      e.preventDefault();
      products.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      })
      this.renderHomePage(products);
    });
    low.addEventListener('click', e => {
      e.preventDefault();
      products.sort(function (a, b) {
        return Number(b.price) - Number(a.price);
      })
      this.renderHomePage(products);
    });
    rating.addEventListener('click', e => {
      e.preventDefault();
      products.sort(function (a, b) {
        return Number(b.id) - Number(a.id);
      });
      this.renderHomePage(products);
    });
  }




  // initProductPage(products) {
  //   const colProduct = Array.prototype.slice.call(document.querySelectorAll(CONFIG.selectors.colProduct));
  //   colProduct.forEach((item) => {
  //     item.addEventListener('click', e => {
  //       const index = item.dataset.id;
  //       window.history.pushState(null, null, `product/${index}`);
  //       this.router.render(decodeURI(location.pathname));
  //       this.renderProductPage(products);
  //     })
  //   })
  // }

  renderProductPage(products) {
    const index = location.pathname.split('/product/')[1].trim();
    products.forEach((item) => {
      if (item.id === Number(index)) {
        const pageList = document.querySelector(CONFIG.selectors.mainContentList);
        // pageList.firstChild.remove();
        const page = document.querySelector(CONFIG.selectors.mainContent);
        page.classList.add(CONFIG.hidden);
        const div = document.createElement('div');
        pageList.append(div);
        div.innerHTML =
          `<div class="product-page container">
                            <div class="row">
                              <div class="col-6">
                                <img src="${item.image}" alt="">
                              </div>
                              <div class="col-6">
                                <h3 class="title-name">${item.name}</h3>
                                <div class="price">$${item.price}</div>
                                <div class="quantity">
                                  <lable>QTY</lable>
                                  <select>
                                    <option>1</option>>
                                    <option>2</option>>
                                    <option>3</option>>
                                    <option>4</option>>
                                    <option>5</option>> 
                                    <option>6</option>>
                                  </select>
                                </div>
                                <div class="btn-added">
                                 <button class="btn-add" data-id="${item.id}">Add to Cart</button>
                                </div>
                              </div>
                            </div>

                          <div class="container">
                            <div id="accordion" class="panel-group">

                              <div class="panel panel-default overview">
                                <div class="panel-heading">
                                  <h4 class="overview title" ><a data-toggle="collapse" href="#collapse-1">- Overview</a></h4>
                                </div>
                                <div id="collapse-1" class="panel-collapse collapse">
                                  <div class="detail panel-body">${item.description}</div>
                                </div>
                              </div>

                              <div class="panel panel-default details">
                                <div class="panel-heading">
                                  <h4 class="details title" ><a data-toggle="collapse" href="#collapse-2">- Details & Dimensions</a></h4>
                                </div>
                                <div id="collapse-2" class="panel-collapse collapse">
                                  <div class="demensions panel-body">${item.dimensions}</div>
                                  <div class="details panel-body">${item.details}</div>
                                </div>
                              </div>

                              <div class="panel panel-default shipping">
                                <div class="panel-heading">
                                  <h4 class="shipping title" ><a data-toggle="collapse" href="#collapse-3">- Shipping & Returns</a></h4>
                                </div>
                                <div id="collapse-3" class="panel-collapse collapse">
                                  <div class="hello panel-body">Hello World!!!!!</div>
                                </div>
                              </div>

                              </div>
                            </div>
                          </div>`
      }
    })
  }

  // filterResult(products, filter) {
  //   console.log(filter);
  //   const options = CONFIG.filterItem;
  //   let productsCopy = [...products];
  //   let result = [];
  //   let isFiltered = false;
  //   this.clearCheckbox();

  //   options.forEach((option) => {
  //     if(filter[option] && filter[option].length) {
  //       if (isFiltered) {
  //         productsCopy = result;
  //         result = [];
  //       }
  //       console.log(option);
  //       filter[option].forEach((item) => {
  //         productsCopy.forEach((product) => {
  //           if (typeof product.specs[option] === 'number' &&
  //             product.specs[option] === Number(item)) {
  //             result.push(product);
  //             isFiltered = true;
  //           }

  //           if (typeof product.specs[option] === 'string' &&
  //             product.specs[option].toLowerCase().indexOf(item) !== -1) {
  //             result.push(product);
  //             isFiltered = true;
  //           }
  //         });
  //           [...document.querySelectorAll(`input[name=${option}]`)].filter((checkbox) => {
  //             return checkbox.value === item;
  //           })[0].checked = true;
  //       });
  //     }
  //   });
  //   return result;
  // }

  renderSearchProduct(products) {
    const page = document.querySelector('.navbar');
    const oldSearchlist = document.querySelector('.search-list');
    if (oldSearchlist) {
      oldSearchlist.remove();
    }
    if (oldSearchlist && products == null) {
      oldSearchlist.remove();
    } else {

      const mainDiv = document.createElement('div');
      mainDiv.classList.add('search-list')
      page.append(mainDiv);
      products.forEach(item => {
        const div = document.createElement('div');
        mainDiv.append(div);
        div.innerHTML = `
        <div class="col-fore" data-id="${item.id}">
                  <div class="search-item" data-id="${item.id}">
                    <a  class=""><img src="${item.image}" height="" alt="" /></a>
                    <h2 class=""><a>${item.name}</a></h2>
                  </div>
                </div>`
      })
      page.querySelectorAll('.col-fore').forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const index = item.dataset.id;
          window.history.pushState(null, null, `/product/${index}`);
          this.router.render(decodeURI(location.pathname));
          console.log('location.pathname', location.pathname)

          mainDiv.remove();
        });
      });
    }
  }

  render404() {
    history.pushState(null, null, '/404');
    this.router.render(decodeURI(location.pathname));
  }

  renderError() {
    const page = document.querySelector('.errorPage');
    const mainContent = document.querySelector(CONFIG.selectors.mainContentList);
    mainContent.classList.add(CONFIG.hidden)
    page.classList.remove(CONFIG.hidden);

  }


  // homeButton(){
  //   const homeButton = document.querySelector('.logo');
  //   homeButton.addEventListener('click', e => {
  //     e.preventDefault();
  //     this.renderHomePage();
  //     window.history.pushState(null, null, `/`);
  //     this.router.render(decodeURI(location.pathname));
  //   })
  // }


}