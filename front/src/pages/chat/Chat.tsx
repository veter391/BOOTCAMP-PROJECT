import { useCallback, useContext } from 'react';
import { Session, Inbox } from '@talkjs/react';
import Talk from 'talkjs';
import './chat.scss';
import useChat, { SessionUserType } from '../../hooks/useChat';
import { AppContext } from '../../context/AppProvider';
import Spinner from '../../components/spinner/Spinner';

type SessionType = {
  room: string | number;
  me: SessionUserType;
  otherUser: SessionUserType;
  // setLoading: (p: boolean) => void;
}

function Chat () {
  // N: users id's
  /* @ts-ignore */
  const { user, interlocutor } = useContext(AppContext);
  const newInterlocutor = user.user.id === interlocutor ? 63 : interlocutor;
  // get loading state and chat data
  const { loading, chatTemplate } = useChat(user.user.id, newInterlocutor);

  const { roomID, meData, otherUser }:any = chatTemplate;

  return (
    <section className='chat'>
      <div className="container chat__container">
        <h2 className='subtitle chat__title'>Chat</h2>
        {loading && <Spinner />}
        {/* N: login chat and set chat params */}
        {!loading && chatTemplate && <ChatSession room={roomID} me={meData} otherUser={otherUser} />}

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
