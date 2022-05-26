

export const CreateMenuFn = (FirstLevel, SecoundLevel) => {
  
  const CreateMenuObj = (FirstLevel) => {
    return (SecoundLevel) => {
      let menuArr = []
      for (let firstMenu of FirstLevel) {
         let subMenu = []
         for (let secoundMenu of SecoundLevel) {
           if (firstMenu.menuId === secoundMenu.parentId) {
             subMenu.push(secoundMenu)
           }
         }
         firstMenu['subMenu'] = subMenu 
         menuArr.push(firstMenu)
      }
      return menuArr
    }
  }
  
  return CreateMenuObj(FirstLevel)(SecoundLevel)

}







