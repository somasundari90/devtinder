// Function to check if the string has only Alphabet
const isAlphabetOnly = (input) => {
  return /^[A-Za-z]+$/.test(input);
};

//Function to check if the string contains Space and alphabet only
const isAlphabetWithSpaceOnly = (input) => {
  return /^[a-zA-Z ]*$/.test(input);
};

// Function to check if the string has only Number
const isNumericOnly = (input) => {
  return /^\d+$/.test(input);
};

// Function to check if the string is valid email
const isValidEmail = (input) => {
  return String(input)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to check if it is a valid Password
const isValidPassword = (input) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
    input
  );
};

module.exports = {
  isAlphabetOnly,
  isNumericOnly,
  isValidEmail,
  isValidPassword,
  isAlphabetWithSpaceOnly,
};
