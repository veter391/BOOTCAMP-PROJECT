import { createContext, useEffect, useState } from 'react';
import { useForm, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type handlersType = {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
}

// export AppContext => create context
const AppContext = createContext({});
const Provider = AppContext.Provider;

function AppProvider ({ children } : any) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const handlers: handlersType = { register, errors };
  // Oscar--> create state of user and send it via context to all the app
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || '');
  const [interlocutor, setInterlocutor] = useState();

  function userSetter (user: object, token: string) {
    // N: check if user and token exist and then add data to localStorage if not user = null
    const userLS = token && user ? { ...user, token } : null;
    localStorage.setItem('user', JSON.stringify(userLS));
    setUser(userLS);
  }

  const navigate = useNavigate();

  function userLogOut () {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <Provider value={{ handlers, handleSubmit, user, userSetter, userLogOut, interlocutor, setInterlocutor }}>
      { children }
    </Provider>
  );
}

export default AppProvider;
export { AppContext };
