import React, { Component } from 'react'
import './MyTagsList.css'
import { connect } from 'react-redux'
import { Redirect, NavLink, Link } from 'react-router-dom'
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
import CircularProgress from '@material-ui/core/CircularProgress'
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
      foundIndicator: false,
      labels: [],
      isLoading: true,
      imagePath: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.reportLost = this.reportLost.bind(this)
    this.reportDelete = this.reportDelete.bind(this)
    // this.handelPay = this.handlePay.bind(this)
  }

  componentDidMount () {
    // fetch the project name, once it retrieves resolve the promsie and update the state.
    this.getLabelsData().then(result => {
      if (result.body !== undefined) {
        this.setState({
          labels: result.body
        })
        const foundItem = result.body.filter(item => item.transactionStatus === 'found')
        if (foundItem.length > 0) {
          this.setState({ selectedTag: foundItem[0] })
          this.setState({ dialog: true })
          this.setState({ foundIndicator: true })
        }
        this.getImagePath(foundItem[0].transactionId).then(result => {
          if (result.body !== undefined) {
            this.setState({
              imagePath: result.body.picture_path
            })
          }
        })
      }
      this.setState({ isLoading: false })
    })
  }

  handleChange (id) {
    const tag = this.state.labels.filter((item) => item.productId === id)
    if (tag.length === 1) {
      this.setState({ selectedTag: tag[0] })
      this.setState({ listIndicator: true })
      if (tag[0].transactionStatus === 'found') {
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
    alert(`lost tag id ${this.state.selectedTag.productId}`)
    // API call to report lost item. all item details are saved in state - selectedTag
    this.setState({ dialog: false })
  }

  reportDelete () {
    // alert(`delete tag id ${this.state.selectedTag.productId}`)
    // API call to delete item. all item details are saved in state - selectedTag

    var body = {
      id: this.state.selectedTag.productId
    }
    console.log('body' + body.id)
    try {
      api.deleteTag(body).then(response => {
        // response.json()
        console.log(response)
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
            { this.state.isLoading ? <CircularProgress/> : (this.state.labels.length > 0 ? this.state.labels.map((item, i) => (
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
            ))
              : <p style={{ color: '#00000' }}>No tags to show</p>)
            }
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
          {this.state.foundIndicator && <DialogTitle id="simple-dialog-title">
            We found somthing that belong to you...
          </DialogTitle>}
          <DialogTitle id="simple-dialog-title">
            {this.state.selectedTag.name}
          </DialogTitle>
          <DialogContent>
            <p>{this.state.selectedTag.description}</p>
            {this.state.imagePath === undefined && <p style={{ border: '1px solid black', width: '100%', height: '100px' }}>image didnt found...</p>}
            {this.state.imagePath && <img src={`https://lobassa-photos.s3-eu-west-1.amazonaws.com${this.state.imagePath}`} />}
          </DialogContent>
          {this.state.listIndicator && <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.selectedTag.transactionStatus !== 'found' && this.state.selectedTag.status !== 'lost' && <Button size="small" color="primary" onClick={this.reportLost}>
              Lost
            </Button>}
            {this.state.selectedTag.transactionStatus === 'found' &&
            <Link to={{ pathname: '/Test',
              state: {
                productId: this.state.selectedTag.productId,
                transactionId: this.state.selectedTag.transactionId
              } }}><Button color="secondary" size="small" >
              Pay
              </Button></Link>}
            <Button color="primary" size="small" onClick={this.reportDelete}>
              Delete
            </Button>
          </DialogActions>}
        </Dialog>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyTagsList)
