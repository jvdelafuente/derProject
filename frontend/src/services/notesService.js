// importamos la función que retorna el token
import { getToken } from "../utils/getToken";

// importamos la variable de entorno de la URL
const baseURL = import.meta.env.VITE_API_URL;

// petición para publiación de una nota
export const newNotesService = async (formData) => {
  const token = getToken();
  
  const res = await fetch(`${baseURL}/notes`, {
    method: "post",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  
  const body = await res.json();
  
  return body;
};
export const deleteCommentService = async (commentId) => {
  const token = getToken();
    const response = await fetch(`${baseURL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token, // Reemplaza `yourAuthToken` con el token real
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
};
// eliminar una nota
export const deleteNotesService = async (post_id) => {
  const token = getToken();

  const res = await fetch(`${baseURL}/notes/${post_id}`, {
    method: "delete",
    headers: {
      Authorization: token,
    },
  });

  const body = await res.json();

  return body;
};

// dar voto y quitarlo a una nota
export const newVoteService = async (post_id, method) => {
  const token = getToken();
  
  const res = await fetch(`${baseURL}/notes/${post_id}/upVotes`, {
    method,
    headers: {
      Authorization: token,
    },
  });

  const body = await res.json();
  
  return body;
};

// lista de enlaces
export const getNotesService = async (searchParams) => {
  const token = getToken();

  const res = await fetch(`${baseURL}/notes?${searchParams}`, {
    headers: { 
      Authorization: token 
    } 
  });

  const body = await res.json();

  return body;
};
export const getCommentsService = async (post_id) => {
    const response = await fetch(`/posts/${post_id}/comments`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
};
// lista de enlaces populares
export const getTrendingNotesService = async () => {
  const token = getToken();
  const res = await fetch(`${baseURL}/notes/trending`, {
    headers: {
      Authorization: token
    }
  });
  const body = await res.json();
  return body;
};
export const createCommentService = async (post_id, content) => {
  const token = getToken();

  // Realizamos la solicitud fetch
  const res = await fetch(`${baseURL}/notes/${post_id}/comments`, {
    method: "POST", // Usamos el método POST para crear un nuevo comentario
    headers: {
      "Content-Type": "application/json", // Indicamos que estamos enviando JSON
      "Authorization": token, // Asegúrate de que el token esté bien formateado
    },
    body: JSON.stringify({ content }), // Convertimos el contenido a JSON
  });

  // Verificamos si la respuesta es exitosa
  if (!res.ok) {
    throw new Error('Failed to create comment');
  }

  // Convertimos la respuesta a JSON
  const body = await res.json();

  // Retornamos el comentario creado
  return body.data.comment;
};