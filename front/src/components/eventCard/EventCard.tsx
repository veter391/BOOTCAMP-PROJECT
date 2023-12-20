import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import './eventCard.scss';
import { useNavigate } from 'react-router-dom';
import followsAndReactions from '../../services/sendFollowsAndReactions';
import deleteFollowsAndReactions from '../../services/deleteFollowsAndReactions';
import { _url } from '../../services/configVariables';

type EventCardType = {
    eventID: number;
    userId: number;
    key: number;
    type: string;
    title: string;
    date: string;
    location: string;
    description: string;
    avatar: string | null;
    name: string;
  // userId: number;
  // title: string;
  // date: string;
  // location: string;
  // description: string;
  // avatar: string;
  // name: string;
  // type: string;
  // eventUser: number | string;
  // eventID: number;
  // reactions: number[];
  // followers: number[];
  // setFollowers: () => void;
  // setReactions: () => void;
}

type buttonChatProps = {
  reactions: never[];
  followers: never[];
  eventUser: number | string;
  user: {
    id: number
  };
  setInterlocutor: any;
}

function EventCard ({ eventID, userId, title, date, type = 'user', location, description, avatar, name }: EventCardType) {
  /* @ts-ignore */
  const { user, setInterlocutor, getFollows, setFollows, getReactions, setReactions, userSetter } = useContext(AppContext);
  const [follow, setFollow] = useState<boolean>();
  const [reaction, setReaction] = useState(getReactions.includes(eventID));

  useEffect(() => {
    setFollow(getFollows.includes(userId));
  }, [getFollows]);

  useEffect(() => {
    const newUser = { ...user, user: { ...user.user, reactions: getReactions } };
    userSetter(newUser);
  }, [reaction]);

  useEffect(() => {
    const newUser = { ...user, user: { ...user.user, follows: getFollows } };
    userSetter(newUser);
  }, [follow]);

  function newReaction () {
    setReaction(!reaction);
    setReactions((old: number[]) => {
      if (old.includes(eventID)) {
        deleteFollowsAndReactions({
          reactions: eventID + '',
          followers: ''
        });
        return old.filter((n: number) => n !== eventID);
      }

      followsAndReactions(
        {
          reactions: user.user.id + ',' + eventID,
          followers: ''
        }
      );

      return [eventID, ...old];
    });
  }

  function newFollow () {
    setFollow(!follow);
    setFollows((old: number[]) => {
      if (old.includes(userId)) {
        deleteFollowsAndReactions({
          reactions: '',
          followers: userId + ''
        });
        return old.filter((n: number) => n !== userId);
      }

      followsAndReactions(
        {
          reactions: '',
          followers: userId + ',' + user.user.id
        }
      );

      return [userId, ...old];
    });
  }

  // console.log(getFollows, getReactions, followsStack)

  return (
    <article className='event-card' style={{ display: 'flex' }}>
      <div className="event-card__body">
        <h3 className='event-card__title'>{title}</h3>
        <p className='event-card__descr'>{description}</p>
        <small className='event-card__location'>{location}</small>
        <small className='event-card__date'>{new Date(date).toUTCString()}</small>

        <div className="event-card__btns">
          <button onClick={newReaction} className={`event-card__btn event-card__btn-star btn-reset ${reaction && 'choused'}`}>
            <svg height="30" width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 47.94 47.94" xmlSpace="preserve">
              <path style={{ fill: 'currentColor' }} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                    c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                    c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                    c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                    c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                    C22.602,0.567,25.338,0.567,26.285,2.486z"/>
            </svg>
          </button>

          <button onClick={newFollow} className={`event-card__btn event-card__btn-star btn-reset ${follow && 'choused'}`}>
            <svg style={{ fill: 'currentColor' }} height="30" width="30" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3C9 4.65685 7.65685 6 6 6C4.34315 6 3 4.65685 3 3C3 1.34315 4.34315 0 6 0C7.65685 0 9 1.34315 9 3Z" />
              <path d="M0.61528 14.428C0.217975 14.1736 -0.0121527 13.721 0.0460496 13.2529C0.414158 10.292 2.93944 8 5.9999 8C9.06036 8 11.5856 10.2914 11.9537 13.2522C12.012 13.7203 11.7818 14.1729 11.3845 14.4273C9.83022 15.4225 7.98243 16 5.9999 16C4.01737 16 2.16959 15.4231 0.61528 14.428Z" />
              <path d="M15.25 3.75C15.25 3.33579 14.9142 3 14.5 3C14.0858 3 13.75 3.33579 13.75 3.75V5.75H11.75C11.3358 5.75 11 6.08579 11 6.5C11 6.91421 11.3358 7.25 11.75 7.25H13.75V9.25C13.75 9.66421 14.0858 10 14.5 10C14.9142 10 15.25 9.66421 15.25 9.25V7.25H17.25C17.6642 7.25 18 6.91421 18 6.5C18 6.08579 17.6642 5.75 17.25 5.75H15.25V3.75Z" />
            </svg>
          </button>

          {follow && <ButtonGoChat user={user.user} setInterlocutor={setInterlocutor} reactions={getReactions} followers={getFollows} eventUser={userId} />}
        </div>
      </div>

      <div className="event-card__info">
        <img className={`event-card__foto ${type === 'org' && 'event-card__foto-org'}`} src={ (avatar && `${_url}/${avatar}`) || './img/user.png'} alt="event image" />
        <h3 className='event-card__name' >{name}</h3>
      </div>
    </article>
  );
}

