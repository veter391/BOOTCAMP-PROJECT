import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
      await fetch('http://localhost:5000/chat', {
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

      return;
      // return getUsers();
    }

    async function getUsers () {
      await fetch('http://localhost:5000/chat', {
        method: 'GET',
        // body: JSON.stringify({name: 'Alex'}),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (!data) return;

          const patern = (data) => (data.sender_id === meID && data.receiver_id === otherID) || (data.receiver_id === meID && data.sender_id === otherID);

          const findChat = data.find(user => patern(user));

          console.log(findChat); //! -------

          // N: create chat if room not exists and continue.)
          if (findChat === undefined) {
            createRoom(meID, otherID);
            console.log('creating=>', meID, otherID);
            return;
          } else {
            console.log('CHAT EXIST =>');
            // N: filter data and return two users
            const newData = data.filter(user => patern(user));

            console.log(newData, data); //! -------
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
                id: user.joing_id,
                otherId: user.joing_id === meID ? user.receiver_id : user.sender_id,
                name: user.user_name || user.org_name,
                email: user.email || user.org_email,
                photoUrl: user.avatar || user.org_avatar || './img/user.png',
                welcomeMessage: `Hi from ${user.first_name}!`,
                role: 'default'
              };
            });

// "joing_id": 11,
// "sender_id": 1,
// "receiver_id": 11,
// "user_name": "user",
// "user_email": "user@gmaiol.com",
// "user_city": "igualada",
// "user_avatar": null,
// "org_name": null,
// "org_email": null,
// "org_city": null,
// "org_avatar": null,


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
