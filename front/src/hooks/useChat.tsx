import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { _url } from '../services/configVariables';

type idType = string | number;

type SessionUserType = {
  id: string | number,
  first_name: string,
  name: string,
  email: string,
  photoUrl: string,
  welcomeMessage: string,
  role: string,
  avatar: string
}

export default function useChat (meID: idType, otherID: idType) {
  const [chatTemplate, setChatTemplate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createRoom (userid1: idType, userid2: idType) {
      await fetch(`${_url}/chat`, {
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
      console.log('CREATED NEW CHAT => ;)');

      return getUsers();
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
          if (!data) return;

          // N: create chat if room not exists and continue.)
          if (!data.find(user => user.id === meID) && !data.find(user => user.id === otherID)) {
            createRoom(meID, otherID);
            return;
          } else {
            console.log('CHAT EXIST =>');
          }

          // N: filter data and return two users
          const newData = data.filter(user => user.id === meID || user.id === otherID);

          // N: check if two users exists
          if (newData.length !== 2) {
            console.error('error somesing is wrong one of id unexist require [el1, el2] returned data: ' + newData);
            return {
              usersList: [meID, otherID],
              chats: {
                room: 'error',
                users: [meID, otherID]
              }
            };
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
              name: user.first_name,
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
        .catch(err => console.log(err));
    }
    getUsers();
  }, []);

  return { chatTemplate, loading };
}

export type {
  SessionUserType
};
