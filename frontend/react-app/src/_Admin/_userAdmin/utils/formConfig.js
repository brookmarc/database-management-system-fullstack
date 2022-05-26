import Input from '../../../components/formFields/Input'
import Select from '../../../components/formFields/Select'

export const CreateInputFieldConfig = ({
  label,
  name, 
  type,
  optionList,
  defaultValue = "",
  placeholder="",
  children,
  classes = {}
}) => {
  return {
    renderInput: (
      handleChange,
      value,
      isValid,
      error,
      key
    ) => {
      return type === 'select' ? (
        <Select 
	  classes={classes}
	  key={key}
	  name={name}
	  label={label}
	  optionList={optionList}
	  isValid={isValid}
	  value={value || ""}
	  handleChange={handleChange}
	  errorMessage={error}
	  children={children}
	  placeholder={placeholder}
	/>
      ) : (
        <Input 
	  classes={classes}
	  key={key}
	  name={name}
	  type={type}
	  label={label}
	  isValid={isValid}
	  value={value || ""}
	  handleChange={handleChange}
	  errorMessage={error}
	  children={children}
	  placeholder={placeholder}
	/>
      )
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false
  };
}





