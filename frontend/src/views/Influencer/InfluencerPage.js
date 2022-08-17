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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import Chart from 'react-apexcharts'
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
  const [stateHidden2, setStateHidden2] = useState(true)
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
  const [isClaim, setIsClaim] = useState(false)
  const [yahooStock, setYahooStock] = useState([])
  const [date, setDate] = useState('')
  //const [predStocks, setPredStocks] = useState([])

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
        setModalTweet(e['content'])
        setResult(res.data.result)
        console.log(result)
        console.log(res.data.result)
        if (res.data.result === 'Tahmin') {
          setIsClaim(true)
          console.log(isClaim)
        } else {
          setIsClaim(false)
          console.log(isClaim)
        }
        setModelOut2(res.data.modelOut2)
        setModelOut3(res.data.modelOut3)
        setModelOut4(res.data.modelOut4)
        setYahooStock(res.data.yahooStock)
        //setPredStocks(res.data.predStock)
        setYahooStock(res.data.yahooStock)

        setChartData(res.data.predStock)
        // console.log(modalTweet)
        // console.log(modal)
      })
      .catch((error) => {
        addToast(error_handling(error))
      })
  }
  //   {
  //   x: new Date(1538782200000),
  //   y: [6630.71, 6648.95, 6623.34, 6635.65],
  // },
  const setChartData = (data) => {
    //console.log(data)
    const chartData = []
    for (let i = 0; i < data.length; i++) {
      console.log(data[i])
      chartData[i] = {
        x: data[i].timestamp,
        y: [data[i].open, data[i].high, data[i].low, data[i].close],
      }
    }
    console.log(chartData)
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
  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  }
  const series = [
    {
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: new Date(1538782200000),
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        // {
        //   x: new Date(1538784000000),
        //   y: [6635.65, 6651, 6629.67, 6638.24],
        // },
        // {
        //   x: new Date(1538785800000),
        //   y: [6638.24, 6640, 6620, 6624.47],
        // },
        // {
        //   x: new Date(1538787600000),
        //   y: [6624.53, 6636.03, 6621.68, 6624.31],
        // },
        // {
        //   x: new Date(1538789400000),
        //   y: [6624.61, 6632.2, 6617, 6626.02],
        // },
        // {
        //   x: new Date(1538791200000),
        //   y: [6627, 6627.62, 6584.22, 6603.02],
        // },
        // {
        //   x: new Date(1538793000000),
        //   y: [6605, 6608.03, 6598.95, 6604.01],
        // },
        // {
        //   x: new Date(1538794800000),
        //   y: [6604.5, 6614.4, 6602.26, 6608.02],
        // },
        // {
        //   x: new Date(1538796600000),
        //   y: [6608.02, 6610.68, 6601.99, 6608.91],
        // },
        // {
        //   x: new Date(1538798400000),
        //   y: [6608.91, 6618.99, 6608.01, 6612],
        // },
        // {
        //   x: new Date(1538800200000),
        //   y: [6612, 6615.13, 6605.09, 6612],
        // },
        // {
        //   x: new Date(1538802000000),
        //   y: [6612, 6624.12, 6608.43, 6622.95],
        // },
        // {
        //   x: new Date(1538803800000),
        //   y: [6623.91, 6623.91, 6615, 6615.67],
        // },
        // {
        //   x: new Date(1538805600000),
        //   y: [6618.69, 6618.74, 6610, 6610.4],
        // },
        // {
        //   x: new Date(1538807400000),
        //   y: [6611, 6622.78, 6610.4, 6614.9],
        // },
        // {
        //   x: new Date(1538809200000),
        //   y: [6614.9, 6626.2, 6613.33, 6623.45],
        // },
        // {
        //   x: new Date(1538811000000),
        //   y: [6623.48, 6627, 6618.38, 6620.35],
        // },
        // {
        //   x: new Date(1538812800000),
        //   y: [6619.43, 6620.35, 6610.05, 6615.53],
        // },
        // {
        //   x: new Date(1538814600000),
        //   y: [6615.53, 6617.93, 6610, 6615.19],
        // },
        // {
        //   x: new Date(1538816400000),
        //   y: [6615.19, 6621.6, 6608.2, 6620],
        // },
        // {
        //   x: new Date(1538818200000),
        //   y: [6619.54, 6625.17, 6614.15, 6620],
        // },
        // {
        //   x: new Date(1538820000000),
        //   y: [6620.33, 6634.15, 6617.24, 6624.61],
        // },
        // {
        //   x: new Date(1538821800000),
        //   y: [6625.95, 6626, 6611.66, 6617.58],
        // },
        // {
        //   x: new Date(1538823600000),
        //   y: [6619, 6625.97, 6595.27, 6598.86],
        // },
        // {
        //   x: new Date(1538825400000),
        //   y: [6598.86, 6598.88, 6570, 6587.16],
        // },
        // {
        //   x: new Date(1538827200000),
        //   y: [6588.86, 6600, 6580, 6593.4],
        // },
        // {
        //   x: new Date(1538829000000),
        //   y: [6593.99, 6598.89, 6585, 6587.81],
        // },
        // {
        //   x: new Date(1538830800000),
        //   y: [6587.81, 6592.73, 6567.14, 6578],
        // },
        // {
        //   x: new Date(1538832600000),
        //   y: [6578.35, 6581.72, 6567.39, 6579],
        // },
        // {
        //   x: new Date(1538834400000),
        //   y: [6579.38, 6580.92, 6566.77, 6575.96],
        // },
        // {
        //   x: new Date(1538836200000),
        //   y: [6575.96, 6589, 6571.77, 6588.92],
        // },
        // {
        //   x: new Date(1538838000000),
        //   y: [6588.92, 6594, 6577.55, 6589.22],
        // },
        // {
        //   x: new Date(1538839800000),
        //   y: [6589.3, 6598.89, 6589.1, 6596.08],
        // },
        // {
        //   x: new Date(1538841600000),
        //   y: [6597.5, 6600, 6588.39, 6596.25],
        // },
        // {
        //   x: new Date(1538843400000),
        //   y: [6598.03, 6600, 6588.73, 6595.97],
        // },
        // {
        //   x: new Date(1538845200000),
        //   y: [6595.97, 6602.01, 6588.17, 6602],
        // },
        // {
        //   x: new Date(1538847000000),
        //   y: [6602, 6607, 6596.51, 6599.95],
        // },
        // {
        //   x: new Date(1538848800000),
        //   y: [6600.63, 6601.21, 6590.39, 6591.02],
        // },
        // {
        //   x: new Date(1538850600000),
        //   y: [6591.02, 6603.08, 6591, 6591],
        // },
        // {
        //   x: new Date(1538852400000),
        //   y: [6591, 6601.32, 6585, 6592],
        // },
        // {
        //   x: new Date(1538854200000),
        //   y: [6593.13, 6596.01, 6590, 6593.34],
        // },
        // {
        //   x: new Date(1538856000000),
        //   y: [6593.34, 6604.76, 6582.63, 6593.86],
        // },
        // {
        //   x: new Date(1538857800000),
        //   y: [6593.86, 6604.28, 6586.57, 6600.01],
        // },
        // {
        //   x: new Date(1538859600000),
        //   y: [6601.81, 6603.21, 6592.78, 6596.25],
        // },
        // {
        //   x: new Date(1538861400000),
        //   y: [6596.25, 6604.2, 6590, 6602.99],
        // },
        // {
        //   x: new Date(1538863200000),
        //   y: [6602.99, 6606, 6584.99, 6587.81],
        // },
        // {
        //   x: new Date(1538865000000),
        //   y: [6587.81, 6595, 6583.27, 6591.96],
        // },
        // {
        //   x: new Date(1538866800000),
        //   y: [6591.97, 6596.07, 6585, 6588.39],
        // },
        // {
        //   x: new Date(1538868600000),
        //   y: [6587.6, 6598.21, 6587.6, 6594.27],
        // },
        // {
        //   x: new Date(1538870400000),
        //   y: [6596.44, 6601, 6590, 6596.55],
        // },
        // {
        //   x: new Date(1538872200000),
        //   y: [6598.91, 6605, 6596.61, 6600.02],
        // },
        // {
        //   x: new Date(1538874000000),
        //   y: [6600.55, 6605, 6589.14, 6593.01],
        // },
        // {
        //   x: new Date(1538875800000),
        //   y: [6593.15, 6605, 6592, 6603.06],
        // },
        // {
        //   x: new Date(1538877600000),
        //   y: [6603.07, 6604.5, 6599.09, 6603.89],
        // },
        // {
        //   x: new Date(1538879400000),
        //   y: [6604.44, 6604.44, 6600, 6603.5],
        // },
        // {
        //   x: new Date(1538881200000),
        //   y: [6603.5, 6603.99, 6597.5, 6603.86],
        // },
        // {
        //   x: new Date(1538883000000),
        //   y: [6603.85, 6605, 6600, 6604.07],
        // },
        // {
        //   x: new Date(1538884800000),
        //   y: [6604.98, 6606, 6604.07, 6606],
        // },
      ],
    },
  ]

  return (
    <>
      <CModal size="lg" visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>NLP Pipeline Output</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalTweet}
          <CRow>
            <div id="chart">
              <Chart options={options} series={series} type="candlestick" height={350} />
            </div>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Model Output : {result}</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
            </CTable>
          </CRow>

          <CRow visible={isClaim}>
            <CTable visible={isClaim} striped hover>
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
            <CCardHeader align="center" title="Influencers">
              <h3>Influencers</h3>
            </CCardHeader>
            <CCardBody>
              <div style={divStyle2}>
                <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
                  {users.map((item, index) => (
                    <CCard className="h-100" style={{ width: '14rem', margin: '10px' }}>
                      <CCardImage src={item.profileImageUrl} />

                      <CCardBody>
                        <CCardText align="center">
                          <strong>{item.displayname}</strong>
                        </CCardText>
                      </CCardBody>
                      <CButton
                        color="dark"
                        onClick={() => handleClick(item.username)}
                        variant="ghost"
                      >
                        Detail
                      </CButton>
                    </CCard>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol>
          <CCard hidden={stateHidden}>
            <CCardHeader align="center" title="Influencers">
              <h3>Profile Details</h3>
            </CCardHeader>
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
              {/*<CInputGroup className="mb-3">
                <CFormInput
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Please enter a date in YY-MM-DD format"
                />
                <CButton
                  color="dark"
                  onClick={() => handleDateClick(user.username, date)}
                  variant="outline"
                >
                  Get
                </CButton>
              </CInputGroup> */}
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
                      <CButton
                        color="info"
                        onClick={() => handleDetailClick(item)}
                        variant="outline"
                      >
                        Analyse
                      </CButton>
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
