import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type idType = string | number;

type SessionUserType = {
  id: string | number,
  name: string,
  email: string,
  photoUrl: string,
  welcomeMessage: string,
  role: string
}

export default function useChat (meID: idType, otherID: idType) {
  const [chatTemplate, setChatTemplate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createRoom (newRoomID: idType, userid1: idType, userid2: idType) {
      // await fetch('./files/users.json/chats', {
      //   method: 'POST',
      //   headers: {
      //     // 'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     room: uuidv4(), users: [2, 1]
      //   })
      // });
      // create new room id and add users
      const newRoom = {
        room: newRoomID,
        users: [userid1, userid2]
      };

      // chats.push(newRoom);
      console.log(newRoom);
    }

    async function getUsers () {
      await fetch('http://localhost:8080/chat', {
        method: 'GET',
        // body: JSON.stringify({name: 'Alex'}),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // N: check if ids exist
          // const meId = data.users.find((user: { id: number }) => user.id === meID);
          // const otherId = data.users.find((user: { id: number }) => user.id === otherID);
          // let room: string | number,
          //   personalData: SessionUserType,
          //   otherUserData: SessionUserType;
          // // N: check if ids exist and if not throw error
          // if (!meId || !otherId) {
          //   throw new Error(`users with id ${meID} or ${otherID} doesn't exist in data base!`);
          // }

          // // N: check if room exist and if not create new room
          // chats.forEach(chat => {
          //   if (chat.users.includes(meID) && chat.users.includes(otherID)) {
          //     // N: modify room
          //     room = chat.room;

          //     // N: modify users
          //     data.users.forEach((user: SessionUserType) => {
          //       if (user.id === meID || user.id === otherID) {
          //         const newUser = { ...user, role: 'default', welcomeMessage: `Hi from ${user.name}!` };

          //         if (user.id === meID) {
          //           personalData = newUser;
          //         }

          //         if (user.id === otherID) {
          //           otherUserData = newUser;
          //         }
          //       }
          //     });
          //     console.log('ROOM EXIST =>', chat.room, chatTemplate);
          //   } else {
          //     const newRoomID = uuidv4();
          //     // N: if romm doesn't exist create room
          //     createRoom(newRoomID, meID, otherID);

          //     data.users.forEach((user: SessionUserType) => {
          //       if (user.id === meID || user.id === otherID) {
          //         const newUser = { ...user, role: 'default', welcomeMessage: `Hi from ${user.name}!` };

          //         if (user.id === meID) {
          //           personalData = newUser;
          //         }

          //         if (user.id === otherID) {
          //           otherUserData = newUser;
          //         }
          //       }
          //     });

          //     room = newRoomID;
          //     console.log('CREATED NEW ROOM =>', chats);
          //   }
          // });

          // // N: define chat tools
          // setChatTemplate(old => ({
          //   ...old,
          //   roomID: room,
          //   meData: personalData,
          //   otherUser: otherUserData
          // }));
        })
        .then(() => setLoading(false))
        .catch(err => console.log(err));
    }
    console.log(chatTemplate);
    getUsers();
  }, []);

  return { chatTemplate, loading };
}

export type {
  SessionUserType
};
