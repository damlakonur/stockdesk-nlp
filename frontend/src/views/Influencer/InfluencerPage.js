import React from 'react'
import {
  CCol,
  CCard,
  CRow,
  CCardImage,
  CWidgetStatsD,
  CAvatar,
  CCardBody,
  CCardText,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CButton,
  CCardTitle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from './../../assets/images/react.jpg'
import { cibTwitter } from '@coreui/icons'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { error_handling } from 'src/error_handling'

const InfluencerPage = () => {
  const [users, setUsers] = useState([])
  const [toast, addToast] = useState(0)
  const [username, setInfluencer] = useState('')
  const [tweets, setTweets] = useState([])
  const [stateHidden, setStateHidden] = useState(true)
  const [favCount, setFavCount] = useState(0)
  const [statusCount, setStatusCount] = useState(0)
  const [followerCount, setFollowerCount] = useState(0)
  const [user, setUser] = useState([])
  const [modal, setModal] = useState(false)
  const [modalTweet, setModalTweet] = useState('')
  const [result, setResult] = useState('')
  const [modelOut2, setModelOut2] = useState([])
  const [modelOut3, setModelOut3] = useState([])
  const [modelOut4, setModelOut4] = useState([])

  const handleClick = (e) => {
    console.log(e)
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/influencer/getdetail`, { username: e })
      .then((res) => {
        console.log(res)
        setTweets(res.data.tweets)
        setUser(res.data.user)
        setFavCount(res.data.user.favouritesCount)
        setStatusCount(res.data.user.statusesCount)
        setFollowerCount(res.data.user.followersCount)
        setStateHidden(false)
      })
  }
  const handleDetailClick = (e) => {
    console.log(e)
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/model/getResult`, { content: e })
      .then((res) => {
        setModal(true)
        setModalTweet(e)
        setResult(res.data.result)
        setModelOut2(res.data.modelOut2)
        setModelOut3(res.data.modelOut3)
        setModelOut4(res.data.modelOut4)
        console.log(modalTweet)
        console.log(modal)
      })
      .catch((error) => {
        addToast(error_handling(error))
      })
  }

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
      <CModal size="lg" visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>NLP Pipeline Output</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalTweet}

          <CRow>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <strong>Entity</strong>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <strong>Word</strong>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <strong>Score</strong>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {modelOut2.map((item, index) => (
                <CTableBody striped hover>
                  <CTableRow>
                    <CTableDataCell>{item.entity_group}</CTableDataCell>
                    <CTableDataCell>{item.word}</CTableDataCell>
                    <CTableDataCell>{item.score}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
              {modelOut3.map((item, index) => (
                <CTableBody striped hover>
                  <CTableRow>
                    <CTableDataCell>{item.entity_group}</CTableDataCell>
                    <CTableDataCell>{item.word}</CTableDataCell>
                    <CTableDataCell>{item.score}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
              {modelOut4.map((item, index) => (
                <CTableBody striped hover>
                  <CTableRow>
                    <CTableDataCell>{'Sentiment'}</CTableDataCell>
                    <CTableDataCell>{item.label}</CTableDataCell>
                    <CTableDataCell>{item.score}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
            </CTable>
          </CRow>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

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
                          <CAvatar size="xl" src={user.profileImageUrl} />
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
                      <CButton onClick={() => handleDetailClick(item.content)}>Analyse</CButton>
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
