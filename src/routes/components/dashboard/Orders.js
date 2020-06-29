import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from './Title'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

export default function Orders (props) {
  const classes = useStyles()

  const productsArray = () => {
    return props.data.map((row) => (
      <TableRow key={row.productId}>
        <TableCell>{row.productId}</TableCell>
        <TableCell>{row.updateDate}</TableCell>
        <TableCell>{row.createdDate}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell align="right">{row.transactionStatus}</TableCell>
      </TableRow>
    ))
  }

  const productHeaders = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Last Update</TableCell>
        <TableCell>Creation Date</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Price</TableCell>
        <TableCell align="right">Status</TableCell>
      </TableRow>
    )
  }

  const userArray = () => {
    return props.data.map((row) => (
      <TableRow key={row.userId}>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.signupDate}</TableCell>
      </TableRow>
    ))
  }

  const userHeaders = () => {
    return (
      <TableRow>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Date</TableCell>
      </TableRow>
    )
  }

  const transactionsArray = () => {
    return props.data.map((row) => (
      <TableRow key={row.transactionId}>
        <TableCell>{row.transactionId}</TableCell>
        <TableCell>{row.updateDate}</TableCell>
        <TableCell>{row.createdDate}</TableCell>
        <TableCell>{row.productId}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{Math.round((row.price * 0.06 + Number.EPSILON) * 100) / 100}</TableCell>
        <TableCell align="right">{row.transactionStatus}</TableCell>
      </TableRow>
    ))
  }

  const transactionHeaders = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Last Update</TableCell>
        <TableCell>Creation Date</TableCell>
        <TableCell>Product ID</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Profit</TableCell>
        <TableCell align="right">Status</TableCell>
      </TableRow>
    )
  }

  const handleTable = () => {
    if (props.data == null) {
      return
    }
    if (props.name === 'users') {
      return userArray()
    }
    if (props.name === 'transaction') {
      return transactionsArray()
    }
    if (props.name === 'products') {
      return productsArray()
    }
    return null
  }

  const handleHeaders = () => {
    if (props.name === 'users') {
      return userHeaders()
    }
    if (props.name === 'transaction') {
      return transactionHeaders()
    }
    if (props.name === 'products') {
      return productHeaders()
    }
    return null
  }

  return (
    <React.Fragment>
      <Title>{props.name.toUpperCase()}</Title>
      <Table size="small">
        <TableHead>
          {handleHeaders()}
        </TableHead>
        <TableBody>
          {handleTable()}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Typography color="textSecondary" className={classes.depositContext}>
          #{props.name} between dates
        </Typography>
      </div>
    </React.Fragment>
  )
}
