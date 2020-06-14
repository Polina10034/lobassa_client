import React from 'react'
import {
  Router,
  Route
} from 'react-router-dom'
import Callback from './routes/Callback'
import Home from './routes/Home'
import MyTagsList from './routes/MyTagsList/MyTagsList'
import AddTag from './routes/AddTag/AddTag'
import FoundItem from './routes/FoundItem/FoundItem'

import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Route exact path="/" component={Home}/>
    <Route exact path="/MyTagsList" component={MyTagsList}/>
    <Route exact path="/AddTag" component={AddTag}/>
    <Route exact path="/FoundItem" component={FoundItem}/>
    <Route exact path="/callback" component={Callback}/>
  </Router>
)

export default App
