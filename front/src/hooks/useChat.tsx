import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { _url } from '../services/configVariables';

type idType = string | number;

type SessionUserType = {
  id: string;
  first_name: string;
  org_name:string;
  name: string | string;
  email: string;
  photoUrl: string;
  welcomeMessage: string;
  role: string;
  avatar: string;
  sender_id:number;
  receiver_id:number;
  room_id: string;
}

type FilteredUser = {
  id: string;
  otherId: number;
  name: string | undefined;
  email: string;
  photoUrl: string;
  welcomeMessage: string;
  role: string;
}

type TemplateType = {
  roomID: string;
  meData: FilteredUser | string;
  otherUser: FilteredUser | string;
}

const templateType: TemplateType = {
  roomID: '',
  meData: '',
  otherUser: ''
};

export default function useChat (meID: idType, otherID: idType) {
  const [chatTemplate, setChatTemplate] = useState(templateType);
  const [loading, setLoading] = useState(true);

  function error (err: unknown) {
    console.log(err);
    const errorObj: TemplateType = {
      roomID: 'error',
      meData: 'error',
      otherUser: 'error'
    };

    setChatTemplate((errorObj));
    // quit loader if chat exist
    setLoading(false);
  }

  function oneToOneConnect (data: SessionUserType[], room: string) {
    // N: check if two users exists
    if (data.length !== 2) {
      throw new Error('somesing is wrong one of users not exist');
    }
    // modify user object and return simple user objects
    const myObject = data.map((user: SessionUserType): FilteredUser => {
      return {
        id: user.id,
        otherId: user.id === meID ? user.receiver_id : user.sender_id,
        name: user.first_name || user.org_name,
        email: user.email,
        photoUrl: `${_url}/${user.avatar}` || './img/user.png',
        welcomeMessage: otherID === 63 ? `hola, soy ${user.first_name}.\nDe momento tengo poca lógica,\npero espero poder ayudarte en el futuro.\nPodré responder preguntas relacionadas con nuestra plataforma\ny ayudar si surge algún malentendido.\n\ncon amor tu ${user.first_name} ;)` : `Hola soy ${user.first_name}!`,
        role: 'default'
      };
    });

    // N: add all changes to object and return it
    return {
      usersList: myObject,
      chats: {
        room,
        users: [meID, otherID]
      }
    };
  }

  useEffect(() => {
    async function createRoom (userid1: idType, userid2: idType) {
      const roomID = uuidv4();
      await fetch(`${_url}/chat`, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: roomID,
          sender_id: userid1,
          receiver_id: userid2
        })
      }).then(response => response.json())
        .then((data) => {
          // N: check to error
          if (data.error) {
            throw new Error('Something is wrong, the user may no longer exist in the database.');
          }

          console.log('CREATED NEW CHAT => ;)');
          return data;
        })
        .then(data => oneToOneConnect(data, roomID))
        .then(data => {
          const { usersList, chats } = data;
          const { room } = chats;
          // N: render chat and define chat tools
          setChatTemplate(old => ({
            ...old,
            roomID: room,
            meData: usersList[0].id === meID ? usersList[0] : usersList[1],
            otherUser: usersList[1].id === otherID ? usersList[1] : usersList[0]
          }));

          // quit loader if chat exist
          return setLoading(false);
        })
        .catch(err => error(err));
    }

    async function getUsers () {
      await fetch(`${_url}/chat`, {
        method: 'GET',
        // body: JSON.stringify({name: 'Alex'}),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((data: SessionUserType[]) => {
          const patern = (data: SessionUserType) => (data.sender_id === meID && data.receiver_id === otherID) || (data.receiver_id === meID && data.sender_id === otherID);

          const findChat = data.find(user => patern(user));

          // N: create chat if room not exists and continue.)
          if (findChat === undefined) {
            createRoom(meID, otherID);
          } else {
            console.log('CHAT EXIST =>');
            // N: filter data and return two users
            const newData = data.filter(user => patern(user));

            // check if is the same room
            const meRoom = newData[0].room_id;
            const otherRoom = newData[1].room_id;
            const roomID = meRoom === otherRoom ? meRoom : '';

            return oneToOneConnect(newData, roomID);
          }
        })
        .then(data => {
          if (!data) return;
          const { usersList, chats } = data;
          const { room } = chats;
          // N: render chat and define chat tools
          setChatTemplate(old => ({
            ...old,
            roomID: room,
            meData: usersList[0].id === meID ? usersList[0] : usersList[1],
            otherUser: usersList[1].id === otherID ? usersList[1] : usersList[0]
          }));

          // quit loader if chat exist
          setLoading(false);
        })
        .catch(err => error(err));
    }
    getUsers();
  }, []);

  return { chatTemplate, loading };
}

export type {
  SessionUserType
};
