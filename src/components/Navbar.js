import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight:'48px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const auth = firebase.auth();

export default function ButtonAppBar({name}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{
          minHeight:'48px'
        }} position="static">
        <Toolbar style={{
          minHeight:'48px'
        }}>
          <Typography variant="h6" className={classes.title}>
            Welcome, {name}
          </Typography>
          <Button color="inherit" onClick={() => auth.signOut()}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
