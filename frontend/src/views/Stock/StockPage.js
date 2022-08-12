import React from 'react'
import {
  CCol,
  CRow,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToaster,
  CInputGroup,
  CFormInput,
  CButton,
  CAvatar,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { cilPeople } from '@coreui/icons'
import logo from './../../assets/images/react.jpg'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { error_handling } from 'src/error_handling'

const StockPage = () => {
  const [toast, addToast] = useState(0)
  const [symbol, setSymbol] = useState('')
  const [stocks, setStocks] = useState([])
  const toaster = useRef()

  const handleItemClick = (e) => {
    console.log(e)
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/stock/add`, { symbol: e })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(e)
        addToast(error_handling(error))
      })
  }
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/stock`)
      .then((res) => {
        console.log(res.data)
        setStocks(res.data.stocks)
      })
      .catch((error) => {
        addToast(error_handling(error))
      })
  }, [])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />

      <CInputGroup className="mb-3">
        <CFormInput onChange={(e) => setSymbol(e.target.value)} placeholder="Username" />
        <CButton onClick={() => handleItemClick(symbol)}>Ara</CButton>
      </CInputGroup>
      <CRow>
        <CCol md={12}>
          Stock Symbol
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>
                  {' '}
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Statistics</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {stocks.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <CAvatar size="md" src={logo} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{'dsdfsdfsdfsdfs'}</div>
                  </CTableDataCell>

                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start"></div>
                    </div>
                    <CProgress thin color="danger" value={55} />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </>
  )
}

export default StockPage
