// importamos la variable de entorno de la URL
const baseURL = import.meta.env.VITE_API_URL;

// importamos la función que retorna el token
import { getToken } from "../utils/getToken";

export const getFollowersService = async (user_id) => {
    const token = getToken();
    const res = await fetch(`${baseURL}/users/${user_id}/followers`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();
    return body.map(follower => ({
        id: follower.id,
        username: follower.username,
        avatar: follower.avatar,
    }));
};
export const followUserService = async (user_id) => {
    const token = getToken();
    const res = await fetch(`${baseURL}/users/${user_id}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    const body = await res.json();
    return body;
};
export const unfollowUserService = async (user_id) => {
    const token = getToken();
    const res = await fetch(`${baseURL}/users/${user_id}/unfollow`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    const body = await res.json();
    return body;
};

// Servicio para obtener las personas a las que sigue un usuario
export const getFollowingService = async (user_id) => {
    const token = getToken();
    const res = await fetch(`${baseURL}/users/${user_id}/following`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();
    return body.map(following => ({
        id: following.id,
        username: following.username,
        avatar: following.avatar,
    }));
};


// Otros servicios
export const signUpService = async (username, email, password) => {
  const res = await fetch(`${baseURL}/users/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const body = await res.json();
  return body;
};

export const signInService = async (email, password) => {
  const res = await fetch(`${baseURL}/users/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const body = await res.json();
  return body;
};

export const updateProfileService = async (
  user_id,
  username,
  email,
  password
) => {
  const token = getToken();
  const res = await fetch(`${baseURL}/users/${user_id}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const body = await res.json();
  return body;
};

export const updateAvatarService = async (user_id, avatar) => {
  const token = getToken();
  const res = await fetch(`${baseURL}/users/${user_id}/avatar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      avatar,
    }),
  });

  const body = await res.json();
  return body;
};

export const getPrivateProfile = async () => {
  const token = getToken();
  const res = await fetch(`${baseURL}/users`, {
    headers: {
      Authorization: token,
    },
  });

  const body = await res.json();
  return body;
};
export const getPublicUserProfile = async (user_id) => {
    const token = getToken();
    const res = await fetch(`${baseURL}/users/${user_id}`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();
    return body;
};

export const updateBioService = async (user_id, bio) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/users/${user_id}/bio`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ bio }),
    });

    if (!res.ok) {
        throw new Error('Failed to update bio');
    }

    const body = await res.json();
    return body.data.user;
};
export const getBioService = async (user_id) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/users/${user_id}/bio`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch bio');
    }

    const body = await res.json();
    return body.data.bio;
};