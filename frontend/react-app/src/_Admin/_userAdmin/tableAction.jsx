import React, { useState } from 'react'
import styled from 'styled-components'
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { observer } from 'mobx-react'
import AddUser from './components/addUser'
import UpdateUsername from './components/updateUsername'
import UpdateUserAccess from './components/updateUserAccess'
import DeleteUserBox from './components/deleteModal'
import UpdatePasswordBox from './components/updatePwdModal'
import DropdownSelect from '../../components/features/dropdown/dropdownSelect'


const options = [
  {
    label: '设置选择...',
    value: ''
  },
  {
    label: '变更用户名',
    value: 'updateUsername'
  },
  {
    label: '变更用户等级',
    value: 'updateAccess'
  }
]


const TableActions = observer(({ setExpand, userData }) => {
  const [selected, setSelected] = useState(options[0])
  const updateType = selected.value

  const [state, setState] = useState({ selectedIndex: 0})
  const handleSelect = index => { setState({selectedIndex: index })}


  let usernameArr = []
  userData.forEach(element => {
    usernameArr.push(element.username)
  })


  const [openMore, setOpenMore] = useState(false)
  const handleOpenMore = () => {
    openMore === false ? (setOpenMore(true)) : (setOpenMore(false))
  }
  const handleCloseMore = () => {
    setOpenMore(false)
  }

  const UpdateOption = () => {
    if (updateType === "" || updateType === undefined) {
      return null
    } else if (updateType === "updateUsername") {
      return <UpdateUsername unameList={usernameArr} setUpdateAction={setSelected} />
    } else if (updateType === "updateAccess") {
      return <UpdateUserAccess unameList={usernameArr} setUpdateAction={setSelected} />
    }
  }


  return (
    <React.Fragment>
      <Styles>
	<Tabs
	  selectedIndex={state.selectedIndex}
	  onSelect={handleSelect}
	>
	  <TabList className="tabLists">
            <Tab
	      className={state.selectedIndex === 0 ? "tabs active-tabs" : "tabs"}
	    >
	      <div className="tab-btn">
	        <Button><GroupAddIcon /><p>新增用户</p></Button>
	      </div>
	    </Tab>
	    <Tab
	      className={state.selectedIndex === 1 ? "tabs active-tabs" : "tabs"}
	    >
	      <div className="tab-btn">
	        <Button><SettingsIcon /><p>用户设置</p></Button>
	      </div>
	    </Tab>
	  </TabList>
	  <TabPanel className="tabPanel"><AddUser userData={userData} /></TabPanel>
	  <TabPanel className="tabPanel">
	    <section className="modify-opt-box">
	      <DropdownSelect 
	        selected={selected}
	        onSelectedChange={setSelected}
	        options={options}
	      />
	      <section className="modify-more">
	        <div className="modify-more-btn">
	          {openMore === false ? (
                     <Button onClick={handleOpenMore}>
			更多设置<MoreHorizIcon /><UnfoldMoreIcon />
		     </Button>
		  ) : (
                     <Button onClick={handleOpenMore}>更多设置<UnfoldLessIcon /></Button>
		  )}
	        </div>
	        {openMore === true ? (
		  <div className="modify-more-modal" onClick={handleCloseMore}>
		    <div className="modify-more-opt" onClick={e => e.stopPropagation()}>
                      <section className="modify-more-box">
		        <ul>
		          <li className="user-setting"><div>用户设置</div></li>
		          <li><div><UpdatePasswordBox closeMore={handleCloseMore} /></div></li>
		          <li><div><DeleteUserBox closeMore={handleCloseMore} /></div></li>
		        </ul>
		      </section>
		    </div>
		  </div>
		) : null}
	      </section>
	    </section>
	    {UpdateOption()}
	  </TabPanel>
	</Tabs>
      </Styles>
    </React.Fragment>
  )
})

export default React.memo(TableActions)


