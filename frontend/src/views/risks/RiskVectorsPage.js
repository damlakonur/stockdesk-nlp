import React from 'react'
import {
  CButton,
  CBadge,
  CCol,
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
  CSmartTable
} from '@coreui/react'

import MUIDataTable from "mui-datatables";

const columns = [

  {
   name: "source",
   label: "Kaynak Aktörü",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "destination",
   label: "Hedef Aktörü",
   options: {
    filter: true,
    sort: false,
   }
  },

  {
    name: "risk",
    label: "Durum",
    options: {
      filter: true,
      sort: false,
    }
  },
 ];



const options = {
  filterType: 'checkbox',
};

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { error_handling } from 'src/error_handling.js';
import { SettingsApplicationsSharp } from '@mui/icons-material';

const AlarmsPage = () => {
  const [risks, setRisks] = useState([]);
  const [stats, setStats] = useState([]);
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + `/risks`)
      .then(res => {
        console.log(res.data)
        setRisks(res.data.risks)
        setStats(res.data.stats)
      })
      .catch(error => {
        addToast(error_handling(error))
      })

  }, []);



  function lastseenDate(date) {
    var year = date.substring(0,4)
    var month = date.substring(4,6)
    var day = date.substring(6,8)
    var hour = date.split("_")[1]
    var minute = "00"
    
    return year + "."+month+"."+day+" - " +hour + ":" + minute
  }

  const statusMap = {
    "RECON_PORT_SCAN": {
        "color": "danger"
    },
    "ANORMAL_BYTES_OUT": {
        "color": "warning"
    },
    "ANORMAL_BYTES_IN": {
        "color": "info"
    },
    "ANORMAL_FIREWALL_BLOCK": {
        "color": "warning",
    },
    "ANORMAL_LOGON_FAIL": {
        "color": "danger"
    },

}
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      {/* <CRow>
        <CCol sm={3}>
          <div className="border-start border-start-4 border-start-info py-1 px-3">
            <div className="text-medium-emphasis small"> Toplam Alarmlar</div>
            <div className="fs-5 fw-semibold">asdas</div>
          </div>
        </CCol>
        <CCol sm={3}>
          <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
            <div className="text-medium-emphasis small">Düşük Seviyeli Alarmlar</div>
            <div className="fs-5 fw-semibold">s</div>
          </div>
        </CCol>
        <CCol sm={3}>
          <div className="border-start border-start-4 border-start-warning py-1 px-3">
            <div className="text-medium-emphasis small">Orta Seviyeli Alarmlar</div>
            <div className="fs-5 fw-semibold">s</div>
          </div>
        </CCol>
        <CCol sm={3}>
          <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
            <div className="text-medium-emphasis small">Kritik Seviyeli Alarmlar</div>
            <div className="fs-5 fw-semibold">s</div>
          </div>
        </CCol>

      </CRow> */}

      <MUIDataTable
          
          title={"Risk Vektörleri"}
          data={risks}
          columns={columns}
          options={options}

      
      />
      
    </>
  )
}

export default AlarmsPage
