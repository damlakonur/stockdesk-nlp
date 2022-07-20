import React from 'react'
import {
  CCol,
  CCard,
  CRow,
  CCardImage,
  CWidgetStatsD,
  CAvatar,
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
import { margin } from '@mui/system'

const InfluencerPage = () => {
  const handleClick = (e) => {
    console.log(e)
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/influencer/getdetail`, { username: e })
      .then((res) => {
        console.log(res)
        setTweets(res.data.tweets)
        setFavCount(res.data.user.favouritesCount)
        setStatusCount(res.data.user.statusesCount)
        setFollowerCount(res.data.user.followersCount)
        setStateHidden(false)
      })
  }
  /*get data from mongodb*/
  const [users, setUsers] = useState([])
  const [toast, addToast] = useState(0)
  const [username, setInfluencer] = useState('')
  const [tweets, setTweets] = useState([])
  const [stateHidden, setStateHidden] = useState(true)
  const [favCount, setFavCount] = useState(0)
  const [statusCount, setStatusCount] = useState(0)
  const [followerCount, setFollowerCount] = useState(0)

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
  const divStyle = {
    overflowY: 'scroll',
    width: '100%',
    float: 'left',
    height: '600px',
  }

  const divStyle2 = {
    overflowY: 'scroll',
    width: '100%',
    float: 'left',
    height: '800px',
    position: 'relative',
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
                    <CCard style={{ width: '14rem', margin: '15px' }}>
                      <CCardImage orientation="top" src={item.profileImageUrl} />
                      <CCardText>{item.displayname}</CCardText>
                      <CCardBody></CCardBody>
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

        <CCol>
          <CCard hidden={stateHidden}>
            <CCardHeader title="Influencers">Profile Details</CCardHeader>
            <CCardBody>
              <CWidgetStatsD
                className="mb-3"
                CCardImage={logo}
                icon={<CIcon className="my-4 text-white" icon={cibTwitter} height={52} />}
                style={{ '--cui-card-cap-bg': '#00aced' }}
                values={[
                  { title: 'followers', value: followerCount },
                  { title: 'tweets', value: statusCount },
                  { title: 'favourites', value: favCount },
                ]}
              />

              <CCardTitle>{'Recent Tweets'}</CCardTitle>
              <div style={divStyle}>
                <CRow>
                  {tweets.map((item, index) => (
                    <CCard style={{ width: '32rem', padding: '15px', position: 'center' }}>
                      <CRow>
                        <CCol xs={2}>
                          {/* TODO: fix profile url */}
                          <CAvatar size="xl" src={logo} />
                        </CCol>
                        <CCol xs={9}>
                          <CCardText textColor={'blue'}>
                            {item.user.displayname}
                            <p>
                              <strong> Post by @</strong>
                              {item.user.username}
                              <strong> at </strong>
                              {item.date}
                            </p>
                          </CCardText>
                        </CCol>
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
