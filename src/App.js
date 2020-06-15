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

import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Header/>
    <Route exact path="/" component={Home}/>
    <Route exact path="/callback" component={Callback}/>
    <Route exact path="/tags" component={MyTagsList}/>
    <Route exact path="/AddTag" component={AddTag}/>
    <Route exact path="/FoundItem" component={FoundItem}/>

  </Router>
)

export default App
