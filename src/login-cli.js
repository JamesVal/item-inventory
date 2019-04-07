import $ from 'jquery';
import Cookies from 'universal-cookie';
import environment_vars from './environment/environment-secret';

function LoginClient() {
  this.serverURI = environment_vars.loginServerURI;
}

LoginClient.prototype.postLogin = function(login) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: this.serverURI+"/auth",
      crossDomain: true,
      data: JSON.stringify({"login": login}),
      contentType: "application/json"
    }).done((data) => {
      const token = JSON.parse(data).token;
      const cookies = new Cookies();
      let result = "Success!";
      
      if (token) {
        console.log("Save token", token);
        cookies.set("II_TOKEN", token, {path: "/"});
      } else {
        result = JSON.parse(data).error;
      }
      resolve(JSON.parse(data));
    }).fail((err) => {
      reject(JSON.parse(err));
    });
  });
}

const loginClient = new LoginClient();

export default loginClient;