import React, { Component } from 'react'
import './MyTagsList.css'
import { connect } from 'react-redux'
import { Redirect, NavLink, Link } from 'react-router-dom'
import {
  DialogContent, DialogTitle, Dialog, Button, DialogActions,
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
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { CheckCircleRounded, Add, DeleteForever } from '@material-ui/icons'

import api from '../../api/api'
const URL = 'https://lobassa-photos.s3-eu-west-1.amazonaws.com'

function mapStateToProps (state) {
  return { session: state.session }
}


const translateColor = status => {
  switch (status) {
    // case 'complited': // payment done
    //   return 'blue'
    case 'pending': // found
      return 'PaleTurquoise'
    case 'approved': // approved=payed
      return 'green'
    default:
      return 'grey'
  }
  // pending = lost, approved=found, confirmed = done
}

class MyTagsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiStatus: 'Not called',
      dialog: false,
      selectedTag: undefined,
      listIndicator: true,
      foundIndicator: false,
      labels: [],
      transactions: [],
      isLoading: true,
      imagePath: undefined,
      updateStatus: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    // this.reportLost = this.reportLost.bind(this)
    this.reportCancele = this.reportCancele.bind(this)
    // this.handelPay = this.handlePay.bind(this)
  }

  componentDidMount () {
    // fetch the project name, once it retrieves resolve the promsie and update the state.
    this.getLabelsData().then(result => {
      if (result.body !== undefined) {
        this.setState({
          labels: result.body
        })
        const foundItem = result.body.filter(item => item.transactionStatus === 'pending')
        if (foundItem.length > 0) {
          this.setState({ selectedTag: foundItem[0] })
          this.setState({ dialog: true })
          this.setState({ foundIndicator: true })
        }
        if (foundItem.length > 0) {
          this.getImagePath(foundItem[0].transactionId).then(result => {
            if (result.body !== undefined) {
              this.setState({
                imagePath: result.body.picture_path 
              })
            }
          })
        }
      }
      this.setState({ isLoading: false })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.updateStatus !== this.state.updateStatus) {
      this.getLabelsData().then(result => {
        if (result.body !== undefined) {
          this.setState({
            labels: result.body
          })
        }
        this.setState({ isLoading: false })
      })
    }
  }

  handleChange (id) {
    const tag = this.state.labels.filter((item) => item.productId === id)
    if (tag.length === 1) {
      this.setState({ selectedTag: tag[0] })
      this.setState({ listIndicator: true })
      if (tag[0].transactionStatus === 'pending') {
        this.getImagePath(tag[0].transactionId).then(result => {
          if (result.body !== undefined) {
            this.setState({
              imagePath: result.body.picture_path
            })
          }
        })
      }
    }
    this.setState({ dialog: true })
  }

  getImagePath (id) {
    return api.getTransaction(id)
  }

  getLabelsData () {
    // replace with whatever your api logic is.
    return api.getAll()
  }

  handleClose () {
    this.setState({ dialog: false })
    this.setState({ foundIndicator: false })
    this.setState({ imagePath: undefined })
  }

  reportLost () {
    // alert(`lost tag id ${this.state.selectedTag.productId}`)
    // API call to report lost item. all item details are saved in state - selectedTag
    var body = {
      productId: this.state.selectedTag.productId
    }
    try {
      api.reportTagLost(body).then(response => {
        // response.json()
        console.log(response)
        this.setState({ updateStatus: !this.state.updateStatus })
        this.setState({ dialog: false })
      })
    } catch (err) {
      console.log('error fetching...:', err)
    }
    this.setState({ dialog: false })
  }

  reportDelete () {
    var body = {
      id: this.state.selectedTag.productId
    }
    console.log('body' + body.id)
    try {
      api.canceleTransaction(this.state.selectedTag.productId).then(response => {
        // response.json()
        console.log(response)
        this.setState({ updateStatus: !this.state.updateStatus })
        this.setState({ dialog: false })
      })
    } catch (err) {
      console.log('error fetching...:', err)
    }
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
          <Link to="/FoundItem" style={{ textDecoration: 'none' }}>
            <Button style={{ backgroundColor: '#3A69B0', height: '60px', borderRadius: 40, fontSize: '13px', width: '180px', color: '#FFFFFF' }}>I Found Baggage!</Button>
          </Link>
          <List>
            {this.state.isLoading ? <CircularProgress /> : (this.state.labels.length > 0 ? this.state.labels.map((item, i) => (
              // {item.transactionStatus}
              <ListItem key={i} alignItems="flex-start" className="List-item" onClick={() => this.handleChange(item.productId)}>
                <ListItemAvatar><Avatar variant='square' className="Item-image" src={item.picture_path ? URL + `${item.picture_path}` : `${URL}/suitcase.png`} alt={'img'} /></ListItemAvatar>
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
            ))
              : <p style={{ color: '#00000' }}>No tags to show</p>)
            }
          </List>
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
          {this.state.foundIndicator && <DialogTitle id="simple-dialog-title">
            We found somthing that belongs to you... first Pay when recieved Confirm
          </DialogTitle>}
          <DialogTitle id="simple-dialog-title">
            {this.state.selectedTag.name}
          </DialogTitle>
          <DialogContent>
            <p>{this.state.selectedTag.description}</p>
            {/* {this.state.imagePath === undefined && <p style={{ border: '1px solid black', width: '100%', height: '100px' }}>image didnt found...</p>} */}
            <img style={{ width: '250px' }} src={this.state.imagePath ? URL + `${this.state.imagePath}` : `${URL}/suitcase.png`} />
          </DialogContent>
          {this.state.listIndicator && <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.selectedTag.activeTransaction && <Button size="small" color="primary" onClick={this.reportCancele}>
              Cancel
            </Button>}
            {this.state.selectedTag.transactionStatus === 'approved' && !this.state.selectedTag.activeTransaction &&
              <Link to={{
                pathname: '/GetPayPalLink',
                state: {
                  productId: this.state.selectedTag.productId,
                  transactionId: this.state.selectedTag.transactionId
                }
              }}><Button color="secondary" size="small" >
                  Pay
                </Button></Link>
            }
            {this.state.selectedTag.activeTransaction && this.state.selectedTag.transactionStatus === 'confirmed' &&
              <Link to={{
                pathname: '/finalPayment',
                state: {
                  transactionId: this.state.selectedTag.transactionId,
                  productId: this.state.selectedTag.productId
                }
              }}>
                <Button color="secondary" size="small" >Confirm
                </Button></Link>
            }
            {/* <Button color="primary" size="small" onClick={this.reportDelete}>
              <DeleteForever/>
            </Button> */}
          </DialogActions>}
        </Dialog>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyTagsList)