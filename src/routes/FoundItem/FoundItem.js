import React, { Component } from 'react'
import './FoundItem.css'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { session: state.session }
}

class FoundItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="FoundItem">
        <div className="FoundItem-header">
          <p className="FoundItem-text">Found Item</p>
        </div>
        <div className="FoundItem-content">
          <p className="FoundItem-Title">Scan barcode</p>
          <div className="FoundItem-scanner">
            <br></br><br></br><br></br><br></br><br></br>
            here i need to bring some scanning library and photo upload library
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FoundItem)
