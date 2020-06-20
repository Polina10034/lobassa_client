import React, { Component } from 'react'
import './Approval.css'
import { connect } from 'react-redux'
import { ReactComponent as Logo } from '../../routes/lobassaLogo.svg';
import {
    Typography,
    AppBar
} from '@material-ui/core'




const mapStateToProps = state => {
    return { session: state.session }
}

class Approval extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }



    render() {
        return (
            <div className="Approval">
                <div className="Approval-header">
                    <AppBar className="Approval-text" position="static" >
                        <Typography variant='h6' > Almost Complete </Typography>
                    </AppBar >
                </div>
                <div className="Approval-content" >
                    <div className="Approval-Title" >
                        <p> We are ONE step away! </p>
                    </div>
                    <div className="Approval-centerContent" >
                        <p>
                            Hey username, < br />
                            Now you just need to wait
                            for your product gets to you, <br />
                            that great news!
                        </p>
                    </div>
                    <div className="Approval-bottomContent" >
                        <p>
                            We are glad to help you < br />
                            LoBassa Team.
                        </p>
                    </div >
                    <div className="Approval-logo" >
                        <Logo />
                    </div>
                </div >
            </div>
        )
    }
}

export default connect(mapStateToProps)(Approval)