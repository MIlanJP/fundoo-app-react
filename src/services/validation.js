class Validation {
  validateEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
  }
  validateConfirmPassword(password, confirm) {
    return password === confirm;
  }
  vallidateName(name) {
    return /^[A-Z]+[a-z1-9]*$/.test(name) && name.length > 4;
  }
}

export default new Validation();
