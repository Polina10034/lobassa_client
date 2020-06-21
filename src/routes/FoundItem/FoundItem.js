import React, { Component } from 'react'
import './FoundItem.css'
import { connect } from 'react-redux'
import HomeIcon from '@material-ui/icons/Home'
import { Redirect } from 'react-router-dom'
import QrReader from 'react-qr-scanner'
import ImageUploading from 'react-images-uploading'

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
      redirect: false
    }
    this.handleScan = this.handleScan.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
      console.log(data[0].dataURL)
    }
  }

  onSubmit () {
    // API call to upload the qrCode and imageURL
    alert('someone out there thanks you')
    this.setState({ redirect: true })
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
                  <button className="UploadImage-button" onClick={onImageUpload}>Upload images</button>&nbsp;
                  {imageList.map(image => (
                    <div key={image.key}>
                      <img className="UploadImage-image" src={image.dataURL} alt="" width="150" />
                      <div>
                        <button className="UploadImage-button" onClick={image.onRemove}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>}
          {this.state.buttonIndicator && <div className="found-button" onClick={this.onSubmit}>
            Done
          </div>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FoundItem)
