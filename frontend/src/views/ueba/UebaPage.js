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
  CToastHeader,
  CToastBody,
  CInputGroup,
  CFormInput,
  CButton,
  CAvatar,

} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { cilPeople } from '@coreui/icons'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { error_handling } from 'src/error_handling';

const UebaPage = () => {
  const [users, setUsers] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [toast, addToast] = useState(0)
  const [username, setInfluencer] = useState('');
  const toaster = useRef()

  const handleItemClick = (e) => {
    console.log(e);
    axios.post(process.env.REACT_APP_API_BASE_URL + `/influencer/add`, { "username": e })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        addToast(error_handling(error))
      })

  }
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + `/influencer`)
      .then(res => {
        console.log(res.data)
        setUsers(res.data.influencers)
      })
      .catch(error => {
        addToast(error_handling(error))
      })

  }, []);

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />

      <CInputGroup className="mb-3">
        <CFormInput onChange={e => setInfluencer(e.target.value)} placeholder="Aktör" aria-label="IP adresi" />
        <CButton onClick={() => handleItemClick(username)} >Ara</CButton>
      </CInputGroup>
      <CRow>

        <CCol md={12}>
          Influencer
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell> <CIcon icon={cilPeople} /></CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Statistics</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <CAvatar size="md" src={item.profile_image_url} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.username}</div>

                  </CTableDataCell>

                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">

                      </div>
                    </div>
                    <CProgress thin color="danger" value={item.followers_count} />
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

export default UebaPage
