import { CONFIG } from "./config";
import { Observble } from "./observable";


export class Checkbox{
  constructor(){
    this._checkbox = document.querySelectorAll(CONFIG.selectors.checkbox);
    this._observble = new Observble();
    this.filters = {};
    this.init();
  }

  init(){
    this._checkbox.forEach((item) => {
      item.addEventListener('click', this.onCkeckboxClick.bind(this));
    });
  }

  onCkeckboxClick(click){
    const event = click.target;
    const checkname = event.getAttribute('name');
    if(event.checked){
      if(!(this.filters[checkname] && this.filters[checkname].length)){
        this.filters[checkname] = [];
      }
      this.filters[checkname].push(event.id);
    } else{
      if(this.filters[checkname] && this.filters[checkname].length &&
        this.filters[checkname].includes(event.id)){
          let index = this.filters[checkname].indexOf(event.id);
          this.filters[checkname].splice(index, 1);
        }
        if(!this.filters[checkname].length){
          delete this.filters[checkname];
        }
    }
  }

  initialState() {
    if (location.pathname.includes('filter/')) {
      let filter = location.pathname.split('/filter/')[1].trim();
      try {
        this.filters = JSON.parse(decodeURI(filter));
      } catch (e) {
        this.filters = {};
      }
    }
  }

}