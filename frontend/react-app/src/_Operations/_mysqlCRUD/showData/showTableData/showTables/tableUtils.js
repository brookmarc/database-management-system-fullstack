
let input_Arr = []
let input_var = []
export function getColumns(data_input) {
  input_var = Object.values(data_input).slice(0, 1).[0]
  input_Arr = []
  if (Array.isArray(input_var) && input_var !== undefined) {
    for (let data of input_var) {
      input_Arr.push(data)
    }
  }
  
  let columns = []
  if (Array.isArray(input_Arr) && input_Arr.length !== 0) {
    columns = []
    input_Arr.forEach((key, i) => {
      columns.push({
        accessor: key,
        Header: key,
	_id: `col_${key}_${i}`
      })
    })
  }

  return columns
}



