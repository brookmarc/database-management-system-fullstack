import React from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import { observer } from "mobx-react"
import { tableStore } from "../mst/tablemodelStore"
import AlterTableTabs from "../alterTables"
import AdvancedModifyTable from "../advancedTable"
import MysqlTableConfig from "../configTables"


const ShowTables = observer(({tablename, setTbname, currMysqlDB}) => {
  
  const tbname = tablename

  useEffect(() => {
    tableStore.fetchModel(tbname)
    tableStore.fetchTableInfo(tbname)
  }, [tbname])


  const tableModel = useMemo(() => tableStore.tableModel, [])

  let fieldArr = []
  tableModel.forEach(item => {
    fieldArr.push(item.Field)
  })

  const tableInfo = tableStore.tableInfo

  let tableInfoArr
  tableInfo.forEach(item => {
    tableInfoArr = item.createTable.split("\n")
  })

  const tableInfoList = (tableInfoArr !== undefined) ? tableInfoArr : ['No data']

  const showTableInfo = []
  tableInfoList.forEach((item, i) => {
    showTableInfo.push(<p key={i}>{item}</p>)
  })


  return (
    <React.Fragment>
      <Tablemodels>
        <main className="table-show-box">
	  <>
	  <section className="table-show-container">
	    <table className="table-section">
              <thead className="tb-head">
                <tr className="table-head-tr">
                  <th>Field字段名</th>
                  <th>Type类型</th>
                  <th>Null值</th>
                  <th>Key值</th>
                  <th>Default默认</th>
                  <th>Extra附加值</th>
                </tr>
              </thead>
              <tbody className="tb-body">
                {tableModel.map((model, i) => (
                  <tr className="table-body-tr" key={i}>
                    <td>{model.Field}</td>
                    <td>{model.Type}</td>
                    <td>{model.Null}</td>
                    <td>{model.Key}</td>
                    <td>{model.Default}</td>
                    <td>{model.Extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
	  </section>
	  </>
	  <>
	  <section className="table-advanced">
            <AdvancedModifyTable tablename={tbname} setTbname={setTbname} />
	  </section>
	  </>
	  <>
	  <section className="table-info">
	    <div className="table-info-header"><p>创建表格信息如下:</p></div>
	    <div className="table-info-box">{showTableInfo}</div>
	  </section>
	  </>
	</main>
	<section className="table-action">
	  <AlterTableTabs tablename={tbname} fieldList={fieldArr} />
	</section>
	<section className="table-config">
	  <MysqlTableConfig tablename={tbname} fieldList={fieldArr} currMysqlDB={currMysqlDB} />
	</section>
      </Tablemodels>
    </React.Fragment>
  )
})

export default React.memo(ShowTables)


const Tablemodels = styled.section`
  background: #463c3c;
  padding: 15px 0 25px 10px;
  display: flex;
  .table-show-box {
    width: 40%;
    color: #dbd7d7;
    .table-section {
      border-spacing: 0;
    }
    .table-head-tr th {
      padding: 8px;
      border-bottom: 1px dashed;
      font-family: "Gill Sans" sans-serif;
      font-size: 17px;
    }
    .table-body-tr td {
      padding: 5px 8px;
      font-family: Arial;
      font-size: 17px;
    }
    .table-body-tr:last-child td{
      border-bottom: 1px dashed;
    }
  }
  .table-advanced {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .table-action {
    width: 40%;
  }
  .table-info {
    .table-info-header {
      margin-bottom: 7px;
      font-size: 19px;
      color: #caa3a3;
      font-weight: bold;
      font-family: Arial;
    }
  }
  .table-config {
    width: 20%;
  }
`

