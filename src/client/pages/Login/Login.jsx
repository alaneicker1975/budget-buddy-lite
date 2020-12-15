/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormField, List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';

const numOfFields = 5;

const usePinFields = () => {
  const [pinValues, setPinValue] = useState({});

  return {
    pinValues,
    setPinValue,
    handleChange: (e) => {
      const { maxLength, value, name } = e.target;
      const [fieldName, fieldIndex] = name.split('-');

      // Check if they hit the max character length
      if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(fieldIndex, 10) < numOfFields) {
          // Get the next input field
          const nextSibling = document.querySelector(
            `input[name=${fieldName}-${parseInt(fieldIndex, 10) + 1}]`,
          );

          // If found, focus the next field
          if (nextSibling !== null) {
            nextSibling.focus();
          }
        }
      }

      setPinValue((prevState) => {
        return {
          ...prevState,
          [`${fieldName}_${fieldIndex}`]: value,
        };
      });

      e.target.blur();
    },
  };
};

const Login = (props) => {
  const { authenticateUser, setHistory } = useContext(AppContext);
  const { pinValues, setPinValue, handleChange } = usePinFields();
  const formRef = useRef();

  useEffect(() => {
    setHistory(props.history);
  }, []);

  useEffect(() => {
    const pin = Object.values(pinValues).join('');

    if (pin.length === numOfFields) {
      authenticateUser(pin).catch(() => {
        setPinValue({});
        formRef.current.reset();
      });
    }
  }, [pinValues]);

  return (
    <div className="login">
      <form ref={formRef} className="login__form" autoComplete="off">
        <h1 className="login__hd">Enter Your 5 Character PIN</h1>
        <List type="horizontal">
          <ListItem>
            <FormField
              type="password"
              maxLength="1"
              name="pin-1"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <FormField
              type="password"
              maxLength="1"
              name="pin-2"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <FormField
              type="password"
              maxLength="1"
              name="pin-3"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <FormField
              type="password"
              maxLength="1"
              name="pin-4"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <FormField
              type="password"
              maxLength="1"
              name="pin-5"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={handleChange}
            />
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
