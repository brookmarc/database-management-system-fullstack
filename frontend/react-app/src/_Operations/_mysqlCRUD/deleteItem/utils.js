
export const WithKeyWhereFn = (keyField) => {
  return (selectedDataArr) => {
    let i=0, str ="", whereStr =""
    const len = selectedDataArr.length
    while (i < len) {
      let splitStr = i !== len - 1 ? (", ") : ("")
      str += "'" + selectedDataArr[i] + "'" + splitStr
      i++
    }
    //whereStr = " WHERE " + keyField + " IN (" + str + ")"
    whereStr = keyField + " IN (" + str + ")"

    return whereStr
  }
}


export const WithoutKeyWhereFn = (multiKeys, selectedRowsData) => {
  let i = 0, multiFieldStr = ""
  let selectedData = [], selectedStr = ""
  let whereConditionStr = ""
  let multiFieldLen = multiKeys.length

  while (i < multiFieldLen) {
    let splitStr = i !== multiFieldLen - 1 ? (", ") : ("")
    multiFieldStr += multiKeys[i] + splitStr 
    i ++
  }

  const selectedRowDataFn = (selectedRowDataObj) => {
    for (let rowData of selectedRowDataObj) {
      let rowDataArr = []
      for (let key of multiKeys) {
        rowDataArr.push(rowData[key])
      }
      selectedData.push(rowDataArr)
    }
  }

  const createSelectedStr = (selDataArr) => {
    let selDataArrLen = selDataArr.length
    let j = 0
    for (j = 0; j < selDataArrLen; j++) {
      let k = 0
      let tmpStr = ""
      let splitStr_j = j !== selDataArrLen - 1 ? (", ") : ("")
      for (k = 0; k < selDataArr[j].length; k++) {
        let splitStr_k = k !== selDataArr[j].length - 1 ? (", ") : ("")
        tmpStr += "'" + selDataArr[j][k] + "'" + splitStr_k
      }
      selectedStr += "(" + tmpStr + ")" + splitStr_j
    }
  }

  return () => {
    selectedRowDataFn(selectedRowsData)
    createSelectedStr(selectedData)
    //whereConditionStr = " WHERE" + " ("+multiFieldStr+") "+"IN"+" ("+selectedStr+") "
    whereConditionStr = ` (${multiFieldStr}) IN (${selectedStr}) `
    //whereConditionStr = " ("+multiFieldStr+") "+"IN"+" ("+selectedStr+") "

    return whereConditionStr
  }

}



