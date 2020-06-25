import React from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Deposits from './Deposits'
import LostAndFound from './lostAndFoundCard'

const Cards = (props) => {
  const fixedHeightPaper = clsx(props.classes.paper, props.classes.fixedHeight)

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits data={props.data.products} title={'Products'}/>
        </Paper>
        </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits data={props.data.transactions} title={'Transactions'}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits data={props.data.users} title={'Users'} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <LostAndFound data={props.data.products.lostandfound}/>
        </Paper>
      </Grid>
  </Grid>
  )
}

export default Cards