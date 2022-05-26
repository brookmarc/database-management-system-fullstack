import styled from "styled-components"

export const DropdownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`

export const StyledSelect = styled.select`
  max-width: 50%;
  height: 100%;
  padding: .5rem;
  margin-bottom: 1rem;
`

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")}
`

export const StyledLabel = styled.label`
  margin-bottom: 1rem;
`

export const StyledButton = styled.input`
  max-width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: solid 2px blue;
  padding: .5rem;
  border-radius: 1rem;
`


export function Dropdown(props) {
  return (
    <>
    <DropdownWrapper action={props.action}>
      {props.formLabel}
    <StyledSelect id="services" name="services">
      {props.children}
    </StyledSelect>
    </DropdownWrapper>
    </>
  )
}

export function Option(props) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  )
}


