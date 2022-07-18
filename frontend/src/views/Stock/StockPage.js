import React from 'react'
import {
  CCol,
  CCard,
  CRow,
  CCardImage,
  CCardTitle,
  CListGroupItem,
  CListGroup,
  CCardLink,
  CCardBody,
  CCardText,
} from '@coreui/react'
import logo from './../../assets/images/react.jpg'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { error_handling } from 'src/error_handling'

const StockPage = () => {
  return (
    <>
      <CRow>
        <CCol>
          <h1>Stock Page</h1>
        </CCol>
      </CRow>
      <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={logo} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </CCardText>
        </CCardBody>
        <CListGroup flush>
          <CListGroupItem>Cras justo odio</CListGroupItem>
          <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
          <CListGroupItem>Vestibulum at eros</CListGroupItem>
        </CListGroup>
        <CCardBody>
          <CCardLink href="#">Card link</CCardLink>
          <CCardLink href="#">Another link</CCardLink>
        </CCardBody>
      </CCard>
    </>
  )
}

export default StockPage
