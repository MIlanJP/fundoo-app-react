class Auth {
  constructor() {
    this.authenticated = false;
    this.loginTimeLimitInMinutes = 30;
    this.logged = "";
  }

  login(cb) {
    console.log(new Date());
    localStorage.setItem("loginTime", new Date());
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    if (!this.authenticated) {
      const loggedTime = localStorage.getItem("loginTime");
      console.log(loggedTime);
      this.authenticated =
        (new Date() - new Date(loggedTime)) / 60000 <
        this.loginTimeLimitInMinutes;
    }
    return this.authenticated;
  }
}
export default new Auth();
