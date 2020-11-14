import React, { useContext, useEffect } from 'react';
import { FormField, List, ListItem } from '@atomikui/core';
import Layout from '../../components/Layout';
import { AppContext } from '../../AppProvider';

const numOfFields = 5;

const usePinFields = () => {
  const [pinValues, setPinValue] = React.useState({});

  return {
    pinValues,
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

const Login = () => {
  const { authenticateUser, setIsLoading } = useContext(AppContext);
  const { pinValues, handleChange } = usePinFields();

  useEffect(() => {
    const currentPin = Object.values(pinValues).join('');

    if (currentPin.length === numOfFields) {
      setIsLoading(true);
      authenticateUser(currentPin);
    }
  }, [pinValues]);

  return (
    <Layout>
      <div className="login">
        <form className="login__form" autoComplete="off">
          <h1 className="login__hd">Enter Your 5 Character PIN</h1>
          <List type="horizontal">
            <ListItem>
              <FormField
                type="password"
                maxLength="1"
                name="pin-1"
                onChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <FormField
                type="password"
                maxLength="1"
                name="pin-2"
                onChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <FormField
                type="password"
                maxLength="1"
                name="pin-3"
                onChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <FormField
                type="password"
                maxLength="1"
                name="pin-4"
                onChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <FormField
                type="password"
                maxLength="1"
                name="pin-5"
                onChange={handleChange}
              />
            </ListItem>
          </List>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
