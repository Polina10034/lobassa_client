import React, { useState } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Chart from './Chart'
import Deposits from './Deposits'
import Orders from './Orders'
import api from '../../../api/api'

const Statistic = (props) => {

  const today = new Date()
  const todayDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')
  const [inputStart, setInputStart] = useState(todayDate)
  const [inputEnd, setInputEnd] = useState(todayDate)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [changeTimeout, setChangeTimeout] = React.useState(0)

  const fixedHeightPaper = clsx(props.classes.paper, props.classes.fixedHeight)

  React.useEffect(() => {
    const getRecs = async () => {
      await getNewRecs()
    }

    getRecs()
  }, [])

  
  const getNewRecs = async (start, end) => {
    try {
      const res = await api.service.get(`/statistics/range?tableName=${props.tableName}&tableparm=${props.tableName === 'users' ? 'signupDate' : 'createdDate'}&startDate=${start}&endDate=${end}&filter=none`)
      setData(res.data.body)
    } catch (e) {
      console.log(e)
    }
  }


  const refreshRecords = (date, which) => {
    if (changeTimeout) {
      clearTimeout(changeTimeout)
    }
    setChangeTimeout(
      setTimeout(() => {
        if(which===1)
          setInputStart(date);
        else
          setInputEnd(date); 
        getNewRecs(which == 1 ? date : inputStart, which == 1 ? inputEnd : date);
      }, 1000)
    )
  }

  return (
    <Grid container >
      {console.log(data)}

      <Grid item xs={12} md={12} lg={12}>
        <form className={props.classes.container} noValidate>
          <TextField
            id="startDate"
            label="Start Date"
            type="date"
            className={props.classes.textField}
            value={inputStart}
            onChange={(e) => {  refreshRecords(e.target.value,1)  }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="endDate"
            label="End Date"
            type="date"
            className={props.classes.textField}
            value={inputEnd}
            onChange={(e) => { refreshRecords(e.target.value,2) }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      </Grid>
      <Grid container spacing={3}>
        {/* Chart */}
        {/* <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={data.transactionsbymode}/>
          </Paper>
        </Grid> */}
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits data={data} />
          </Paper>
        </Grid> */}
        <Grid item xs={12}>
          <Paper className={props.classes.paper}>
            <Orders data={data ? data.records : null} name={props.tableName}/>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Statistic
