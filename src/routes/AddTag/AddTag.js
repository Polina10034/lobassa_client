import React, { Component } from 'react'
import './AddTag.css'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DialogContent, DialogTitle, Dialog, Button, DialogActions } from '@material-ui/core'
import { QRCode } from 'react-qr-svg'
import { Redirect } from 'react-router-dom'
import api from '../../api/api'

const mapStateToProps = state => {
  return { session: state.session }
}

class AddTag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false,
      labelName: undefined,
      labelDesc: undefined,
      returnPrice: undefined,
      dialog: false,
      tagId: undefined,
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handlePrint = this.handlePrint.bind(this)
  }

  handleClose () {
    this.setState({ dialog: false })
    this.setState({ redirect: true })
  }

  handlePrint () {
    alert('i need to print this qr')
    this.setState({ dialog: false })
    this.setState({ redirect: true })
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    var body = {
      name: this.state.labelName,
      description: this.state.labelDesc,
      price: this.state.returnPrice
    }
    try {
    // API call to create new tag and return tag id,
    // then we create QR code with tag id
      api.addTag(body).then(response => {
        this.setState({ tagId: response.body.newItem.productId })
        this.setState({ dialog: true })
        this.setState({ isLoading: false })
        e.preventDefault()
      })
      // alert(`label name: ${this.state.labelName}, label desc: ${this.state.labelDesc}, Price: ${this.state.returnPrice}`)

      // e.preventDefault()
    } catch (err) {
      console.error('error fetching...:', err)
    }
  }

  render () {
    if (!this.props.session.isLoggedIn) {
      return <Redirect to="/" />
    }
    return this.state.redirect ? <Redirect to='/tags' /> : (
      <div className="AddTag">
        <div className="AddTag-header">
          <p className="AddTag-text">Create Tag</p>
        </div>
        <div className="AddTag-content">
          <TextField
            required
            fullWidth
            name="labelName"
            id="outlined-required1"
            label="Label name"
            variant="outlined"
            placeholder="Label-name"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            name="labelDesc"
            id="outlined-required2"
            label="Label sescription"
            variant="outlined"
            placeholder="Label description"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            name="returnPrice"
            id="outlined-required3"
            label="Return Price"
            variant="outlined"
            placeholder="0.00"
            onChange={this.handleChange}
          />
          <Button variant="contained" color="primary"
            style={{ width: '200px', height: '40px', borderRadius: '50px' }}
            onClick={this.handleSubmit}>
              Create
          </Button>
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.dialog}
          style={{ textAlign: 'center' }}
        >
          <DialogTitle id="simple-dialog-title">
            Your tag created!
          </DialogTitle>
          <DialogContent>
            {this.state.isLoading ? <CircularProgress />
              : <QRCode
                level="Q"
                style={{ width: 256 }}
                value={JSON.stringify({
                  id: this.state.tagId,
                  insider: true
                })}
              />}
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button color="primary" onClick={this.handlePrint}>
              Print
            </Button>
            <Button color="primary" onClick={this.handleClose}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddTag)
