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
  const [getFollows, setFollows] = useState();
  const [getReactions, setReactions] = useState();
  // const [getFollows, setFollows] = useState(JSON.parse(localStorage.getItem('user')).user.follows);
  // const [getReactions, setReactions] = useState(JSON.parse(localStorage.getItem('user')).user.reactions);

  function userSetter (data) {
    const { user, token } = data;
    // N: check if user and token exist and then add data to localStorage if not user = null
    console.log(data);
    const userLS = token && user ? data : null;
    localStorage.setItem('user', JSON.stringify(userLS));
    setUser(userLS);
    setFollows(user.follows);
    setReactions(user.reactions);
  }

  const navigate = useNavigate();

  function userLogOut () {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <Provider value={{ handlers, handleSubmit, user, userSetter, userLogOut, interlocutor, setInterlocutor, getFollows, setFollows, getReactions, setReactions}}>
      { children }
    </Provider>
  );
}

export default AppProvider;
export { AppContext };
