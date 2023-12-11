import { useCallback, useEffect, useState } from 'react';
// import { Session, Inbox } from '@talkjs/react';
// import Talk from 'talkjs';
import './chat.scss';

type SessionUserType = {
  id: string,
  name: string,
  email: string,
  photoUrl: string,
  welcomeMessage: string,
  role: string
}

type SessionType = {
  room: string;
  me: SessionUserType;
  otherUser: SessionUserType;
  // setLoading: (p: boolean) => void;
}

function Chat () {
  // N: unic room id
  const roomID = 'room-1';
  // N: user data and unic id
  // const userData = {
  //   id: 'rick',
  //   name: 'rick',
  //   email: 'nina@example.com',
  //   photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
  //   welcomeMessage: 'Hi!',
  //   role: 'default'
  // };
  // // N: second user data and unic id
  // const seccionWithUser = {
  //   id: 'frank',
  //   name: 'Frank',
  //   email: 'frank@example.com',
  //   photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
  //   welcomeMessage: 'Hey, how can I help?',
  //   role: 'default'
  // };

  // const bar = document.querySelector('.NoticeBar');
  // console.log(bar);

  const seccionWithUser = {
    id: 'rick',
    name: 'rick',
    email: 'nina@example.com',
    photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
    welcomeMessage: 'Hi!',
    role: 'default'
  };
  const userData = {
    id: 'frank',
    name: 'Frank',
    email: 'frank@example.com',
    photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
    welcomeMessage: 'Hey, how can I help?',
    role: 'default'
  };

  // ! N: add to context !
  const [loading, setLoading] = useState(true);
  return (
    <section className='chat'>
      <div className="container chat__container">
        <h2 className='subtitle chat__title'>Chat</h2>
        {/* N: login chat and set chat params */}
        {< ChatSession room={roomID} me={userData} otherUser={seccionWithUser} />}
      </div>
    </section>
  );
}

function ChatSession ({ room, me, otherUser }: SessionType) {
  const syncUser = useCallback(() => new Talk.User(me), []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const syncConversation = useCallback((session : any) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation(room);

    const other = new Talk.User(otherUser);
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);
    return conversation;
  }, []);

  return (
    <Session appId="tX5s7GAz" syncUser={syncUser}>
      <Inbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: 'calc(68vh)', minHeight: '400px' }}
        className='chat__body'
      ></Inbox>
    </Session>
  );
}

export default Chat;
