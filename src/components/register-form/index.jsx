import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/Error';
import { emailIsValid, passwordIsValid } from '../helpers/utils';
import useStyles from './useStyles';

export default function RegisterForm(props) {
  const classes = useStyles();
  const { formIsOpen, setFormOpen } = props;
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setFormOpen(false);
  };

  const validate = useCallback(() => {
    if (email === '' && password === '' && repeatedPassword === '') {
      setMsg('');
      setError(false);
      return (true);
    }
    if (!emailIsValid(email)) {
      setError(true);
      setMsg('Email address is not valid.');
      return (false);
    }
    if (password !== repeatedPassword) {
      setError(true);
      setMsg('Passwords don\'t match');
      return (false);
    }
    if (password !== '' && !passwordIsValid(password)) {
      setError(true);
      // eslint-disable-next-line max-len
      setMsg('Password must have at least: 8 characters length, one upper case, one lower case, one number and one no-alphanumeric character.');
      return (false);
    }
    if ((email === '' || password === '' || repeatedPassword === '')) {
      setError(true);
      setMsg('You must fill-in all fields');
      return (false);
    }
    setError(false);
    setMsg('');
    return (true);
  });

  useEffect(() => {
    validate();
  }, [password, repeatedPassword, email]);

  return (
    <div>
      <Dialog open={formIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you don&apos;t have an account, you can create one by filling-in this form.
          </DialogContentText>
          <TextField
            onChange={
              (e) => {
                setEmail(e.target.value);
              }
            }
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={
              (e) => {
                setPassword(e.target.value);
              }
            }
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            onChange={
              (e) => {
                setRepeatedPassword(e.target.value);
              }
            }
            value={repeatedPassword}
            margin="dense"
            id="password"
            label="Repeat password"
            type="password"
            fullWidth
          />
        </DialogContent>
        {
          msg !== '' && (
            <DialogContentText className={classes.error}>
              <ErrorIcon />
              {msg}
            </DialogContentText>
          )
        }
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={error}
            onClick={handleClose}
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RegisterForm.propTypes = {
  formIsOpen: PropTypes.bool,
  setFormOpen: PropTypes.func,
};
