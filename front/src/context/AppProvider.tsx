import { ReactNode, createContext, useState } from 'react';
import { useForm, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type handlersType = {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
}

type AppProviderProps = {
  children: ReactNode;
}

type userData = {
  id: number;
  name: string;
  avatar: string;
  location: string;
  description: string;
  follows: number[];
  reactions: number[];
}

type userLSData = {
  user: userData;
  token: string;
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

  console.log(user);
  
  const updateAvatar = (newAvatar: string) => {
    const updatedUser = { ...user, user: { ...user.user, avatar: newAvatar } }

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  // N: set interlocutor
  const [interlocutor, setInterlocutor] = useState();

  const [getFollows, setFollows] = useState(() => {
    const userLS = localStorage.getItem('user');
    if (!userLS) return [];
    return JSON.parse(userLS).user.follows;
  });
  const [getReactions, setReactions] = useState(() => {
    const userLS = localStorage.getItem('user');
    if (!userLS) return [];
    return JSON.parse(userLS).user.reactions;
  });

  // // ---
  // const [followsStack, setFollowsStack] = useState(() => {
  //   const userLS = localStorage.getItem('user');
  //   if (!userLS) return [];
  //   const data = JSON.parse(userLS);
  //   return data.user.follows;
  // });

  // const [reactionsStack, setReactionsStack] = useState(() => {
  //   const userLS = localStorage.getItem('user');
  //   if (!userLS) return [];
  //   const data = JSON.parse(userLS);
  //   return data.user.reactions;
  // });

  function userSetter (data: userLSData) {
    const { user, token }: { user: userData, token: string } = data;
    // N: check if user and token exist and then add data to localStorage if not user = null
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
  // console.log('check using of setStacks!!')
  return (
    <Provider value={{ handlers, handleSubmit, user, userSetter, userLogOut, interlocutor, setInterlocutor, getFollows, setFollows, getReactions, setReactions, updateAvatar }}>
      { children }
    </Provider>
  );
}

export default AppProvider;
export { AppContext };
