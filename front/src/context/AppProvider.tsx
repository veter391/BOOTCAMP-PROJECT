import { ReactNode, createContext, useState } from 'react';
import { useForm, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

export type handlersType = {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
}

type AppProviderProps = {
  children: ReactNode
}

// export AppContext => create context
const AppContext = createContext({});
const Provider = AppContext.Provider;

function AppProvider ({ children }: AppProviderProps) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const handlers: handlersType = { register, errors };
  // Oscar--> create state of user and send it via context to all the app
  const [user, setUser] = useState(() => {
    const userLS = localStorage.getItem('user');
    if (!userLS) return null;
    return JSON.parse(userLS);
  });
  const [interlocutor, setInterlocutor] = useState();

  function userSetter (user: object, token: string) {
    // N: check if user and token exist and then add data to localStorage if not user = null
    const userLS = token && user ? { ...user, token } : null;
    localStorage.setItem('user', JSON.stringify(userLS));
    setUser(userLS);
  }
  function userLogOut () {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <Provider value={{ handlers, handleSubmit, user, userSetter, userLogOut, interlocutor, setInterlocutor }}>
      { children }
    </Provider>
  );
}

export default AppProvider;
export { AppContext };
