import { CONFIG } from "./config";

export class RenderPage {
  constructor(router) {
    this.router = router;

  }

  renderHomePage(products) {
    const productsList = document.querySelector(CONFIG.selectors.productsList);
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
    // window.history.pushState(null, null, `/kelishak/home`);
    // this.router.render(decodeURI(location.pathname));

  }

  initProductPage(products) {
    const colProduct = Array.prototype.slice.call(document.querySelectorAll(CONFIG.selectors.colProduct));
    colProduct.forEach((item) => {
      item.addEventListener('click', e => {
        const index = item.dataset.id;
        console.log('index', index)
        window.history.pushState(null, null, `products/${index}`);
        // this.router.render(decodeURI(location.pathname));
        this.renderProductPage(products, index);
      })
    })
  }
  renderProductPage(products, index){
    products.forEach((item) => {
      if (item.id === Number(index)) {
        const page = document.querySelector(CONFIG.selectors.mainContent);
        page.innerHTML = '';
        const div = document.createElement('div');
        page.append(div);
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
                          </div>`;
      }
    })
  }
}