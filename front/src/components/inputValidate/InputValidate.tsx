import './inputValidate.scss';
import { handlersType } from '../login/Login';

type ValidInputType = {
  type: string;
  placeholder: string;
  className: string;
  classNameLabel: string;
  handlers: handlersType;
  name: string;
  scheme: object;
}

function InputValidate ({ type, placeholder, className, classNameLabel, handlers, name, scheme }: ValidInputType) {
  const { errors, register } = handlers;
  return (
    <label className={classNameLabel}>
      {errors[name] && <div className='is-invalid'>{errors[name].message}</div>}
      <input className={className} type={type} placeholder={placeholder}
        {...register(name, scheme)}
      />
    </label>
  );
}

export default InputValidate;
