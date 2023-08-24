// validate password
export const isValidPhoneNumber = stringPhoneNumber =>
  stringPhoneNumber.length >= 9;
// validate email
export const isValidEmail = stringEmail => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail);
};

// validate password
export const isValidPassword = stringPassword => stringPassword.length >= 6;
