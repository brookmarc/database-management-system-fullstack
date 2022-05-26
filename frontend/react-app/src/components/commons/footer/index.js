import React from 'react'
import styled from 'styled-components'

const Footercomponent = styled.footer`
  .footer-box{ 
    //margin-top: 38px;
    //background: #A9A9A9;  
    background: #f70505;
    //background: #111;
    color: #d1d1d3;
    font-family: "Roboto","Arial",sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    height: 57px; 
    p {
      padding-top: 15px;
    }
  }
`

const Footer = () =>{
  return (
    <React.Fragment>
      <Footercomponent>
        <div className='footer-box center'><p>© COMPANY ALL Rights Reserved</p></div>
      </Footercomponent>
    </React.Fragment>
  )
}

export default Footer
