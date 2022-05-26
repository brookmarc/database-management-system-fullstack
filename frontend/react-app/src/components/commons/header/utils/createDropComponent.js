import { Link } from 'react-router-dom'

export const CreateDropComponentFn = () => {
  return function (dropMenuObj){
    let dropMenuList = []
    dropMenuObj.forEach((menu, index) => {
      return dropMenuList.push(
        <div className={`drop-menu-item-container ${menu.classes}`} key={index}>
	  <Link to={menu.link}>
	    <div className={`drop-menu-item-render`}>
	      <p>{menu.title}</p>
	    </div>
	  </Link>
	  <div className={`sub-menu-container`}>
	    {menu.subMenu.map((submenu, index) => {
              return (
                <div className={`sub-menu-item-box`} key={index}>
		  <Link to={submenu.link}>
		    <div className={`sub-menu-item-render`}>
		      <p>{submenu.title}</p>
		    </div>
		  </Link>
		</div>
	      )
	    })}
	  </div>
	</div>
      )
    })
    return dropMenuList
  }
}

export const createDropMenuList = CreateDropComponentFn()

