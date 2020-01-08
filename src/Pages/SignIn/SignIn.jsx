import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import { setUserAva } from "../../utils/setAvatar";

const SignIn = () => {
  const [photo, setPhoto] = useState({
    file: null,
    url: null
  });

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto({ file, url: URL.createObjectURL(file) });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    const userInfo = {
      name: e.name,
      pass: e.pass,
      ava: photo.file
    };

    console.log(userInfo);
  };

  return (
    <div className='login-wrapper'>
      <Form onSubmit={(e) => onSubmit(e)} validate={validate}>
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor='file-input' className='img-wrap'>
              <img src={photo.url || setUserAva()} alt='' />
            </label>

            <Field
              name='file'
              type='file'
              onChange={handleOnChange}
              tebindex={1}
              component='input'
              id='file-input'
            />

            <Field name='name'>
              {({ input, meta }) => (
                <>
                  <input
                    {...input}
                    type='text'
                    tabIndex={2}
                    placeholder='username'
                    component='input'
                    autoFocus
                  />

                  {meta.error && meta.touched && <span className='login-error'>{meta.error}</span>}
                </>
              )}
            </Field>

            <Field name='pass'>
              {({ input, meta }) => (
                <>
                  <input
                    {...input}
                    type='password'
                    tabIndex={3}
                    placeholder='password'
                    component='input'
                  />

                  {meta.error && meta.touched && <span className='login-error'>{meta.error}</span>}
                </>
              )}
            </Field>

            <Field name='pass2'>
              {({ input, meta }) => (
                <>
                  <input
                    {...input}
                    type='password'
                    tabIndex={4}
                    placeholder='confirm pass'
                    component='input'
                  />

                  {meta.error && meta.touched && <span className='login-error'>{meta.error}</span>}
                </>
              )}
            </Field>

            <div className='controls'>
              <button
                type='submit'
                disabled={submitting || pristine}
                className='btn btn-primary btn-primary--wide'
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

const validate = ({ name, pass, pass2 }) => {
  const err = {};

  console.log(name, pass, pass2);
  if (!name || !name.trim().length) {
    err.name = "Chouse your nickname";
  }

  if (!pass || !pass.trim().length) {
    err.pass = "Enter a password";
  }

  if (!pass2 || !pass2.trim().length) {
    err.pass2 = "Confirm your password";
  }

  if (pass && pass2 && pass2 !== pass) {
    err.pass2 = "password is not equal";
  }

  return err;
};

export default SignIn;
