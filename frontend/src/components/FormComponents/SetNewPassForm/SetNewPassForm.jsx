import { useState } from 'react';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import { Button } from '../../Button/Button';
import { InputText } from '../../InputComponents/InputText/InputText';
import './SetNewPassForm.css';

function SetNewPassForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { values, errors, isValid, handleChange, setValues, setErrors } = useFormAndValidation();
  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};

    if (!values.password) {
      newErrors = { ...newErrors, password: 'Введите пароль' };
    }

    if (!values.re_password) {
      newErrors = { ...newErrors, re_password: 'Введите пароль повторно' };
    }

    setErrors({ ...errors, ...newErrors });
    if (isValid && values.password && values.re_password) {
      setValues({
        ...values,
        password: '',
        re_password: '',
      });
    }
    setButtonClicked(true);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="set-new-password" onSubmit={handleSubmit} noValidate={true}>
      <div className="set-new-password__form">
        <div className="set-new-password__input-container">
          <p className="set-new-password__text">
            Придумайте новый пароль для восстановления доступа к аккаунту.
          </p>
          <InputText
            placeholder="Новый пароль"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            marginTop={32}
            width={400}
            height={60}
            pass={togglePasswordVisibility}
            name="password"
            onChange={handleChange}
            value={values.password || ''}
            error={errors.password}
          />
          <InputText
            placeholder="Повторите пароль"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            marginTop={32}
            width={400}
            height={60}
            name="re_password"
            onChange={handleChange}
            value={values.re_password || ''}
            error={errors.re_password}
          />
        </div>
        <Button
          text="Продолжить"
          width={400}
          type="submit"
          disabled={(!isValid || !values.password || !values.re_password) && buttonClicked}
        />
      </div>
    </form>
  );
}

export { SetNewPassForm };
