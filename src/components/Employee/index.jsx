import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  editEmployee,
  deleteEmployee
} from '../../features/Home/Home.sack'

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
  state = {
    editing: false
  }

  toggleEditMode = () => {
    this.setState(({ editing }) => ({ editing: !editing }))
  }

  onEdit = values => {
    const {
      id,
      firstName,
      lastName,
      editEmployee
    } = this.props

    const dataChanged = firstName !== values.firstName || lastName !== values.lastName
    // check if data changed, if not - just close edit mode without request

    if (this.state.editing) {
      new Promise((resolve, reject) => {
        dataChanged ? editEmployee({ values: { ...values, id }, resolve, reject }) : resolve()
      }).then(() => this.toggleEditMode())
    }
  }

  onDelete = values => () => {
    const {
      id,
      deleteEmployee
    } = this.props
    const { token } = values

    deleteEmployee({ id, token })
  }

  renderForm = ({ handleSubmit, values }) => {
    const classes = useStyles();
    const { editing } = this.state
    const { fetching } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="firstName"
          render={({ input }) => (
            <TextField
              disabled={!editing || fetching} // disable edit when fetching data
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
          render={({ input }) => (
            <TextField
              disabled={!editing || fetching}
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
          render={({ input }) => (
            <TextField
              label="Token"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              {...input}
            />
          )}
        />
        {/** switch icon to Save when editing */}
        {editing ? (
          <IconButton
            className={classes.button}
            color="primary"
            type="submit"
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={this.toggleEditMode}
            className={classes.button}
            color="default"
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          onClick={this.onDelete(values)}
          className={classes.button}
          color="secondary"
        >
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
        onSubmit={this.onEdit}
        initialValues={{
          firstName,
          lastName
        }}
      />
    )
  }
}

Employee.propTypes = {
  fetching: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
  editEmployee: PropTypes.func,
  deleteEmployee: PropTypes.func
}

const mapDispatchToProps = {
  editEmployee,
  deleteEmployee
}

export default connect(null, mapDispatchToProps)(Employee)