const Styles = styled.section`
  .tabLists {
    display: flex;
    list-style: none;
    li {
      padding: 5px 7px;
      margin: 3px 5px 10px 5px;
      border-radius: 3px;
    }
  }
  .tabPanel {
    margin: 5px;
  }
  .tabs {
    button {
      box-shadow: 2px 3px #262222;
      color: #aba6a6;
    }
  }
  .tab-btn {
    p {
      margin: .2rem 0 0 .2rem;
    }
  }
  .active-tabs {
    button {
      box-shadow: 2px 3px #312929;
      color: #a7b0be;
      background: #504242;
    }
  }
  .update-opt {
    label {
      font-size: 1.1rem;
    }
    select {
      margin: .3rem .6rem;
      height: 2.1rem;
      width: 13rem;
      font-size: 1rem;
      background: #2a2a2c;
      color: #aea7a6;
      border: 1px solid #2a2a2c;
      border-radius: .1rem;
      padding-left: .3rem;
      font-family: "Roboto","Arial",sans-serif;
      font-weight: 300;
    }
    select:hover {
      background: #403331;
      border: 1px solid #403331;
    }
  }
  .modify-opt-box {
    display: flex;
    .modify-more {
      position: relative;
      .modify-more-btn {
        button {
	  color: #aba6a6;
	  box-shadow: 2px 3px #262222;
	}
      }
      .modify-more-opt {
        position: absolute;
        background: #f6f5f5;
	color: #000;
	top: 16.7rem;
	left: 16.5rem;
	z-index: 3;
	width: 15rem;
	border-radius: .1rem;
	box-shadow: 1px 2px #989ba0;
	.modify-more-box {
	  ul > li {
            text-decoration: none;
	    list-style-type: none;
	    border-bottom: 1px solid #d4c3c3;
	    padding: .7rem;
	    &:last-child {
              border-bottom: none;
	    }
	    &:hover {
              background: #e5e5e0;
	    }
	    button {
              color: #19191a;
	    }
	  }
	  ul {
            padding: .1rem;
	  }
	}
      }
    }
  }
  .modify-more-btn {
    background: #3a3a3c;
    margin-left: 1.3rem;
  }
  .modify-more-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .input-container {
    width: 93%;
    margin: 3% 0 0 3%;
    .input-form {
      position: relative;
      margin-bottom: .5rem;
      input, select {
        background: #ff2;
	padding-left: .9rem;
	font-size: 1.1rem;
	background: #564c4b;
	box-shadow: 2px 3px #393636;
	color: #f7ecec;
	outline: none;
	border: none;
	border-radius: .2rem;
        margin-top: .3rem;
      }
    }
    .input-form input {
      width: 100%;
      height: 2.1rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
    }
    .input-form select {
      width: 59%;
      height: 2.7rem;
      margin-left: .3rem;
    }
    .error-messages {
      p {
        color: red;
      }
      p:before {
        display: inline;
	content: "⚠ ";
      }
    }
    .invalid-icon {color: #dcc12f;}
    .valid-icon {color: #33cf5a;}
  }
  .form-btn {
    margin: 3% 0 0 3%;
    input {
      width: 7.5rem;
      height: 2.7rem;
      color: #dcd0d0;
      background: #1d3c63;
      box-shadow: 2px 3px #312929;
      font-size: 1.3rem;
      border: 1px solid #1d3c63;
      border-radius: .3rem;
    }
    input:hover {
      background: #3b526f;
      border: 1px solid #3b526f;
      cursor: pointer;
    }
  }
  .form-icon {
    position: absolute;
    top: .9rem;
    right: 1.3rem;
  }
  .toggle-icon {
    position: absolute;
    top: .9rem;
    right: 3rem;
  }
  .toggle-btn {
    button { 
      background: none; 
      border: none;
    }
    button:hover {
      cursor: pointer;
    }
  }

  .custom-selection-dropdown {
    width: 15rem;
    font-size: 1.1rem;
    color: #aba6a6;
    .custom-select-box {
      border: 1px solid #3a3a3c;
      height: 2rem !important;
      width: 14.5rem !important;
      border-radius: .3rem;
      background: #3a3a3c;
      box-shadow: 2px 3px #262222;
      padding-top: .3rem;
      .custom-select-text: hover {
        //background-color: rgba(25, 118, 210, 0.04);
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
  .custom-select-menu {
    width: 15rem;
    padding: .5rem 0;
  }

  .user-setting {
    &:hover {
      cursor: default;
      background: #f6f5f5 !important;
    }
  }
`

