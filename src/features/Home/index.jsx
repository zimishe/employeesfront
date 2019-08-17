import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Employee from '../../components/Employee'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  fetchEmployees,
  getEmployeesSelector,
  createEmployee
} from './Home.sack'

import styles from './styles.module.css'

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

class Home extends React.Component {
  state = {
    createFormOpen: false
  }

  toggleCreateFormOpen = () => {
    this.setState(({ createFormOpen }) => ({ createFormOpen: !createFormOpen }))
  }

  onCreateEmployee = (values, { reset }) => {
    new Promise((resolve, reject) => {
      this.props.createEmployee({ values, resolve, reject })
    }).then(() => reset())
  }

  componentDidMount() {
    this.props.fetchEmployees()
  }

  renderCreateForm = ({ handleSubmit }) => {
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
        <IconButton
          type="submit"
          className={classes.button}
          aria-label="save"
          color="primary"
        >
          <SaveIcon />
        </IconButton>
      </form>
    )
  }


  render() {
    const {
      employees: {
        list,
        fetching
      }
    } = this.props

    return (
      <div style={{ marginTop: 20 }}>
        {list.length > 0 && list.map(({ _id, ...props }) => (
          <Employee key={_id} {...props} />
        ))}
        <Fab
          onClick={this.toggleCreateFormOpen}
          color="primary"
          aria-label="add"
          style={{ marginLeft: 10, marginTop: 30 }}
        >
          <AddIcon />
        </Fab>
        {this.state.createFormOpen && (
          <Form
            render={this.renderCreateForm}
            onSubmit={this.onCreateEmployee}
          />
        )}
      </div>
    )
  }
}

Home.propTypes = {
  employees: PropTypes.object,
  fetchEmployees: PropTypes.func,
  createEmployee: PropTypes.func
}

const mapStateToProps = state => ({
  employees: getEmployeesSelector(state)
})

const mapDispatchToProps = {
  fetchEmployees,
  createEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
