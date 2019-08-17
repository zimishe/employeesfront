import React from 'react'
import { Form, Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles.module.css';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  button: {
    marginLeft: 2,
    marginRight: 2,
  }
}));

class Employee extends React.Component {
  onSubmit = (...args) => {
    console.log('args', args)
  }

  renderForm = ({ handleSubmit }) => {
    const classes = useStyles();

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="firstName"
          render={({ input, meta }) => (
            <TextField
              // disabled
              label="First Name"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              {...input}
            />
          )}
        />
        <Field
          name="lastName"
          render={({ input, meta }) => (
            <TextField
              // disabled
              label="Last Name"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              {...input}
            />
          )}
        />
        <Field
          name="token"
          render={({ input, meta }) => (
            <TextField
              // disabled
              label="Token"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              {...input}
            />
          )}
        />
        <IconButton className={classes.button} aria-label="edit" color="default">
          <EditIcon />
        </IconButton>
        <IconButton className={classes.button} aria-label="save" color="primary">
          <SaveIcon />
        </IconButton>
        <IconButton className={classes.button} aria-label="delete" color="secondary">
          <DeleteIcon />
        </IconButton>
      </form>
    )
  }

  render() {
    const { firstName, lastName } = this.props

    return (
      <Form
        render={this.renderForm}
        onSubmit={this.onSubmit}
        initialValues={{
          firstName,
          lastName
        }}
      />
    )
  }
}

export default Employee
