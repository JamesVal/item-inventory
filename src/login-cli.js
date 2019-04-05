import $ from 'jquery';
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
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
}

const loginClient = new LoginClient();

export default loginClient;