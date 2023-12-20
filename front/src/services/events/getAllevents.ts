import { eventDataType } from '../../components/eventFeed/EventFeed';
import { _url } from '../configVariables';

async function getEvents () {
  return await fetch(`${_url}/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => {
      return data.map((item: eventDataType) => ({
        id: item.id,
        user: item.user_id,
        title: item.title,
        description: item.description,
        city: item.city,
        address: item.address,
        name: item.org_name || `${item.first_name} ${item.last_name}`,
        avatar: item.avatar,
        date: item.date,
        type: item.type,
        finished: item.is_finished
      }));
    })
    .catch(err => console.log(err));
}

export default getEvents;
