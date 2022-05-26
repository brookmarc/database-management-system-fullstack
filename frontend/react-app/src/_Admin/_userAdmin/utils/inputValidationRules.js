
function createValidationRule(ruleName, errorMessage, validateFunc) {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc
  }
}

export function requireRule(inputName) {
  return createValidationRule(
    "required",
    `${inputName} required`,
    (inputValue, formObj) => inputValue.length !== 0
  );
}


export function minLengthRule(inputName, minCharacters) {
  return createValidationRule(
    "minLength",
    `${inputName} must exceed at ${minCharacters}`,
    (inputValue, formObj) => inputValue.length >= minCharacters
  )
}

export function maxLengthRule(inputName, maxCharacters) {
  return createValidationRule(
    "maxLength",
    `${inputName} cannot contain more than ${maxCharacters}`,
    (inputValue, formObj) => inputValue.length <= maxCharacters
  )
}

export function newPwdNotSameRule() {
  return createValidationRule(
    "newPwdNotSame",
    "New password cannot be same as old password!",
    (inputValue, formObj) => inputValue !== formObj.oldPassword.value
  )
}

export function passwordMatchRule() {
  return createValidationRule(
    "passwordMatch",
    `passwords do not match!`,
    (inputValue, formObj) => inputValue === formObj.password.value
  )
}

export function usernameIncludeRule(unameList) {
  return createValidationRule(
    "usernameInclude",
    "Username doesn't not exist!",
    (inputValue, formObj) => {
      if (unameList.includes(inputValue)) {
        return true
      } 
      return false
    }
  )
}


export function unameNotIncludeRule(unameList) {
  return createValidationRule(
    "unameNotInclude",
    "This username already exist!",
    (inputValue, formObj) => {
      if (unameList.includes(inputValue)) {
        return false
      } 
      return true
    }
  )
}


