import React from 'react'
import {
  Router,
  Route
} from 'react-router-dom'
import Callback from './routes/Callback'
import Home from './routes/components/home/Home'
import Header from './routes/components/header/Header'
import AddTag from './routes/AddTag/AddTag'
import FoundItem from './routes/FoundItem/FoundItem'
import MyTagsList from './routes/MyTagsList/MyTagsList'
import Approval from '../src/routes/Approval/Approval'
import GetPayPalLink from '../src/routes/Approval/GetPayPalLink'
import AdminDash from '../src/routes/adminDash/AdminDash'
import FinalPayment from '../src/routes/finalPayment/FinalPayment'
import { createBrowserHistory } from 'history'
import Cancel from './routes/cancel/Cancel'
import { ThemeProvider } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles'
import theme from './theme/appTheme'

const history = createBrowserHistory()

const App = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/callback" component={Callback}/>
      <Route exact path="/dashboard" component={AdminDash}/>
      <Route exact path="/tags" component={MyTagsList}/>
      <Route exact path="/AddTag" component={AddTag}/>
      <Route exact path="/FoundItem" component={FoundItem}/>
      <Route exact path="/Approval" component={Approval}/>
      <Route exact path="/GetPayPalLink" component={GetPayPalLink}/>
      <Route exact path="/finalPayment" component={FinalPayment}/>
      <Route exact path="/Cancel" component={Cancel}/>
    </Router>
  </ThemeProvider>

)

export default App
