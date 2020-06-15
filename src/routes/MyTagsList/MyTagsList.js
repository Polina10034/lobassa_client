import React, { Component } from 'react'
import './MyTagsList.css'
import { connect } from 'react-redux'
import { DialogContent, DialogTitle, Dialog, Button, DialogActions } from '@material-ui/core'

const mockData = {
  myLabels: [
    {
      _id: 1,
      title: 'name 1',
      desc: 'cvwenbij cbwui fckk eqbuu de',
      img: 'Item 1',
      status: undefined
    },
    {
      _id: 2,
      title: 'name 2',
      desc: 'bhibi cfrty rtt uuy66ufubvhyg',
      img: 'Item 2',
      status: 'lost'
    },
    {
      _id: 3,
      title: 'name 3',
      desc: 'verbe btrber ewrgfwgr ergwerge ergbe cvefcqwefqwef',
      img: 'Item 3',
      status: 'found'
    },
    {
      _id: 4,
      title: 'name 4',
      desc: 'cvwenbij cbwui fckk eqbuu de',
      img: 'Item 4',
      status: undefined
    },
    {
      _id: 5,
      title: 'name 5',
      desc: 'bhibi cfrty rtt uuy66ufubvhyg',
      img: 'Item 5',
      status: 'lost'
    },
    {
      _id: 6,
      title: 'name 6',
      desc: 'verbe btrber ewrgfwgr ergwerge ergbe cvefcqwefqwef',
      img: 'Item 6',
      status: 'found'
    }
  ],
  myFounds: [
    {
      _id: 7,
      title: 'name 7',
      desc: 'vgutcuku xerzj ihbpiugbb vtyicri',
      img: 'Item 7',
      status: 'pending'
    },
    {
      _id: 8,
      title: 'name 8',
      desc: 'citycvoub cxrtes75zu pugyiyg',
      img: 'Item 8',
      status: undefined
    },
    {
      _id: 9,
      title: 'name 9',
      desc: 'huip cxdreyezr ctydidt8ici cryicd',
      img: 'Item 9',
      status: undefined
    },
    {
      _id: 10,
      title: 'name 10',
      desc: 'vgutcuku xerzj ihbpiugbb vtyicri',
      img: 'Item 10',
      status: 'pending'
    },
    {
      _id: 11,
      title: 'name 11',
      desc: 'citycvoub cxrtes75zu pugyiyg',
      img: 'Item 11',
      status: undefined
    },
    {
      _id: 12,
      title: 'name 12',
      desc: 'huip cxdreyezr ctydidt8ici cryicd',
      img: 'Item 12',
      status: undefined
    }
  ]
}

const mapStateToProps = state => {
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
      listIndicator: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.reportLost = this.reportLost.bind(this)
    this.reportDelete = this.reportDelete.bind(this)
  }

  handleChange (id) {
    let tag = mockData.myLabels.filter((item) => item._id === id)
    if (tag.length === 1) {
      this.setState({ selectedTag: tag[0] })
      this.setState({ listIndicator: true })
    } else {
      tag = mockData.myFounds.filter((item) => item._id === id)
      this.setState({ selectedTag: tag[0] })
      this.setState({ listIndicator: false })
    }
    this.setState({ dialog: true })
  }

  handleClose () {
    this.setState({ dialog: false })
  }

  reportLost () {
    alert(`lost tag id ${this.state.selectedTag._id}`)
    // API call to report lost item. all item details are saved in state - selectedTag
    this.setState({ dialog: false })
  }

  reportDelete () {
    alert(`delete tag id ${this.state.selectedTag._id}`)
    // API call to delete item. all item details are saved in state - selectedTag
    this.setState({ dialog: false })
  }

  componentDidMount () {
    // API call tpo get all user tags, i inser mock data for now
  }

  render () {
    return (
      <div className="MyList">
        <div className="MyList-header">
          <p className="MyList-text">My Tags</p>
        </div>
        <div className="MyList-content">
          <a className="found-button" href="/FoundItem">
            I found baggage!
          </a>
          <p className="List-title">My Labels</p>
          <div className="Tags-list">
            {mockData.myLabels.map((item, i) => (
              <div className="List-item" onClick={() => this.handleChange(item._id)}>
                <div className="Item-image">{item.img}</div>
                <div className="Item-text" style={{ color: translateColor(item.status) }}>
                  <p className="Item-title">{item.title}</p>
                  <p className="Item-desc">{item.desc}</p>
                </div>
                <p className="Item-status" style={{ color: translateColor(item.status) }}>{item.status}</p>
              </div>
            ))}
          </div>
          <p className="List-title" style={{ marginTop: '50px' }}>My Founds</p>
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
          </div>
        </div>
        <a href="/AddTag" className="Plus-button"><p className="Plus-text">+</p></a>
        {this.state.selectedTag && <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.dialog}
          style={{ textAlign: 'center' }}
        >
          <DialogTitle id="simple-dialog-title">
            {this.state.selectedTag.title}
          </DialogTitle>
          <DialogContent>
            <p>{this.state.selectedTag.desc}</p>
            <p style={{ border: '1px solid black', width: '100%', height: '100px' }}>{this.state.selectedTag.img} picture</p>
          </DialogContent>
          {this.state.listIndicator && <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.selectedTag.status !== 'lost' && <Button variant="outlined" color="primary" onClick={this.reportLost}>
              I Lost it
            </Button>}
            <Button variant="outlined" color="primary" onClick={this.reportDelete}>
              Delete Tag
            </Button>
          </DialogActions>}
        </Dialog>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyTagsList)
