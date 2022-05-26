

// ------ CREATE WHERE CONDITION FUNCTION ------->
export const createWhereStrFn = (updateOldData) => {
  return (selKeysArr) => {
    const whereStrFn = () => {
      let i = 0, str = ""
      const len = selKeysArr.length
      while (i < len) {
        let andStr = i !== len-1 ? (' and ') : ('')
        str += selKeysArr[i] + " = '" + updateOldData[selKeysArr[i]] + "'" + andStr
        i++
      }
      return str
    }

    const whereStr = selKeysArr.length !== 0 && selKeysArr.length !== undefined ? (
      selKeysArr.length === 1 ? (selKeysArr[0] + " = '" + updateOldData[selKeysArr[0]] + "'") : (
        whereStrFn()
      )
    ) : ('')
    
    return whereStr
  }
}
//const whereStrFn = createWhereStrFn(editData)

// --- END ---

