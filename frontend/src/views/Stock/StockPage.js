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
  CCardFooter,
} from '@coreui/react'
import logo from './../../assets/images/react.jpg'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { error_handling } from 'src/error_handling'

const StockPage = () => {
  /*get data from mongodb*/
  const [users, setUsers] = useState([])
  const [hosts, setHosts] = useState([])
  const [toast, addToast] = useState(0)
  const [username, setInfluencer] = useState('')
  const toaster = useRef()
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/influencer`)
      .then((res) => {
        console.log(res.data)
        setUsers(res.data.influencers)
      })
      .catch((error) => {
        addToast(error_handling(error))
      })
  }, [])
  return (
    <>
      <CRow>
        <CCol>
          <h1>Stock Page</h1>
        </CCol>
      </CRow>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {users.map((item, index) => (
          <CCol xs>
            <CCard style={{ width: '18rem' }}>
              <CCardImage orientation="top" src={item.profile_image_url} />
              <CCardBody>
                <CCardTitle>{item.username}</CCardTitle>
                <CCardText>{item.name}</CCardText>
              </CCardBody>
              <CListGroup flush>
                <CListGroupItem>{item.followers_count}</CListGroupItem>
                <CListGroupItem>{item.location}</CListGroupItem>
                <CListGroupItem>Vestibulum at eros</CListGroupItem>
              </CListGroup>
              <CCardBody>
                <CCardLink href="#">Card link</CCardLink>
                <CCardLink href="#">Another link</CCardLink>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default StockPage
