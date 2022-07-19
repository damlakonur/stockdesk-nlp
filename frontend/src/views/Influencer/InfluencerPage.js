import React from 'react'
import {
  CCol,
  CCard,
  CRow,
  CCardImage,
  CWidgetStatsD,
  CListGroup,
  CCardLink,
  CCardBody,
  CCardText,
  CCardFooter,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CButton,
  CCardTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from './../../assets/images/react.jpg'
import { cibTwitter } from '@coreui/icons'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { error_handling } from 'src/error_handling'

const InfluencerPage = () => {
  const handleClick = (e) => {
    console.log(e)
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/influencer/getdetail`, { username: e })
      .then((res) => {
        console.log(res)
        setTweets(res.data.tweets)
        setStateHidden(false)
      })
  }
  const divStyle = {
    overflowY: 'scroll',
    width: '100%',
    float: 'left',
    height: '600px',
    position: 'relative',
  }

  const divStyle2 = {
    overflowY: 'scroll',
    width: '100%',
    float: 'left',
    height: '800px',
    position: 'relative',
  }

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
  /* TO DO : fix parsing function */
  const parseDate = (date) => {
    date_str = date.split(' ')
    day = date_str[0]
    month = date_str[1]
    dayN = date_str[2]
    time = date_str[3]
    year = date_str[5]
    result = day + ' ' + month + ' ' + dayN + ' ' + time + ' ' + year
    console.log(result)
    return result
  }

  return (
    <>
      <CRow>
        <CCol md={6}>
          <CCard>
            <CCardHeader title="Influencers">Influencers</CCardHeader>
            <CInputGroup className="mb-3">
              <CFormInput
                onChange={(e) => setInfluencer(e.target.value)}
                placeholder="Search Username"
              />
              <CButton onClick={() => handleClick(username)}>Search</CButton>
            </CInputGroup>
            <CCardBody>
              <div style={divStyle2}>
                <CRow>
                  {users.map((item, index) => (
                    <CCard style={{ width: '10rem' }}>
                      <CCardImage orientation="top" src={item.profile_image_url} />
                      <CCardBody>
                        <CCardText>{'@' + item.username}</CCardText>
                      </CCardBody>
                      <CCardBody>
                        <CButton onClick={() => handleClick(item.username)}>Detail</CButton>
                      </CCardBody>
                    </CCard>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard hidden={stateHidden}>
            <CCardHeader title="Influencers">Profile Details</CCardHeader>
            <CCardBody>
              {/*
              TO DO : Fix this
              <CWidgetStatsD
                className="mb-3"
                CCardImage={logo}
                icon={<CIcon className="my-4 text-white" icon={cibTwitter} height={52} />}
                style={{ '--cui-card-cap-bg': '#00aced' }}
                values={[
                  { title: 'followers', value: tweets[0].user.followers_count },
                  { title: 'tweets', value: tweets[0].user.statuses_count },
                  { title: 'favorites', value: tweets[0].user.favourites_count },
                ]}
              />
              */}
              <CCardTitle tag="h4">{'Recent Tweets'}</CCardTitle>
              <div style={divStyle}>
                <CRow>
                  {tweets.map((item, index) => (
                    <CCard>
                      <CRow>
                        <CCardText>
                          {'Post by @' + item.user.displayname + ' at ' + item.date}
                        </CCardText>
                      </CRow>
                      <CCardBody>{item.content}</CCardBody>
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

export default InfluencerPage
