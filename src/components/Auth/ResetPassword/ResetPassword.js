import React from 'react';
import styles from './ResetPassword.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../UI/FormWrap/FormWrap';
import InputWrap from '../../UI/InputWrap/InputWrap';
import Button from '../../UI/Button/Button';
import InputError from '../../UI/InputError/InputError';
import useInput from '../../../hooks/Auth/useInput';
import { validateEmail } from '../../../helpers/Auth/inputsValidations';
import { commitEmailChecking } from '../../../features/ResetPassword/resetPasswordAPI';
import { selectIsSuccessful } from '../../../features/RequestStaus/requestStatusSlice';

function ResetPassword() {
  const dispatch = useDispatch();
  const requestIsSuccessful = useSelector(selectIsSuccessful);
  const {
    value,
    isValid,
    inputValidation,
    handleIBlur,
    handleIChange,
    handleIReset,
    setInput,
  } = useInput(validateEmail);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      setInput('');
      return;
    }

    dispatch(commitEmailChecking({ email: value }));
    if (!requestIsSuccessful) return;

    handleIReset();
  };

  const emailErrorMsg =
    inputValidation.type === 'required'
      ? 'The email field is required'
      : 'The email field is invalid';

  return (
    <FormWrap className={styles['form-wrap']}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <legend>Please enter your email to reset your password.</legend>
        <InputWrap className='margin--bottom-md'>
          <ion-icon name='mail'></ion-icon>
          <input
            type='email'
            id='email'
            placeholder='Email'
            value={value}
            onChange={handleIChange}
            onBlur={handleIBlur}
            autoComplete='off'
          />
          <span></span>
        </InputWrap>
        {inputValidation.hasError && (
          <InputError msg={emailErrorMsg} className={styles['input-error']} />
        )}

        <Button>Reset Password</Button>
      </form>
      <Link to='/signin' className={styles['go-back-link']}>
        Go back to sign in page
      </Link>
    </FormWrap>
  );
}

export default ResetPassword;
