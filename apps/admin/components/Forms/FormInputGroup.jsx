import PropTypes from 'prop-types';
import cx from 'classnames';
import FormError from './FormError';
import FormTextInput from './FormTextInput';
import FormTextArea from './FormTextArea';
import FormFileInput from './FormFileInput';

/**
 * Input group that contains a label, input and error message
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns An input group that contains a label, input and error message
 */
const FormInputGroup = ({
  register,
  type,
  error,
  onError,
  onValid,
  label,
  name,
  customValidation,
  placeholder,
  required,
  hideError,
  className,
  style,
}) => (
  <div className={cx(className, 'form-control')} style={style}>
    <div className="label pt-0">
      <span className="label-text">
        {label} {!required ? '(optional)' : ''}
      </span>
    </div>
    {
      // Render a text input if the type is text
      (!type || type === 'text') && (
        <FormTextInput
          register={register}
          isErrored={error}
          label={label}
          name={name}
          customValidation={{ ...customValidation }}
          placeholder={placeholder}
          required={required}
        />
      )
    }
    {
      // Render a textarea if the type is textarea
      type && type === 'textarea' && (
        <FormTextArea
          register={register}
          isErrored={error}
          label={label}
          name={name}
          customValidation={{ ...customValidation }}
          placeholder={placeholder}
          required={required}
        />
      )
    }
    {
      // Render a file input if the type is fileinput
      type && type === 'fileupload' && (
        <FormFileInput
          register={register}
          isErrored={error}
          onError={onError}
          onValid={onValid}
          label={label}
          name={name}
          customValidation={{ ...customValidation }}
          placeholder={placeholder}
          required={required}
        />
      )
    }
    {
      // Show the error if hideError is not set
      !hideError && <FormError error={error} />
    }
  </div>
);

const propTypes = {
  register: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  onError: PropTypes.func,
  onValid: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation: PropTypes.object,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  hideError: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormInputGroup.propTypes = propTypes;

export default FormInputGroup;