import React, { Component } from 'react'
import './MyTagsList.css'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { DialogContent, DialogTitle, Dialog, Button, DialogActions,
  ListItemAvatar,
  Fab,
  Avatar,
  Typography,
  IconButton,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { CheckCircleRounded, Add } from '@material-ui/icons'

import api from '../../api/api'

function mapStateToProps (state) {
  return { session: state.session }
}

const translateColor = status => {
  switch (status) {
    case 'pending':
      return 'gold'
    case 'lost':
      return 'red'
    case 'found':
      return 'green'
    default:
      return 'black'
  }
}

class MyTagsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiStatus: 'Not called',
      dialog: false,
      selectedTag: undefined,
      listIndicator: true,
      labels: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.reportLost = this.reportLost.bind(this)
    this.reportDelete = this.reportDelete.bind(this)
  }

  componentDidMount () {
    // fetch the project name, once it retrieves resolve the promsie and update the state.
    this.getLabelsData().then(result => {
      // console.log('Body: ' + (result.body))
      this.setState({
        labels: result.body
      })
    })
  }

  getLabelsData () {
    // replace with whatever your api logic is.
    return api.getAll()
  }

  handleChange (id) {
    let tag = this.state.labels.filter((item) => item.productId === id)
    if (tag.length === 1) {
      this.setState({ selectedTag: tag[0] })
      this.setState({ listIndicator: true })
    } else {
      tag = this.state.labels.filter((item) => item.productId === id)
      this.setState({ selectedTag: tag[0] })
      this.setState({ listIndicator: false })
    }
    this.setState({ dialog: true })
  }

  handleClose () {
    this.setState({ dialog: false })
  }

  reportLost () {
    alert(`lost tag id ${this.state.selectedTag.productId}`)
    // API call to report lost item. all item details are saved in state - selectedTag
    this.setState({ dialog: false })
  }

  reportDelete () {
    alert(`delete tag id ${this.state.selectedTag.productId}`)
    // API call to delete item. all item details are saved in state - selectedTag
    this.setState({ dialog: false })
  }

  render () {
    if (!this.props.session.isLoggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div className="MyList">
        <div className="MyList-header">
          <p className="MyList-text">My Tags</p>
        </div>
        <div className="MyList-content">
          <NavLink to="/FoundItem">
            <a className="found-button" >
            I Found Baggage!
            </a>
          </NavLink>
          <List>
            {this.state.labels.map((item, i) => (
              <ListItem key={i} alignItems="flex-start" className="List-item" onClick={() => this.handleChange(item.productId)}>
                <ListItemAvatar><Avatar variant='square' className="Item-image" src={item.img}/></ListItemAvatar>
                <ListItemText
                  primary={<Typography style={{ color: '#434d63' }}>{item.name}</Typography>}
                  secondary={item.description}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <CheckCircleRounded style={{ color: translateColor(item.transactionStatus) }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {/* <p className="List-title" style={{ marginTop: '50px' }}>My Founds</p>
          <div className="Tags-list">
            {mockData.myFounds.map((item, i) => (
              <div className="List-item" onClick={() => this.handleChange(item._id)}>
                <div className="Item-image">{item.img}</div>
                <div className="Item-text" style={{ color: translateColor(item.status) }}>
                  <p className="Item-title">{item.title}</p>
                  <p className="Item-desc">{item.desc}</p>
                </div>
                <p className="Item-status" style={{ color: translateColor(item.status) }}>{item.status}</p>
              </div>
            ))}
          </div> */}

        </div>
        {this.props.session.type === 'Admin'
          ? <NavLink to="/dashboard" >
            <Fab style={{ position: 'fixed', right: '10%', bottom: '90px' }} color="primary" aria-label="add">
              <DashboardIcon />
            </Fab>
          </NavLink> : null}
        <NavLink to="/AddTag" exact>
          <Fab style={{ position: 'fixed', right: '10%', bottom: '25px' }} color="primary" aria-label="add">
            <Add />
          </Fab>
        </NavLink>
        {this.state.selectedTag && <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.dialog}
          style={{ textAlign: 'center' }}
        >
          <DialogTitle id="simple-dialog-title">
            {this.state.selectedTag.name}
          </DialogTitle>
          <DialogContent>
            <p>{this.state.selectedTag.description}</p>
            <p style={{ border: '1px solid black', width: '100%', height: '100px' }}>{this.state.selectedTag.img ? this.state.selectedTag.img : 'img' } picture</p>
          </DialogContent>
          {this.state.listIndicator && <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.selectedTag.transactionStatus !== 'lost' && <Button color="primary" onClick={this.reportLost}>
              I Lost it
            </Button>}
            {this.state.selectedTag.transactionStatus === 'found' && <Button color="primary" onClick={this.reportLost}>
              Send it back!
            </Button>}
            <Button color="primary" onClick={this.reportDelete}>
              Delete Tag
            </Button>
          </DialogActions>}
        </Dialog>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyTagsList)
