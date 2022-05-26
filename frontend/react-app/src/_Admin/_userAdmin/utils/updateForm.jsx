import {CreateInputFieldConfig} from './formConfig'
import {
  requireRule,
  minLengthRule,
  maxLengthRule,
  //newPwdNotSameRule,
  //passwordMatchRule,
  usernameIncludeRule,
  unameNotIncludeRule,
} from './inputValidationRules'



const createunameObj = (unameList) => {
  return {
    username: {
      ...CreateInputFieldConfig({
         label: "用户名", 
         name: "username", 
         type: "text",
         defaultValue: "", 
         placeholder: "请输入需变更的用户名...", 
         classes: {inputContainer: "input-container", inputForm: "input-form", inputError: "error-messages" }
      }),
      validationRules: [
        requireRule("Username"),
        minLengthRule("Fullname", 3),
        maxLengthRule("Fullname", 25),
	usernameIncludeRule(unameList)
      ]
    }
  }
}


const accessLevelObj = {
  accesslevel: {
    ...CreateInputFieldConfig({
      label: "新用户等级",
      name: "accesslevel",
      defaultValue: '',
      type: 'select',
      optionList: {'-- 选择 --': '',超级用户: '0', 管理员: '1', 普通用户: '2'},
      classes: {inputContainer: "input-container", inputForm: "input-form", inputError: "error-messages" }
    }),
    validationRules: [
      requireRule("New Access Level"),
    ]
  }
}


// Update username
function UpdateUsernameWrapper() { 
  const UpdateUsernameForm = (unameList) => {
    const newUsernameObj = {
      newusername: {
        ...CreateInputFieldConfig({
          label: "新用户名",
  	name: "newusername",
  	type: "text",
	placeholder: "请输入新用户名...",
          classes: {inputContainer: "input-container", inputForm: "input-form", inputError: "error-messages" }
        }),
        validationRules: [
          requireRule("New Username"),
  	minLengthRule("Fullname", 3),
  	maxLengthRule("Fullname", 25),
  	unameNotIncludeRule(unameList)
        ]
      }
    }
  
    const usernameObj = createunameObj(unameList)
  
    const formObj = { ...usernameObj, ...newUsernameObj}
  
    return formObj
  
  }
  return UpdateUsernameForm
}

export const UpdateUsernameForm = UpdateUsernameWrapper()

// Update Access Level
function UpdateAccessWrapper(){
  const UpdateAccessForm = (unameList) => {
    const usernameObj = createunameObj(unameList)
  
    const updateAccessObj = { ...usernameObj, ...accessLevelObj}
  
    return updateAccessObj
  }
  return UpdateAccessForm
}

export const UpdateAccessForm = UpdateAccessWrapper()




