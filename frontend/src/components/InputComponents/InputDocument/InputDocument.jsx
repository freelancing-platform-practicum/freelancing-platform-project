import './InputDocument.css';

function InputDocument({ name, value, setValue, isDisabled, error, setErrors }) {
  const allowedFileTypes = new Set(['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']);

  function handleChange(event) {
    const selectedFile = event.currentTarget.files[0];

    const reader = new FileReader();

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = () => {
      if (
        allowedFileTypes.has(selectedFile.type) &&
        selectedFile.size <= 52_428_800 &&
        !value.some((file) => file.file === reader.result)
      ) {
        setValue((previous) => [...previous, { file: reader.result, name: selectedFile.name }]);
        setErrors((previous) => ({ ...previous, [name]: '' }));
      } else if (!allowedFileTypes.has(selectedFile.type) || selectedFile.size > 52_428_800) {
        setErrors((previous) => ({
          ...previous,
          [name]: 'Выберите файл в формате PNG, JPG, JPEG или PDF до 50 МБ.',
        }));
      } else if (value.some((file) => file.file === reader.result)) {
        setErrors((previous) => ({ ...previous, [name]: 'Такой файл уже загружен.' }));
      }
    };
    reader.onerror = () => {
      setErrors((previous) => ({
        ...previous,
        [name]: 'Произошла ошибка. Попробуйте ещё раз',
      }));
    };

    // хак чтобы можно было прикрепить только что удалённый файл
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.value = '';
  }

  function handleDelete(item) {
    const newFiles = value.filter((file) => file.file !== item.file);
    setValue(newFiles);
  }

  return (
    <>
      {value?.length > 0 &&
        value?.map((item, index) => (
          <div
            className="input-doc__real-input input-doc__real-input_uploaded"
            key={item.id || Date.now() + index}
          >
            <input className="input-doc__fake-input" name={name} disabled />
            <span className="input-doc__input-text input-doc__input-text_uploaded">
              {item.name}
            </span>
            {!isDisabled && (
              <button
                className="input-doc__close-button"
                onClick={() => handleDelete(item)}
                type="button"
                aria-label="Удалить файл"
              />
            )}
          </div>
        ))}

      {value?.length < 8 && !isDisabled && (
        <div className="input-doc__wrapper">
          <label className="input-doc__real-input">
            <input
              className="input-doc__fake-input"
              type="file"
              name={name}
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleChange}
              disabled={isDisabled}
            />
            <div>
              <span className="input-doc__input-text">Загрузить</span>
              <span className="input-doc__input-text input-doc__input-text_type_tooltip">
                макс. 50 MB
              </span>
            </div>
            <span className="input-doc__input-text input-doc__input-text_type_tooltip">
              .jpg .jpeg .png .pdf
            </span>
          </label>
          {error ? <span className="input-doc__error">{error}</span> : ''}
        </div>
      )}
    </>
  );
}

export { InputDocument };
