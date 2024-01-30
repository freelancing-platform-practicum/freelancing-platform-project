import './Button.css';

function Button({
  text,
  width,
  height,
  marginTop,
  marginBottom,
  buttonSecondary,
  buttonBlack,
  buttonWhite,
  type = 'button',
  onClick,
  disabled,
  border,
  fontSize,
  fontWeight,
  opacity,
  value,
}) {
  return (
    <button
      className={`button${
        disabled ? ' button_type_disabled' : buttonSecondary ? ' button_type_secondary' : ''
      }${buttonWhite ? ' button_color_white' : ''}${buttonBlack ? ' button_color_black' : ''}`}
      style={{
        width,
        height,
        marginTop,
        marginBottom,
        border,
        fontSize,
        fontWeight,
        opacity,
      }}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
      value={value}
    >
      <span
        className={`button__text${
          buttonSecondary ? ' button_type_secondary__text' : ''
        } button__text${buttonBlack ? ' button_color_black__text' : ''}`}
      >
        {text}
      </span>
    </button>
  );
}

export { Button };
