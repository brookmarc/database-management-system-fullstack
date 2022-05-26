import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { observer, inject } from 'mobx-react'
import DropdownSelect from '../features/dropdown/dropdownSelect'
import styled from "styled-components"

const OptionMysqlDatabase = observer(({mysqlStore, handleSelect}) => {
  useEffect(() => {mysqlStore.fetchMysqlDB()}, [mysqlStore])
 
  const databaseArr = useMemo(() => mysqlStore.databaseList, [mysqlStore])
  const optionList = createOption(databaseArr)
  const [selected, setSelected] = useState(optionList[0])

  useEffect(() => {
    handleSelect(selected.value)
  }, [handleSelect, selected.value])

  return (
    <React.Fragment>
      <Styles>
	<DropdownSelect 
	  selected = {selected}
	  onSelectedChange = {setSelected}
	  options = {optionList}
	/>
      </Styles>
    </React.Fragment>
  )
})

export default inject(({mysqlStore}) => ({mysqlStore}))(OptionMysqlDatabase)


function createOption(arr) {
  let optionList = [
    {
      label: '选择数据库...',
      value: ''
    }
  ]
  for (let i in arr) {
    let tmpObj = {}
    tmpObj["label"] = arr[i]
    tmpObj["value"] = arr[i]
    optionList.push(tmpObj)
  }
  return optionList
}


const Styles = styled.section`

`