function ButtonGoChat ({ setInterlocutor, eventUser }: buttonChatProps) {
  const navigate = useNavigate();
  // N: go tu chat function
  const goToChat = () => {
    // set event user
    setInterlocutor(eventUser);
    navigate('/chat');
    // console.log('nnnnnnn', user)

    // let reactionValues = '';
    // let followerValues = '';
    // const followerValuesToDelete: number[] = [];
    // const reactionValuesToDelete: number[] = [];

    // console.log(reactions, reactionsStack);
    // followsStack.forEach((id: never) => {
    //   if (followers.includes(id)) {
    //     console.log('si', id);
    //     followers = followers.filter(n => n !== id);
    //   } else {
    //     console.log('no', id);
    //   }
    // });
    // console.log(followers, getFollows, followsStack)

    // reactionsStack.forEach((id: never) => {
    //   if (reactions.includes(id)) {
    //     // console.log('si', id);
    //     reactions = reactions.filter(n => n !== id);
    //   } else {
    //     // console.log('no', id);
    //   }
    // });
    // console.log(reactions);

    // reactionsStack.forEach(item => reactions.filter(el => item === el));
    // followsStack.forEach(item => reactions.filter(el => item === el));

    // console.log(reactions)
    // reactions.forEach(item => { reactionValues += `(${user.id},${item}) `; });
    // followers.forEach(item => { followerValues += `(${item},${user.id}) `; });

    // send reactions and follows to db

    // followsAndReactions(
    //   {
    //     reactions: reactionValues.trimEnd().split(' ').join(','),
    //     followers: followerValues.trimEnd().split(' ').join(',')
    //   }
    // );

    // deleteFollowsAndReactions({
    //   reactions: reactionValuesToDelete.join(),
    //   followers: followerValuesToDelete.join()
    // });
  };

  return (
    <button onClick={goToChat} className='event-card__btn btn-reset'>
      <svg style={{ fill: 'currentColor' }} height="30" width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 60 60" xmlSpace="preserve">
        <g>
          <path d="M55.894,37.041C58.582,33.271,60,28.913,60,24.414C60,11.504,48.337,1,34,1c-8.245,0-15.968,3.592-20.824,9.42
                        C17.021,8.613,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.235,14.77
                        c4.946,1.886,9.854,2.601,10.096,2.635c0.047,0.007,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554
                        c0.192-0.385,0.116-0.85-0.188-1.153C57.754,46.754,56.404,42.619,55.894,37.041z"/>
          <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.713-3.813,11.666
                        c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.139-0.01
                        c0.35-0.049,8.433-1.213,14.317-4.586c3.33,1.334,6.875,2.01,10.544,2.01c14.336,0,26-10.504,26-23.414S40.337,9.586,26,9.586z
                        M19.5,25h14c0.552,0,1,0.447,1,1s-0.448,1-1,1h-14c-0.552,0-1-0.447-1-1S18.948,25,19.5,25z M39,41H14c-0.552,0-1-0.447-1-1
                        s0.448-1,1-1h25c0.552,0,1,0.447,1,1S39.552,41,39,41z M39,34H14c-0.552,0-1-0.447-1-1s0.448-1,1-1h25c0.552,0,1,0.447,1,1
                        S39.552,34,39,34z"/>
        </g>
      </svg>
    </button>
  );
}

export default EventCard;
