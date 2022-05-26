

export const useTableSearchByKey = ({originalData, searchValue, searchKey}) => {
  let filteredData = []

  function makeFilterFn(dataObj, key=""){
    function filterFn(inputValue){
      // eslint-disable-next-line
      const filteredObj = dataObj.filter((obj) => {
	if (obj[`${key}`] !== undefined && obj[`${key}`] !== null) {
          return obj[`${key}`].toString().toLowerCase().includes(inputValue.toLowerCase())
	}
      })
      return filteredObj
    }
    return filterFn
  }

  if (searchKey !== "" && searchKey !== undefined){
    filteredData = []
    const newFilterData = makeFilterFn(originalData, searchKey)(searchValue)

    for (let obj of newFilterData) {
      filteredData.push(obj)
    }
  }
  
  return {filteredData}
}

