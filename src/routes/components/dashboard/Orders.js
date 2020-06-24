import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from './Title'

// Generate Order Data
function createData (id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount }
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79)
]

function preventDefault (event) {
  event.preventDefault()
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

export default function Orders (props) {
  const classes = useStyles()

  const transData = []

  Object.values(props.data).map(item => {
    console.log(item)
    // transData.push({id: item[7], update: item[8], creadate:item[0], nameId: item[2],status:item[6] });
    transData.push(item)
  })

  console.log(transData)
  console.log(props)

  return (
    <React.Fragment>
      <Title>Recent Uploads</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Creation Date</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transData.map((transDataRow) => (
            <TableRow key={transDataRow.transactionId}>
              <TableCell>{transDataRow.transactionId}</TableCell>
              <TableCell>{transDataRow.updateDate}</TableCell>
              <TableCell>{transDataRow.createdDate}</TableCell>
              <TableCell>{transDataRow.productId}</TableCell>
              <TableCell align="right">{transDataRow.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  )
}
