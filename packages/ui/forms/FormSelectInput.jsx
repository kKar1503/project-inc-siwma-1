import cx from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FormSelect = ({
  name,
  label,
  options,
  customValidation,
  required,
  success,
  isLoading,
  className,
  style,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hookInput = (inputName, inputLabel, validations) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      ...validations,
    });

  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton className="h-12" />
    ) : (
      <select
        className={cx(className, 'select input-bordered', {
          'input-error': errors[name],
          'input-success': success,
        })}
        {...hookInput(name, label, customValidation)}
        style={style}
      >
        {options.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
    )
  );
};

FormSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  customValidation: PropTypes.object,
  required: PropTypes.bool,
  success: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormSelect;
