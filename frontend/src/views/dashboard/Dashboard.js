import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
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
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { CChart } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'


import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { StepEdge } from 'react-flow-renderer'
import { error_handling } from 'src/error_handling.js';

import GaugeChart from 'react-gauge-chart'


const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const [ChartData, setChartData] = useState({});
  const [nodeLen, setNodeLen] = useState(0);
  const [edgeLen, setEdgeLen] = useState(0);
  const [userLen, setUserLen] = useState(0);
  const [hostLeni, setHostLen] = useState(0);

  const [portscanLen, setPortscanLen] = useState(0);
  const [bytesinLen, setBytesinLen] = useState(0);
  const [bytesoutLen, setBytesoutLen] = useState(0);
  const [logonfLen, setLogonfLen] = useState(0);

  var log_num = [];
  var node_data = [];
  var edge_data = [];
  var user_data = [];
  var host_data = [];
  var cortex_date_data = [];

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + `/cortex/stats`)
      .then(res => {
        setChartData(res.data)
        setNodeLen(res.data.node_counts.length)
        setEdgeLen(res.data.edge_counts.length)
        setUserLen(res.data.user_counts.length)
        setHostLen(res.data.host_counts.length)
      }
      )
      .catch(error => { 
        addToast(error_handling(error))
    })


  }, []);

  let i = 1;

  for (i = 1; i < nodeLen; i += nodeLen / 8) {
    log_num.push(i.toFixed(0) + ". log dosyası")
    node_data.push(ChartData.node_counts[i.toFixed(0)])
    edge_data.push(ChartData.edge_counts[i.toFixed(0)])
    user_data.push(ChartData.user_counts[i.toFixed(0)])
    host_data.push(ChartData.host_counts[i.toFixed(0)])
    cortex_date_data.push(ChartData.cortex_date[i.toFixed(0)])
  }

  node_data = Array.from(new Set(node_data));
  edge_data = Array.from(new Set(edge_data));
  user_data = Array.from(new Set(user_data));
  host_data = Array.from(new Set(host_data));
  cortex_date_data = Array.from(new Set(cortex_date_data));
  log_num = Array.from(new Set(log_num));
  return (
    <>
    
    <CToaster ref={toaster} push={toast} placement="top-end" />
      <WidgetsDropdown />



      <CCard style={{ width: '75%', height:'%40', marginBottom: 25, marginTop:25, float: "left" }}>
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Analiz Takip Çizelgesi
              </h4>
            </CCol>
            
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: cortex_date_data,
              datasets: [
                {
                  label: 'Node Sayısı',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: "#321fdb",
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: node_data,
                  fill: true,
                },
                {
                  label: 'Edge Sayısı',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: "#3399ff",
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: edge_data,
                  fill: true,
                },
                {
                  label: 'User Sayısı',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: "#f9b115",
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: user_data,
                  fill: true,
                },
                {
                  label: 'Host Sayısı',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: "#e55353",
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: host_data,
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />

        </CCardBody>

      </CCard>

      <div style={{display: "block", width: "%100"}}>
      <CCard style={{ width: '23.8%', height:'300', marginBottom: 25, marginTop:25, float: "left" }}>
<CCardBody>
<h4>Risk Dağılımı</h4>
          <CRow>
            <CCol>
            <CChart
        type="doughnut"
        data={{
          labels: ['Anormal Portscan', 'Anormal Bytes In', 'Anormal Bytes Out', 'Fail Logon'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [ChartData.portscans, ChartData.bytesin, ChartData.bytesout, ChartData.logonf],
            },
          ],
        }}
        width= '%50'
        height='%50'
        
      />
            </CCol>
          </CRow>
  

</CCardBody>
</CCard>

<CCard style={{ width: '25%', height:'40%', marginBottom: 25, marginTop:25, float: "left", marginLeft:25 }}>
<CCardBody>
<h4>Risk Düzeyi</h4>
          <CRow>
            <CCol>
            <GaugeChart id="gauge-chart4"  percent={ChartData.risk_percentage} textColor="black"/>
            </CCol>
            
          </CRow>

</CCardBody>
</CCard>

<CCard style={{ width: '25%', height:'40%', marginBottom: 25, marginTop:25, float: "left", marginLeft:25 }}>
<CCardBody>
<h4>Alarm Artışı</h4>
          <CRow>
            <CCol>
            <GaugeChart id="gauge-chart4"  percent={ChartData.risk_diff} textColor="black"/>
            </CCol>
            
          </CRow>


</CCardBody>
</CCard>

      </div>
        
      

    </>  
    
  )
}

export default Dashboard
