import { CONFIG } from "./config";

export class Authirize{
  constructor(router){
    this.initAuthorize();
    this.router = router;
  }

  initAuthorize(){
    const authorizeBtn = document.querySelector(CONFIG.selectors.authorizeBtn);
    authorizeBtn.addEventListener('click', e => {
      e.preventDefault();
      window.history.pushState(null, null, '/authorizate');
      this.router.render(decodeURI(location.pathname));
      this.getSingUp();
      this.getSingIn();
    })
  }

  getSingUp(){
    const localAuth = window.localStorage.getItem('kelishak');
    const mainContent = document.querySelector(CONFIG.selectors.mainContentList);
    mainContent.classList.add(CONFIG.hidden);
    if(localAuth){
      const auth = document.querySelector('.aurth-ok');
      auth.classList.remove(CONFIG.hidden);
      setTimeout(() => {
        auth.classList.add(CONFIG.hidden);
        this.getBuy();
      }, 3000);

    } else{
     
      const authDesck = document.querySelector(CONFIG.selectors.autorizatePage);
      authDesck.classList.remove(CONFIG.hidden);
      const singUp = document.querySelector('.sing-up');
      singUp.addEventListener('click', e => {
        e.preventDefault();
        const name1 = document.getElementById('exampleInputName1').value;
        const name2 = document.getElementById('exampleInputName2').value;
        const email2 = document.getElementById('exampleInputEmail2').value;
        const password = document.getElementById('exampleInputPassword2').value;
        const alert = document.querySelector('.alert-warning-up');
        const alert1 = document.querySelector('.alert-email');
        const alert2 = document.querySelector('.alert-password')
        alert1.classList.add(CONFIG.hidden)
        alert.classList.add(CONFIG.hidden);
        alert2.classList.add(CONFIG.hidden)
        let user = {userFName: name1, userSName: name2, email: email2, password: password};
        if(!name1.length || !name2.length || !email2.length || !password.length){
          alert.classList.remove(CONFIG.hidden);
        }
        if(!email2.match(/@/g)){
          alert1.classList.remove(CONFIG.hidden);
        }
        if(password.length <= 5){
          alert2.classList.remove(CONFIG.hidden);
        }
        
        if(name1.length && name2.length && password.length > 5 && email2.match(/@/g)){
          fetch(`${CONFIG.api}/users`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if(data){
              const alert = document.querySelector('.registr-ok');
              alert.classList.remove(CONFIG.hidden);
              setTimeout(() => {
                authDesck.classList.add(CONFIG.hidden);
                this.getBuy();
              }, 4000);
              window.localStorage.setItem("kelishak", "Hello, World!")
              // window.history.pushState(null, null, '/');
              // this.router.render(decodeURI(location.pathname));
              
            }
          })
        }
      })
    }
  }

  getSingIn(){
      const mainContent = document.querySelector(CONFIG.selectors.mainContentList);
      const authDesck = document.querySelector(CONFIG.selectors.autorizatePage);
      const singUp = document.querySelector('.sing-in');
      singUp.addEventListener('click', e => {
        e.preventDefault();
        const email1 = document.getElementById('exampleInputEmail1').value;
        const password = document.getElementById('exampleInputPassword1').value;
        const alert = document.querySelector('.alert-warning-in');
        const alert1 = document.querySelector('.alert-email-in');
        const alert2 = document.querySelector('.alert-password-in')
        const alert3 = document.querySelector('.alert-none')
        alert1.classList.add(CONFIG.hidden)
        alert.classList.add(CONFIG.hidden);
        alert2.classList.add(CONFIG.hidden)
        alert3.classList.add(CONFIG.hidden)
        if(!email1.length || !password.length){
          alert.classList.remove(CONFIG.hidden);
        }
        if(!email1.match(/@/g)){
          alert1.classList.remove(CONFIG.hidden);
        }
        if(password.length <= 5){
          alert2.classList.remove(CONFIG.hidden);
        }
        if (email1.trim() && password.trim() && password.length > 5 && email1.match(/@/g)) {
          fetch(`${CONFIG.api}/users`)
            .then((res) => res.json())
            .then((res) => {
              res = res.filter((item) => item.email === email1 && String(item.password) === password);
                if(res.length === 1) {
                const alert = document.querySelector('.auth-ok');
                alert.classList.remove(CONFIG.hidden);
                setTimeout(() => {
                  authDesck.classList.add(CONFIG.hidden);
                  this.getBuy();
                }, 4000);
                window.localStorage.setItem("kelishak", "Hello, World!");
                // window.history.pushState(null, null, '/buy');
                // this.router.render(decodeURI(location.pathname));
                
              } else {
                alert3.classList.remove(CONFIG.hidden);

              }

            })
              
          
        }
    })
  }
  getBuy(){
    const buyin = document.querySelector('.bying');
    buyin.classList.remove(CONFIG.hidden);
  }

}