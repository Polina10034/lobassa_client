import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
})

export default function LostAndFound (props) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Products: Lost & Found</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
        Found: {props.data.found}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Lost: {props.data.lost}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Approved: {props.data.approved}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Closed: {props.data.closed}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Pending: {props.data.pending}
      </Typography>
    </React.Fragment>
  )
}
