import React, { useState } from 'react';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import { industryAndCategoryOptions } from '../../../utils/constants';
import { InputImage } from '../../InputComponents/InputImage/InputImage';
import { InputText } from '../../InputComponents/InputText/InputText';
import { Button } from '../../Button/Button';
import { InputSelect } from '../../InputComponents/InputSelect/InputSelect';
import './CustomerCompleteForm.css';

function CustomerCompleteForm({ handleCustomerSubmit }) {
  const [photo, setPhoto] = useState(null);

  const { values, errors, isValid, handleChange, setValues, setErrors } = useFormAndValidation();

  function addPhoto(url) {
    setPhoto({ photo: url });
  }

  // console.log(photo)

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = {};

    if (!values.first_name) {
      newErrors = { ...newErrors, first_name: 'Введите имя' };
    }

    if (!values.email) {
      newErrors = { ...newErrors, email: 'Введите эл. почту' };
    }

    setErrors({ ...errors, ...newErrors });

    if (isValid) {
      // if (
      //   isValid &&
      //   values.first_name &&
      //   values.email
      // ) {
      handleCustomerSubmit({ values, photo });
      // console.log(values);
      // setValues({
      //  ...values,
      //  first_name: '',
      //  email: '',
      // });
      //
      // navigate(`/customer`);
    }
  };

  return (
    <form className="employer-complete-form" onSubmit={handleSubmit}>
      <div className="employer-complete-form__image-input">
        <InputImage
          name="photo"
          value={values.photo || ''}
          error={errors.photo}
          errorMessage={errors.photo}
          onChange={addPhoto}
        />
      </div>
      <div>
        <p className="employer-complete-form__input-text">Название компании или ваше имя</p>
        <InputText
          type="text"
          placeholder="Имя"
          autoComplete="given-name"
          name="name"
          width={610}
          value={values.name || ''}
          error={errors.name}
          errorMessage={errors.name}
          onChange={handleChange}
          setValues={setValues}
        />
      </div>
      <div>
        <p className="employer-complete-form__input-text">Сфера деятельности</p>
        <InputSelect
          name="industry"
          placeholder="Выберите из списка"
          value={values.industry || ''}
          error={errors.industry}
          errorMessage={errors.industry}
          onChange={handleChange}
          options={industryAndCategoryOptions}
        />
      </div>
      <div>
        <p className="employer-complete-form__input-text">О компании</p>
        <InputText
          type="textarea"
          placeholder="Расскажите чем занимается ваша компания"
          name="about"
          width={610}
          height={150}
          value={values.about || ''}
          error={errors.about}
          errorMessage={errors.about}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="employer-complete-form__input-text">Укажите ссылку на сайт компании</p>
        <InputText
          type="url"
          placeholder="https://example.com"
          name="web"
          width={610}
          value={values.web || ''}
          error={errors.web}
          errorMessage={errors.web}
          onChange={handleChange}
        />
        <button type="button" className="employer-complete-form__add-link-button">
          Добавить ещё сайт или социальные сети +
        </button>
      </div>

      <Button text="Создать профиль" width={289} marginTop={60} marginBottom={200} />
    </form>
  );
}

export { CustomerCompleteForm };