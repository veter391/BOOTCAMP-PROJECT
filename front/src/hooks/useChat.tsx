import { useEffect, useState, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { _url } from '../services/configVariables';

type idType = string | number;

type SessionUserType = {
  id: string | number,
  first_name: string,
  name: string | string,
  email: string,
  photoUrl: string,
  welcomeMessage: string,
  role: string,
  avatar: string
}

const templateType : {
  roomID: string | number | any,
  meData: string | number | any,
  otherUser: string | number | any
} = {
  roomID: '',
  meData: '',
  otherUser: ''
};

export default function useChat (meID: idType, otherID: idType) {
  const [chatTemplate, setChatTemplate] = useState(templateType);
  const [loading, setLoading] = useState(true);

  function error (err: unknown) {
    // quit loader if chat exist
    setLoading(false);
    console.log(err);
    const errorObj : any = {
      roomID: 'error',
      meData: 'error',
      otherUser: 'error'
    };

    setChatTemplate((errorObj));
  }

  useEffect(() => {
    async function createRoom (userid1: idType, userid2: idType) {
      return await fetch(`${_url}/chat`, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: uuidv4(),
          sender_id: userid1,
          receiver_id: userid2
        })
      });
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
        .then(data => {
          if (!data) throw new Error('data not found');

          const patern = (data) => (data.sender_id === meID && data.receiver_id === otherID) || (data.receiver_id === meID && data.sender_id === otherID);

          const findChat = data.find(user => patern(user));

          // N: create chat if room not exists and continue.)
          if (findChat === undefined) {
            createRoom(meID, otherID)
              .then(response => response.json())
              .then((data) => {
                if (!data) {
                  console.log('CREATED NEW CHAT => ;)');
                  getUsers();
                } else {
                  throw new Error('Something is wrong, the user may no longer exist in the database.');
                }
              })
              .catch(err => error(err));
          } else {
            console.log('CHAT EXIST =>');
            // N: filter data and return two users
            const newData = data.filter(user => patern(user));

            // N: check if two users exists
            if (newData.length !== 2) {
              throw new Error('somesing is wrong one of id unexist require [el1, el2] returned data: ' + newData);
            }

            // check if is the same room
            const meRoom = newData[0].room_id;
            const otherRoom = newData[1].room_id;
            const roomID = meRoom === otherRoom ? meRoom : '';

            // modify user object and return simple user objects
            const myObject = newData.map((user: SessionUserType) => {
              return {
                id: user.id,
                otherId: user.id === meID ? user.receiver_id : user.sender_id,
                name: user.first_name || user.org_name,
                email: user.email,
                photoUrl: user.avatar || './img/user.png',
                welcomeMessage: `Hi from ${user.first_name}!`,
                role: 'default'
              };
            });

            // N: add all changes to object and return it
            return {
              usersList: myObject,
              chats: {
                room: roomID,
                users: [meID, otherID]
              }
            };
          }
        })
        .then(data => {
          if (!data) throw new Error('data not found');

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
