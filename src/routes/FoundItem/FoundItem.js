import React, { Component } from 'react'
import './FoundItem.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QrReader from 'react-qr-scanner'
import ImageUploading from 'react-images-uploading'
import { Button } from '@material-ui/core'

import api from '../../api/api'

const mapStateToProps = state => {
  return { session: state.session }
}

class FoundItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      qrCode: 'Scanning.....',
      scan: true,
      imageUrl: undefined,
      image: false,
      buttonIndicator: false,
      redirect: false,
      transactionID: undefined,
      uploadPhoto: false
    }
    this.handleScan = this.handleScan.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handelNewPhoto = this.handelNewPhoto.bind(this)
  }

  handleScan (data) {
    if (data !== null) {
      this.setState({ qrCode: JSON.parse(data).id })
      this.setState({ image: true })
      this.setState({ scan: false })
    }
  }

  onUpload (data) {
    if (data[0]) {
      this.setState({ imageUrl: data[0].dataURL })
      this.setState({ buttonIndicator: true })
    }
  }

  onSubmit () {
    // API call to upload the qrCode and imageURL
    var body = {
      productId: this.state.qrCode,
      price: this.state.returnPrice
    }
    try {
    // API call to create new tag and return tag id,
    // then we create QR code with tag id
      api.addTransaction(body).then(response => {
        this.setState({ transactionID: response.body.newItem.transactionId })
        this.setState({ uploadPhoto: true })
        // this.setState({ tagId: response.body.newItem.productId })
        // this.setState({ dialog: true })
        // e.preventDefault()
      })
    } catch (err) {
      console.error('error fetching...:', err)
    }
  }

  componentDidUpdate () {
    if (this.state.uploadPhoto) {
      this.handelNewPhoto()
    }
  }

  handelNewPhoto () {
    var photoBody = {
      transactionId: this.state.transactionID,
      photo: this.state.imageUrl
    }
    try {
      api.addPhoto(photoBody).then(response => {
        this.setState({ uploadPhoto: false })
        this.setState({ redirect: true })
      })
    } catch (err) {
      console.error('error fetching...:', err)
    }
  }

  handleError (err) {
    console.error(err)
  }

  render () {
    const previewStyle = {
      height: 250,
      width: 250
    }
    return this.state.redirect ? (<Redirect to='/tags' />) : (
      <div className="FoundItem">
        <div className="FoundItem-header">
          <p className="FoundItem-text">Found Item</p>
        </div>
        <div className="FoundItem-content">
          <p className="FoundItem-Title">Scan barcode</p>
          {this.state.scan && <div className="FoundItem-scanner">
            <QrReader
              delay={30}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
            />
            <p>{this.state.qrCode}</p>
          </div>}
          {this.state.image && <div className="FoundItem-scanner">
            <ImageUploading multiple onChange={this.onUpload} maxNumber={1}>
              {({ imageList, onImageUpload, onImageRemoveAll }) => (
                <div>
                  <Button color='secondary' size='medium' onClick={onImageUpload}>Upload images</Button>&nbsp;
                  {imageList.map(image => (
                    <div key={image.key}>
                      <img className="UploadImage-image" src={image.dataURL} alt="" width="150" />
                      <div>
                        <Button color="primary" onClick={image.onRemove}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>}
          {this.state.buttonIndicator && <Button color='secondary' size='medium' onClick={this.onSubmit}>
            Done
          </Button>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FoundItem)
