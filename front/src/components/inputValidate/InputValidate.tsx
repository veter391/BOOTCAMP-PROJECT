import './inputValidate.scss';
import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

type ValidInputType = {
  type: string;
  placeholder: string;
  className: string;
  classNameLabel: string;
  name: string;
  scheme: object;
}

function InputValidate ({ type, placeholder, className, classNameLabel, name, scheme }: ValidInputType) {
  // get variavles from context
  const { handlers } : any = useContext(AppContext);
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

function AreaValidate({ type, placeholder, className, classNameLabel, name, scheme }: ValidInputType) {
  // get variavles from context
  const { handlers }: any = useContext(AppContext);
  const { errors, register } = handlers;

  return (
    <label className={classNameLabel}>
      {errors[name] && <div className='is-invalid'>{errors[name].message}</div>}
      <textarea style={{resize: 'none' }} className={className} type={type} placeholder={placeholder}
        {...register(name, scheme)}
      />
    </label>
  );
}

export { InputValidate, AreaValidate };
