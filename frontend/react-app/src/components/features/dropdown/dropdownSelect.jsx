import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const DropdownSelect = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    document.body.addEventListener('click', event => {
    //const el = document.getElementById('custom-select-form')
    //el.addEventListener('click', event => {
      if (ref.current && ref.current.contains(event.target)) {
        return
      }
      setOpen(false)
    })
    document.body.removeEventListener('click', (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return
      }
      setOpen(false)
    })
  }, [])

  const renderedOptions = options.map((option, i) => {
    return (
      <div
	 key={option.value + i}
	 className="select-option-item"
	 onClick={(e) => {
	   e.preventDefault()
	   onSelectedChange(option)
	   }
	 }
      >
	{option.label}
      </div>
    )
  })
  return (
    <React.Fragment>
    <Styles>
    <section ref={ref} className="custom-select-form" id="custom-select-form">
      <div className="custom-select-field">
	<div
	  onClick={(e) => {
	    e.preventDefault()
	    setOpen(!open)
	    }
	  }
	  className={`custom-selection-dropdown ${open ? 'visible active' : ''}`}
	>
	  <section className="custom-select-box">
	    <div className="custom-select-text">
	      <div><p>{selected.label}</p></div>
	      <div><i className="dropdown icon">
	        {!open? <ArrowDropDownIcon /> : <ArrowDropUpIcon/> }
	      </i></div>
	    </div>
	  </section>
	  <div className={`custom-select-menu ${open ? 'custom-select-visible' : 'visible-hidden'}`}>
	    {renderedOptions}
	  </div>
	</div>
      </div>
    </section>
    </Styles>
    </React.Fragment>
  )
} 


export default DropdownSelect

const Styles = styled.div`
  .custom-select-form{
    font-family: "Roboto","Arial",sans-serif;
    font-size: 1.2rem;
    .custom-select-field {
      .custom-selection-dropdown {
	position: relative;
        .custom-select-box {
	}
	.custom-select-menu {
          postion: absolute;
	}
	.custom-select-text {
          padding-left: .3rem;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	}
      }
    }
  }
  .custom-select-visible {
    display: block;
    background: #f2efef;
    color: #111;
    position: absolute;
    z-index: 1000;
  }
  .visible-hidden {
    display: none;
  }
  .select-option-item {
    padding: .3rem .5rem;
    &:hover {
      cursor: default;
      background: #fbfb00;
    }
    &:first-child {
      color: #8f8f91;
      &:hover {
        cursor: not-allowed;
        background: none;
      }
    }
  }
  .icon > svg {
  }
`


