<<<<<<< HEAD
import DB from '../../db/configDB.js'

  //seguir a un usuario
  const followUser = async (req, res) => {
      try {
        const { follower_id, user_id } = req.body;
        const dbInfo = await DB.sendQuery(DB.query.followUser, [follower_id, user_id]);
        res.status(201).json({ dbInfo, ...req.body, message: 'Usuario seguido exitosamente' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  
  //dejar de seguir a un usuario
  const unfollowUser = async (req, res) => {
    try {
      const { follower_id, user_id } = req.body;
      const dbInfo = await DB.sendQuery(DB.query.unfollowUser, [follower_id, user_id]);
      res.status(200).json({ dbInfo, ...req.body, message: 'Dejaste de seguir al usuario' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //obtener los seguidores de un usuario
  const getFollowers = async (req, res) => {
    try {
      const { user_id } = req.params;
      const followers = await DB.sendQuery(DB.query.getFollowers, [user_id]);
      res.status(200).json({ followers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //obtener a quiénes sigue un usuario
  const getFollowing = async (req, res) => {
    try {
      const { user_id } = req.params;
      const following = await DB.sendQuery(DB.query.getFollowing, [user_id]);
      res.status(200).json({ following });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export default {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
  };
=======
import DB from '../../db/configDB.js';
// import DB from '../../db/configDB.js';

// seguir a un usuario
const follow = async (req, res) => {
  try {
    const { followed, follower, type} = req.body;

    if (type === 'user') {
      const dbInfo = await DB.sendQuery(DB.query.followUser, [followed, follower]);
      res.status(201).json({ dbInfo, ...req.body, message: 'Usuario seguido exitosamente' });
      
    } else if(type === 'org') {
      const dbInfo = await DB.sendQuery(DB.query.followOrganization, [followed, follower]);
      res.status(201).json({ dbInfo, ...req.body, message: 'Organizacion seguida exitosamente' });

    } else{
      res.status(404).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// dejar de seguir a un usuario
const unfollowUser = async (req, res) => {
  try {
    const { followed, follower, type} = req.body;
    // const dbInfo = await DB.sendQuery(DB.query.unfollowUser, [followed, user_id]);
    
    if (type === 'user') {
      const dbInfo = await DB.sendQuery(DB.query.unfollowUser, [followed, follower]);
      res.status(200).json({ dbInfo, ...req.body, message: 'Dejaste de seguir al usuario' });
      
    } else if(type === 'org') {
      const dbInfo = await DB.sendQuery(DB.query.unfollowOrganization, [followed, follower]);
      res.status(200).json({ dbInfo, ...req.body, message: 'Dejaste de seguir a la organización' });

    } else{
      res.status(404).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// obtener los seguidores de un usuario
const getFollowers = async (req, res) => {
  try {
    const { user_id } = req.params;
    const followers = await DB.sendQuery(DB.query.getFollowers, [user_id]);
    res.status(200).json({ followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtener a quiénes sigue un usuario
const getFollowingUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const following = await DB.sendQuery(DB.query.getFollowing, [user_id]);
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//CRUD FOLLOWE ORGANIZATION

export default {
  follow,
  unfollowUser,
  getFollowers,
  getFollowingUser
};
>>>>>>> fixedBugsBack/jose
