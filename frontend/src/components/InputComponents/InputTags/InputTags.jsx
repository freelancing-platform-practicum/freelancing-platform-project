import { useEffect } from 'react';
import '../InputMultipleSelect/InputMultipleSelect.css';
import './InputTags.css';

function InputTags({ name, isDisabled, tags, setTags, handleChange, error }) {
  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;
    const { value } = event.target;
    if (!value.trim()) return;

    setTags([...tags, value]);
    event.target.value = '';
    event.preventDefault();
  }

  function removeTag(searchIndex) {
    if (isDisabled) return;
    setTags(tags.filter((_, index) => index !== searchIndex));
  }

  useEffect(() => {
    handleChange('tags', tags);
  }, [tags]);

  return (
    <>
      <div
        className={`tags${isDisabled ? ' tags_disabled' : ''}${tags?.length > 0 ? ' tags_filed' : ''}`}
      >
        {(!isDisabled || tags.length === 0) && (
          <input
            name={name}
            type="text"
            onKeyDown={handleKeyDown}
            className="tag__input"
            placeholder="Начните вводить и нажмите Enter"
            disabled={isDisabled}
          />
        )}
        {tags.map((tag, index) => (
          <div
            className={`tag__title${isDisabled ? ' tag__title_disabled' : ''}`}
            key={index}
            onClick={() => !isDisabled && removeTag(index)}
          >
            {tag}
            {!isDisabled && <span className="tag__item-close" />}
          </div>
        ))}
      </div>
      {error ? <span>{error}</span> : ''}
    </>
  );
}

export { InputTags };
