import React, { Component } from 'react'
import './AddTag.css'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'

const mapStateToProps = state => {
  return { session: state.session }
}

class AddTag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labelName: undefined,
      labelDesc: undefined,
      returnPrice: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    alert(`label name: ${this.state.labelName}, label desc: ${this.state.labelDesc}, Price: ${this.state.returnPrice}`)
    e.preventDefault()
    // API call to create new tag and return QR code
  }

  render () {
    return (
      <div className="AddTag">
        <div className="AddTag-header">
          <p className="AddTag-text">Create Tag</p>
          <a href="/MyTagsList">
            <HomeIcon style={{ color: 'white', height: '40px', width: '40px', marginRight: '100px', marginTop: '10px' }}/>
          </a>
        </div>
        <div className="AddTag-content">
          <TextField
            required
            fullWidth
            name="labelName"
            id="outlined-required"
            label="Label name"
            variant="outlined"
            placeholder="Label-name"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            name="labelDesc"
            id="outlined-required"
            label="Label sescription"
            variant="outlined"
            placeholder="Label description"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            name="returnPrice"
            id="outlined-required"
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddTag)
