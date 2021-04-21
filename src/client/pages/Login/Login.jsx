/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormField, List, ListItem, Button } from '@atomikui/core';
import { useAppContext } from '../../AppProvider';
import useAuthenticateUser from '../../hooks/useAuthenticateUser';
import {
  SET_GLOBAL_MESSAGE,
  SET_IS_LOADING,
  SET_HISTORY,
} from '../../reducers/appStateReducer';

const Login = (props) => {
  const usernameRef = useRef();

  const { state, dispatch } = useAppContext();

  const { authenticate, error, loading, loggedIn } = useAuthenticateUser();

  const { history } = state;

  const validationSchema = yup.object().shape({
    username: yup.string().required('user name is required'),
    password: yup.string().required('password is required'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      authenticate(values);
    },
  });

  useEffect(() => {
    dispatch({ type: SET_HISTORY, payload: props.history });
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch({
      type: SET_GLOBAL_MESSAGE,
      payload: error ? { theme: 'error', text: error } : null,
    });
  }, [error]);

  useEffect(() => {
    dispatch({ type: SET_IS_LOADING, payload: loading });
  }, [loading]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/dashboard');
    }
  }, [loggedIn]);

  return (
    <div className="login">
      <form
        className="login__form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <h1 className="login__hd">Login</h1>
        <List loose>
          <ListItem>
            <FormField
              ref={usernameRef}
              name="username"
              placeholder="username"
              aria-label="user name"
              onChange={handleChange}
              hasError={!!(errors.username && touched.username)}
              errorText={errors.username}
            />
          </ListItem>
          <ListItem>
            <FormField
              name="password"
              type="password"
              placeholder="password"
              aria-label="password"
              onChange={handleChange}
              hasError={!!(errors.password && touched.password)}
              errorText={errors.password}
            />
          </ListItem>
          <ListItem>
            <Button type="submit" theme="cyan" block>
              login
            </Button>
          </ListItem>
        </List>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

Login.defaultProps = {
  history: null,
};

export default Login;
