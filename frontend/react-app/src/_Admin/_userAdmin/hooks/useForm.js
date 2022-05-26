import { useState, useCallback, useMemo } from "react"

const useForm = (formObj, initialState = {}) => {
  const formObjData = useMemo(() => formObj, [formObj])
  const [form, setForm] = useState(formObjData)
  const [data, setData] = useState(initialState)
  const formData = form !== undefined ? (Object.values(form)) : (Object.values({}))
  
  const renderFormInputs = useCallback(() => {
    return formData.map((inputObj) => {
      const {value, label, errorMessage, valid, renderInput} = inputObj;

      return renderInput(onInputChange, value, valid, errorMessage, label)
    });
  // eslint-disable-next-line
  }, [formData])

  const isInputFieldValid = useCallback(
    (inputField) => {
      for(const rule of inputField.validationRules) {
        if (!rule.validate(inputField.value, form)) {
          inputField.errorMessage = rule.message;
	  return false
	}
      }
      return true;
    },
    [form]
  );
  
  const onInputChange = useCallback(
    (event) => {
       const {name, value} = event.target;
       const inputObj = { ...form[name]} // copy input object whose value was changed
       inputObj.value = value // update value

       // update input field's validity
       const isValidInput = isInputFieldValid(inputObj) 

       // If input is valid and it was previously set to invalid 
       // then set its valid status to true
       if (isValidInput && !inputObj.valid) {
         inputObj.valid = true;
       } else if (!isValidInput && inputObj.valid) {
         inputObj.valid = false;
       }

       // mark input field as touched
       inputObj.touched = true;
       setForm({ ...form, [name]: inputObj })

       const inputValues = {...data, [name]: inputObj.value}
       setData(inputValues)
    },
    [form, isInputFieldValid, data]
  )


  const isFormValid = useCallback(
    () => {
      let isValid = true;
      //const arr = Object.values(form)
      const arr = formData

      for (let i=0; i < arr.length; i++) {
        if (!arr[i].valid) {
          isValid = false;
          break;
	}
      }
      return isValid
    }, 
    [formData]
  )

  //const onSubmitData = () => {
  //}

  return { data, setData, renderFormInputs, isFormValid}
}

export default useForm;

