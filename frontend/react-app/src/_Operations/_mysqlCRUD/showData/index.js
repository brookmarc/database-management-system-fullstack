import React from 'react'
import styled from 'styled-components'
import SelectTable from './selectTable'

const ShowTableList = () => {
  return (
    <React.Fragment>
      <Showtablelist>
        <main>
	  <SelectTable />
	</main>
      </Showtablelist>
    </React.Fragment>
  )
}

export default React.memo(ShowTableList)

const Showtablelist = styled.section``
