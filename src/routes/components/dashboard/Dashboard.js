import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Chart from './Chart'
import Orders from './Orders'
import api from '../../../api/api'
import Loader from './loader'
import Cards from './Cards'
import Statistic from './statistic'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        LoBassa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const today = new Date()
  const todayDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')
  const [data, setData] = React.useState()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const [inputStart, setInputStart] = useState(todayDate)
  const [inputEnd, setInputEnd] = useState(todayDate)
  const [transData, setTransData] = useState()
  const [loading, setLoading] = useState(true)

  const [changeTimeout, setChangeTimeout] = React.useState(0)

  const refreshRecords = (tableName) => {
    if (changeTimeout) {
      clearTimeout(changeTimeout)
    }
    setChangeTimeout(
      setTimeout(() => {
        getNewRecs(tableName)
      }, 1000)
    )
  }

  React.useEffect(() => {
    const getRecs = async () => {
      await getStatistics()
    }
    getRecs()
  }, [])

  const getStatistics = async () => {
    setLoading(true)
    try {
      const res = await api.service.get(`/statistics`)
      setData(res.data.body)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getNewRecs = async (tableName) => {
    setLoading(true)
    try {
      const res = await api.service.get(`/statistics/range?tableName=${tableName}&tableparm=updateDate&startDate=${inputStart}&endDate=${inputEnd}&filter=none`)
      setTransData(res.data.body)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  function renderDone () {
    return (
      <div className={classes.root}>
        <CssBaseline />
        {console.log(data)}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
           <Container maxWidth="lg" className={classes.container}>
            <Cards classes={classes} data={data}></Cards>
          </Container>
          {/*<Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12} md={12} lg={12}>
              <form className={classes.container} noValidate>
                <TextField
                  id="startDate"
                  label="Start Date"
                  type="date"
                  className={classes.textField}
                  value={inputStart}
                  onChange={(e) => { setInputStart(e.target.value); refreshRecords() }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  id="endDate"
                  label="End Date"
                  type="date"
                  className={classes.textField}
                  value={inputEnd}
                  onChange={(e) => { setInputEnd(e.target.value); refreshRecords() }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </Grid>
            <Grid container spacing={3} align="center">
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart data={data.transaction.transactionsbymode} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders data={transData} />
                </Paper>
              </Grid>
            </Grid>
            
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container> */}

          <Statistic classes={classes} tableName={'users'} ></Statistic>
          <Statistic classes={classes} tableName={'products'} ></Statistic>
          <Statistic classes={classes} tableName={'transaction'} ></Statistic>

          
          <Box pt={4}>
              <Copyright />
            </Box>

        </main>
      </div>
    )
  }

  return (
    loading ? <Loader /> : renderDone()
  )
}

export default Dashboard
