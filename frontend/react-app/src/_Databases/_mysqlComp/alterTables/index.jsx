import React, { useState } from "react"
import styled from 'styled-components'
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import AddNewfield from "./addNewfield"
import DropField from "./dropField"
import ModifyField from "./modifyField"
import RenameField from "./renameField"
import ChangeField from "./changeField"


const AlterTableTabs = ({tablename, fieldList}) => {
  const [ state, setState ] = useState({selectedIndex: 0})
  const handleSelect = index => {
    setState({ selectedIndex: index })
  }

  return (
    <React.Fragment>
      <Altertable>
	<div className="alter-header">
	  <h3>MySQL表格通用设置:</h3>
	  <p>当前表格: <span className="header-em">{tablename}</span></p>
	</div>
        <Tabs
          selectedIndex={state.selectedIndex}
          onSelect={handleSelect}
        >
          <TabList className="tabLists">
            <Tab className={state.selectedIndex === 0 ? "tabs active-tabs" : "tabs"}>新增字段</Tab>
            <Tab className={state.selectedIndex === 1 ? "tabs active-tabs" : "tabs"}>删除字段</Tab>
            <Tab className={state.selectedIndex === 2 ? "tabs active-tabs" : "tabs"}>修改字段</Tab>
            <Tab className={state.selectedIndex === 3 ? "tabs active-tabs" : "tabs"}>重命名字段</Tab>
            <Tab className={state.selectedIndex === 4 ? "tabs active-tabs" : "tabs"}>变更字段</Tab>
          </TabList>
          <TabPanel className="tabPanel">
	    <AddNewfield tablename={tablename} fieldList={fieldList} />
          </TabPanel>
          <TabPanel className="tabPanel">
	    <DropField tablename={tablename} fieldList={fieldList}/>
          </TabPanel>
          <TabPanel className="tabPanel">
	    <ModifyField tablename={tablename} fieldList={fieldList}/>
          </TabPanel>
          <TabPanel className="tabPanel">
	    <RenameField tablename={tablename} fieldList={fieldList}/>
          </TabPanel>
          <TabPanel className="tabPanel">
	    <ChangeField tablename={tablename} fieldList={fieldList}/>
          </TabPanel>
        </Tabs>
      </Altertable>
    </React.Fragment>
  )
}

export default React.memo(AlterTableTabs)


const Altertable = styled.section`
  font-family: Arial;
  .alter-header {
    margin-bottom: 3px;
    margin-left: 3px;
    h3 {
      font-size: 19px;
      color: #caa3a3;
      font-weight: bold;
    }
    p {
      font-size: 15px;
      color: #7a6e6e;
    }
    .header-em {
      color: #d7cbcb;
    }
  }
  .tabLists {
    display: flex;
    list-style: none;
    color: #c6b1b1;
    li {
      padding: 5px 7px;
      margin: 3px 5px 10px 5px;
      border-radius: 3px;
      font-weight: bold;
    }
    li:hover {
      cursor: pointer;
      color: #d0cbcb;
    }
  } 
  .tabPanel {
    color: #dbd7d7;
    margin: 5px;
    h1 { font-size: 17px; }
  }

  .tabs {
    background: #6d4c4c;
    border: 1px solid #6d4c4c;
    box-shadow: 1px 2px #441010;
  }

  .active-tabs {
    background: #4a3d3d;
    color: #d0caca;
    border: 1px solid #4a3d3d;
    //box-shadow: 2px 3px #4e4f56;
  }

  .tabPanel {
    .form-box {
      margin: 15px 0 15px 0;
    }
    .input-container {
      .input-form {
        margin: 5px 0 5px 0;
	font-size: 17px;
	label {
          color: #d7b6b6;
	}
	input {
	  padding: 5px;
	  font-family: Arial;
	  font-size: 17px;
	  background-color: #524d4d;
	  border: 1px solid #4e4e53;
	  vertical-align: middle;
	  margin: 3px 5px 3px 10px;
	  width: 300px;
	  color: #eae5e5;
	  border-radius: 3px;
	}
	select {
	  font-family: Arial;
	  font-size: 17px;
          width: 270px;
	  height: 33px;
	  color: black;
	  margin: 3px 5px 3px 10px;
	  background-color: #524d4d;
	  border: 1px solid #4e4e53;
	  color: #eae5e5;
	  border-radius: 3px;
	}
	textarea {
	  padding: 5px;
	  font-size: 17px;
	  background-color: #524d4d;
	  border: 1px solid #4e4e53;
	  vertical-align: middle;
	  margin: 3px 5px 3px 10px;
	  width: 280px;
	  color: #eae5e5;
	  border-radius: 3px;
	}
      }
    }
    .input-btn {
      button {
        padding: 8px 13px;
	background-color: #3b4753;
	border: 1px solid #3b4753;
        box-shadow: 1px 2px #441010;
	color: #dfd5d5;
	font-size: 17px;
      }
      button:hover {
	cursor: pointer;
	background-color: #2e3843;
	border: 1px solid #2e3843;
      }
    }
  }

`

