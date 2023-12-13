import { createContext } from 'react';
import { useForm, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

export type handlersType = {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
}

// export AppContext => create context
const AppContext = createContext({});
const Provider = AppContext.Provider;

function AppProvider ({ children }) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const handlers: handlersType = { register, errors };
  const token = localStorage.getItem('token');

  return (
    <Provider value={{ handlers, handleSubmit, token }}>
      { children }
    </Provider>
  );
}

export default AppProvider;
export { AppContext };
