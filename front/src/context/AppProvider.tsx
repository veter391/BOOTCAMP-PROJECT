import { createContext, useState } from 'react';
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
  // loged state
  const storageToken = localStorage.getItem('token');
  const token = storageToken && storageToken !== 'undefined' ? storageToken : false;
  // Oscar--> create state of user and send it via context to all the app
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  function userSetter (user, token) {
    const userLS = { ...user, token };
    localStorage.setItem('user', JSON.stringify(userLS));
    setUser(userLS);
  }
  function userLogOut () {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <Provider value={{ handlers, handleSubmit, token, user, userSetter, userLogOut }}>
      { children }
    </Provider>
  );
}

export default AppProvider;
export { AppContext };
