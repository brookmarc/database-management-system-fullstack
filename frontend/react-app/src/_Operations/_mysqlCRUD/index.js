import React, {Component} from 'react'
import styled from 'styled-components'
import ShowTableList from './showData'
import './mysqlCRUD.scss'


class MySqlCRUD extends Component{

  render() {
    return (
      <React.Fragment>
        <Styles>
          <main className='mysql-crud-main'>
            <ShowTableList />
          </main>
        </Styles>
      </React.Fragment>
    )
  }
}

export default React.memo(MySqlCRUD)


const Styles = styled.section`
  display: grid;
  grid-template-columns: 1fr 31fr;
  //grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    //"header header"
    "main main";
  //.main-header {grid-area: header; background: #191950; height: 50px;}
  //.main-aside { grid-area: aside; background: #191950;}
  //.main-container {grid-area: main; height: 700px;}
  .mysql-crud-main {grid-area: main;}
`
