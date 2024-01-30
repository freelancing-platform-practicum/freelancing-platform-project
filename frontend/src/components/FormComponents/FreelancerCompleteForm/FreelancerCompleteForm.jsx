import { useState, useContext, useEffect } from 'react';
import { Context } from '../../../context/context';
import { useFormAndValidation } from '../../../hooks/useFormValidationProfileCustomer';
import { industryAndCategoryOptions, degreeOptions } from '../../../utils/constants';
import { InputText } from '../../InputComponents/InputText/InputText';
import { InputImage } from '../../InputComponents/InputImage/InputImage';
import { InputDocument } from '../../InputComponents/InputDocument/InputDocument';
import { InputTags } from '../../InputComponents/InputTags/InputTags';
import { InputSelect } from '../../InputComponents/InputSelect/InputSelect';
import { InputSwitch } from '../../InputComponents/InputSwitch/InputSwitch';
import { Button } from '../../Button/Button';
import './FreelancerCompleteForm.css';

function FreelancerCompleteForm({ onSubmit }) {
  const [profilePhoto, setProfilePhoto] = useState({});
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [diplomaFiles, setDiplomaFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const { currentUser } = useContext(Context);
  const { values, errors, handleChange, handleChangeCustom, setErrors, setValues, isValid } =
    useFormAndValidation();

  useEffect(() => {
    setTags([]);
    setDiplomaFiles({});
    setPortfolioFiles({});
    setProfilePhoto({});
    setValues({});
    setValues({
      first_name: currentUser.user.first_name,
      last_name: currentUser.user.last_name,
      email: currentUser.account_email || currentUser.user.email,
    });
  }, [currentUser]);

  // useEffect(() => {
  //   const valid = checkErrors(errors)
  //   setIsValid(valid)
  // }, [isValid, errors])

  function addProfilePhoto(url) {
    setProfilePhoto({ photo: url });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = {};

    if (!values.first_name) {
      newErrors = { ...newErrors, first_name: 'Введите имя' };
    }

    if (!values.last_name) {
      newErrors = { ...newErrors, last_name: 'Введите фамилию' };
    }

    if (!values.email) {
      newErrors = { ...newErrors, email: 'Введите эл. почту' };
    }

    setErrors({ ...errors, ...newErrors });

    let allValues = {
      categories: [
        {
          name: values.activity,
        },
      ],
    };

    if (
      values.education ||
      values.faculty ||
      values.start_year ||
      values.finish_year ||
      values.degree ||
      diplomaFiles?.files?.length
    ) {
      allValues.education = [];
      let educationValues = {};

      if (diplomaFiles?.files?.length) {
        educationValues.diploma = diplomaFiles.files;
      }
      if (values.education) {
        educationValues.name = values.education;
      }

      if (values.faculty) {
        educationValues.faculty = values?.faculty;
      }

      if (values.start_year) {
        educationValues.start_year = values?.start_year;
      }

      if (values.finish_year) {
        educationValues.finish_year = values?.finish_year;
      }
      if (values.degree) {
        educationValues.degree = values?.degree;
      }

      allValues.education.push(educationValues);
    }

    if (tags.length > 0) {
      allValues.stacks = tags?.map((tag) => ({ name: tag }));
    }

    if (
      values?.phone ||
      values?.email ||
      values?.telegram ||
      values?.otherContact ||
      values?.preferred
    ) {
      allValues.contacts = [];
    }

    if (values?.phone) {
      allValues.contacts.push({
        type: 'phone',
        value: values?.phone,
        preferred: values?.preferred === 'phone',
      });
    }

    if (values?.email) {
      allValues.contacts.push({
        type: 'email',
        value: values?.email,
        preferred: values?.preferred === 'email',
      });
    }

    if (values?.telegram) {
      allValues.contacts.push({
        type: 'telegram',
        value: values?.telegram,
        preferred: values?.preferred === 'telegram',
      });
    }

    if (values?.otherContact) {
      allValues.contacts.push({
        type: 'other',
        value: values?.otherContact,
        preferred: values?.preferred === 'otherContact',
      });
    }

    if (profilePhoto.photo) {
      allValues.photo = profilePhoto.photo;
    }

    if (portfolioFiles.files) {
      allValues.portfolioFile = portfolioFiles.files;
    }

    if (values.payrate) {
      allValues.payrate = values.payrate;
    }

    if (values.about) {
      allValues.about = values.about;
    }

    if (values.web) {
      allValues.web = values.web;
    }

    onSubmit(allValues);
  };

  return (
    <form className="freelancer-complete-form" onSubmit={handleSubmit} noValidate={true}>
      <div className="freelancer-complete-form__image-input">
        <InputImage
          name="profilePhoto"
          value={values.profilePhoto || ''}
          error={errors.profilePhoto}
          onChange={addProfilePhoto}
          setErrors={setErrors}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Имя</p>
        <InputText
          type="text"
          placeholder="Имя"
          autoComplete="given-name"
          name="first_name"
          width={610}
          value={values.first_name || ''}
          error={errors.first_name}
          onChange={handleChange}
          minLength={80}
          required={true}
        />
        <p className="freelancer-complete-form__input-text">Фамилия</p>
        <InputText
          type="text"
          placeholder="Фамилия"
          autoComplete="family-name"
          name="last_name"
          width={610}
          value={values.last_name || ''}
          error={errors.last_name}
          onChange={handleChange}
          minLength={80}
          required={true}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Контакты</p>
        <div className="freelancer-complete-form__contacts-wrapper">
          <InputText
            type="tel"
            placeholder="+7"
            autoComplete="tel"
            name="phone"
            width={328}
            value={values.phone || ''}
            error={errors.phone}
            onChange={handleChange}
          />
          <InputSwitch
            type="radio"
            name="preferred"
            label="Предпочтительный вид связи"
            value="phone"
            onChange={handleChange}
            error={errors.preferred}
          />
          <InputText
            type="email"
            placeholder="Эл. почта"
            autoComplete="email"
            name="email"
            width={328}
            value={values.email || ''}
            onChange={handleChange}
          />
          <InputSwitch
            type="radio"
            name="preferred"
            label="Предпочтительный вид связи"
            value="email"
            onChange={handleChange}
          />
          <InputText
            type="text"
            placeholder="Телеграм"
            autoComplete="telegram"
            name="telegram"
            width={328}
            value={values.telegram || ''}
            error={errors.telegram}
            onChange={handleChange}
          />
          <InputSwitch
            type="radio"
            name="preferred"
            label="Предпочтительный вид связи"
            value="telegram"
            onChange={handleChange}
          />
          <InputText
            type="url"
            placeholder="Ссылка на другой сайт"
            name="otherContact"
            width={328}
            value={values.otherContact || ''}
            error={errors.otherContact}
            onChange={handleChange}
          />
          <InputSwitch
            type="radio"
            name="preferred"
            label="Предпочтительный вид связи"
            value="otherContact"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Специализация</p>
        <InputSelect
          name="activity"
          placeholder="Выберите из списка"
          value={values.activity || ''}
          error={errors.activity}
          onChange={handleChange}
          options={industryAndCategoryOptions}
          required={true}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Навыки</p>
        <InputTags
          name="stacks"
          tags={tags}
          setTags={setTags}
          handleChange={handleChangeCustom}
          error={errors.tags}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Ставка в час</p>
        <InputText
          type="number"
          placeholder="Ставка"
          name="payrate"
          width={295}
          value={values.payrate || ''}
          error={errors.payrate}
          onChange={handleChange}
          maxLength={10}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">О себе</p>
        <InputText
          type="textarea"
          placeholder="Расскажите о себе как о специалисте и чем вы можете быть полезны"
          name="about"
          width={610}
          height={150}
          value={values.about || ''}
          error={errors.about}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div>
        <p className="freelancer-complete-form__input-text">Примеры работ, портфолио</p>
        <div className="freelancer-complete-form__input-doc-wrapper">
          <InputDocument
            name="portfolio"
            value={portfolioFiles}
            setValue={setPortfolioFiles}
            error={errors.portfolio}
            setErrors={setErrors}
          />
        </div>
      </div>

      <div>
        <p className="freelancer-complete-form__input-text">Укажите ссылку на портфолио</p>
        <InputText
          type="url"
          placeholder="https://example.com"
          name="web"
          width={610}
          value={values.web || ''}
          error={errors.web}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Образование</p>
        <InputText
          type="text"
          placeholder="Начните вводить"
          name="education"
          width={610}
          value={values.education || ''}
          error={errors.education}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Годы учебы</p>
        <div className="freelancer-complete-form__input-year-wrapper">
          <InputText
            type="number"
            placeholder="Начало"
            name="start_year"
            width={295}
            value={values.start_year || ''}
            error={errors.start_year}
            onChange={handleChange}
          />
          <InputText
            type="number"
            placeholder="Окончание"
            name="finish_year"
            width={295}
            value={values.finish_year || ''}
            error={errors.finish_year}
            onChange={handleChange}
            isDisabled={values.degree === 'student'}
          />
        </div>
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Степень</p>
        <InputSelect
          name="degree"
          placeholder="Выберите из списка"
          value={values.degree || ''}
          error={errors.degree}
          onChange={handleChange}
          options={degreeOptions}
        />
      </div>
      <div>
        <p className="freelancer-complete-form__input-text">Факультет</p>
        <InputText
          type="text"
          placeholder="Начните вводить"
          name="faculty"
          width={610}
          value={values.faculty || ''}
          error={errors.faculty}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="freelancer-complete-form__input-text">
          Загрузить сертификаты, грамоты, дипломы
        </p>
        <div className="freelancer-complete-form__input-doc-wrapper">
          <InputDocument
            name="diploma"
            value={diplomaFiles}
            setValue={setDiplomaFiles}
            error={errors.diploma}
            setErrors={setErrors}
          />
        </div>
      </div>

      <Button
        text="Создать профиль"
        disabled={!isValid}
        width={289}
        marginTop={60}
        marginBottom={200}
      />
    </form>
  );
}

export { FreelancerCompleteForm };
