import { CONFIG } from './config';

export class Router{
  constructor(){
    window.addEventListener('popstate', e => {
      console.log(e)
      this.render(decodeURI(window.location.pathname))
    })

  }

  render()


}