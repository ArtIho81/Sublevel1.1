/**
 * Сollection object for field validation using regular expressions.
 * Contains methods for validate e-mail, phone and password.
 */
const Validator = {
  /* firstpart@secondpart.end
   firstpart may contain letters and digits.  Also may contain '+', '.', '-' but don't start with them.
   firspart lehgth is 2 - 20 symbols.
   secondpart may contain letters, digits and special symbols: '.', '!', '$', '%', '&' '’', '*','+', '/', '=', 
   '?', '^', '_', '-'. secondpart length is 1 - 15 symbols
   end may contain only letters, its length is 1 - 5 letters */
  validateEmail(email) {
    return /^[a-z\d][a-z\d+.-]{1,19}@[\w.^+!?%&'$*\/=-]{1,15}\.[a-z]{1,5}$/i.test(
      email
    );
  },

  /* +38 (099) 567 8901
  '+38' is optional, 
  parentheses around operator code '(099)' are optional,
  hyphens and spaces are allowed anywhere,
  max length pnone is 25 symbols including all of hyphens and spaces.
  */
  validatePhone(phone) {
    return (
      /^[\s-]*(\+38)?([\s-]*\(([\s-]*\d[\s-]*){3}\)([\s-]*\d[\s-]*){7}|([\s-]*\d[\s-]*){10})$/.test(
        phone
      ) && phone.length <= 25
    );
  },

  /* The password must contain min 8 symbols. Symbol is letter, digit or '_'. 
  The password must contain at least one capital letter, one small letter and one number; */
  validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w_]{8,}$/.test(password);
  },
};

