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
  CCardHeader,
  CButton,
} from '@coreui/react'
import logo from './../../assets/images/react.jpg'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { error_handling } from 'src/error_handling'

const StockPage = () => {
  const handleClick = (e) => {
    console.log(e)
    axios.post(process.env.REACT_APP_API_BASE_URL + `/influencer/getdetail`, { username: e }).then((res) => {
      console.log(res)
      setTweets(res.data.tweets)
      setStateHidden(false)

    })
  }

  // const handlePhoto = (e) => {
  //   // let a = e.entities.urls[0].expanded_url + "/photo/1"
  //   let a = "https://twitter.com/" + e.user.screen_name + "/status/" + e.id_str + "/photo/1"
  //   console.log(a)
  //   return a

  // }


  const divStyle = {
    overflowY: 'scroll',
    width: '100%',
    float: 'left',
    height: '600px',
    position: 'relative',

  };
  /*get data from mongodb*/
  const [users, setUsers] = useState([])
  const [hosts, setHosts] = useState([])
  const [toast, addToast] = useState(0)
  const [username, setInfluencer] = useState('')
  const [tweets, setTweets] = useState([])
  const [stateHidden, setStateHidden] = useState(true)

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
        <CCol md={6}>
          <CCard>
            <CCardHeader
              title="Influencers"
            >
              Influencers
            </CCardHeader>
            <CCardBody>
              <div style={divStyle}>
                <CRow>
                  {users.map((item, index) => (

                    <CCard style={{ width: '10rem' }}>
                      <CCardImage orientation="top" src={item.profile_image_url} />
                      <CCardBody >

                        <CCardTitle>{item.username}</CCardTitle>
                        <CCardText>{item.name}</CCardText>
                      </CCardBody>
                      <CListGroup flush>
                        <CListGroupItem>{item.followers_count}</CListGroupItem>
                        <CListGroupItem>{item.location}</CListGroupItem>
                      </CListGroup>
                      <CCardBody>
                        <CButton onClick={() => handleClick(item.username)}>Detail</CButton>
                        <CCardLink href="#">Another link</CCardLink>
                      </CCardBody>
                    </CCard>

                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard hidden={stateHidden} >
            <CCardHeader
              title="Influencers"
            >
              Profile Details
            </CCardHeader>
            <CCardBody>
              <div style={divStyle}>
                <CRow>
                  {tweets.map((item, index) => (
                    <CCard style={{ width: '10rem' }}>
                      {/* <CCardImage orientation="top" src={handlePhoto(item)} /> */}
                      <CCardBody >
                        {item.text}
                      </CCardBody>

                    </CCard>



                  ))}

                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>



    </>
  )
}

export default StockPage
