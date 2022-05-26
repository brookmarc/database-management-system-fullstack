import React from 'react'
import styled from 'styled-components'

const ExecuteComp = () => {
  return (
    <Executecomp>
      <h2>This is the execute HOC test components</h2>
    </Executecomp>
  )
}

export default ExecuteComp

const Executecomp = styled.main`
  h2 {
    color: black;
  }
`
