// import axios from "axios";


// // Instancia de axios para hacer peticiones
// const instance = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: false,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Funciones para cada uno de los recursos

// // 1. Usuarios
// export const getUsuarios = async () => {
//   try {
//     const response = await instance.get('/0');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener Usuario:", error);
//     throw error;
//   }
// };

// export const crearUsuario = async (usuarioData) => {
//   try {
//     const response = await instance.post('/0/data/usuarios', usuarioData);
//     return response.data;
//   } catch (error) {
//     console.error("Error al crear usuario:", error);
//     throw error;
//   }
// };

// export const actualizarUsuario = async (usuarioId, usuarioData) => {
//   try {
//     const response = await instance.put(`/0/${usuarioId}`, usuarioData);
//     return response.data;
//   } catch (error) {
//     console.error("Error al actualizar usuario:", error);
//     throw error;
//   }
// };

// export const eliminarUsuario = async (usuarioId) => {
//   try {
//     const response = await instance.delete(`/0/${usuarioId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al eliminar usuario:", error);
//     throw error;
//   }
// };

// // 2. Sesiones
// export const getSesiones = async () => {
//   try {
//     const response = await instance.get('/1');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener sesiones:", error);
//     throw error;
//   }
// };

// export const crearSesion = async (sesionData) => {
//   try {
//     const response = await instance.post('/1', sesionData);
//     return response.data;
//   } catch (error) {
//     console.error("Error al crear sesión:", error);
//     throw error;
//   }
// };

// export const eliminarSesion = async (sesionId) => {
//   try {
//     const response = await instance.delete(`/1/${sesionId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al eliminar sesión:", error);
//     throw error;
//   }
// };

// // 3. Reseñas
// export const getReseñas = async () => {
//   try {
//     const response = await instance.get('/2');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener reseñas:", error);
//     throw error;
//   }
// };

// export const crearReseña = async (reseñaData) => {
//   try {
//     const response = await instance.post('/2', reseñaData);
//     return response.data;
//   } catch (error) {
//     console.error("Error al crear reseña:", error);
//     throw error;
//   }
// };

// export const eliminarReseña = async (resenaId) => {
//   try {
//     const response = await instance.delete(`/2/${resenaId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al eliminar reseña:", error);
//     throw error;
//   }
// };

// // 4. Puntuaciones
// export const getPuntuaciones = async () => {
//   try {
//     const response = await instance.get('/3');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener 3:", error);
//     throw error;
//   }
// };

// export const crearPuntuacion = async (puntuacionData) => {
//   try {
//     const response = await instance.post('/3', puntuacionData);
//     return response.data;
//   } catch (error) {
//     console.error("Error al crear puntuación:", error);
//     throw error;
//   }
// };

// // 5. Frames
// export const getFrames = async () => {
//   try {
//     const response = await instance.get('/4');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener 4:", error);
//     throw error;
//   }
// };

// // 6. Listas
// export const getListas = async () => {
//   try {
//     const response = await instance.get('/5');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener 5:", error);
//     throw error;
//   }
// };

// // 7. Hilos
// export const getHilos = async () => {
//   try {
//     const response = await instance.get('/6');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener 6:", error);
//     throw error;
//   }
// };

// // 8. Respuestas Hilo
// export const getRespuestasHilo = async () => {
//   try {
//     const response = await instance.get('/7');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener respuestas al hilo:", error);
//     throw error;
//   }
// };

// // 9. Chats
// export const getChats = async () => {
//   try {
//     const response = await instance.get('/8');
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener chats:", error);
//     throw error;
//   }
// };

// // Exportar todas las funciones para que puedan ser utilizadas
// export default {
//   getUsuarios,
//   crearUsuario,
//   actualizarUsuario,
//   eliminarUsuario,
//   getSesiones,
//   crearSesion,
//   eliminarSesion,
//   getReseñas,
//   crearReseña,
//   eliminarReseña,
//   getPuntuaciones,
//   crearPuntuacion,
//   getFrames,
//   getListas,
//   getHilos,
//   getRespuestasHilo,
//   getChats,
// };


import axios from "axios";

// Instancia de axios para hacer peticiones
const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 1. Usuarios
export const getUsuarios = async () => {
  try {
    const response = await instance.get('/0');
    return response.data;
  } catch (error) {
    console.error("Error al obtener Usuario:", error);
    throw error;
  }
};

export const crearUsuario = async (usuarioData) => {
  try {
    const response = await instance.post('/0/data/usuarios', usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const actualizarUsuario = async (usuarioId, usuarioData) => {
  try {
    const response = await instance.put(`/0/${usuarioId}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (usuarioId) => {
  try {
    const response = await instance.delete(`/0/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// 2. Sesiones
export const getSesiones = async () => {
  try {
    const response = await instance.get('/1');
    return response.data;
  } catch (error) {
    console.error("Error al obtener sesiones:", error);
    throw error;
  }
};

export const crearSesion = async (sesionData) => {
  try {
    const response = await instance.post('/1', sesionData);
    return response.data;
  } catch (error) {
    console.error("Error al crear sesión:", error);
    throw error;
  }
};

export const eliminarSesion = async (sesionId) => {
  try {
    const response = await instance.delete(`/1/${sesionId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar sesión:", error);
    throw error;
  }
};

// 3. Reseñas
export const getReseñas = async () => {
  try {
    const response = await instance.get('/2');
    return response.data;
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    throw error;
  }
};

export const crearReseña = async (reseñaData) => {
  try {
    const response = await instance.post('/2', reseñaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear reseña:", error);
    throw error;
  }
};

export const eliminarReseña = async (resenaId) => {
  try {
    const response = await instance.delete(`/2/${resenaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    throw error;
  }
};

// 4. Puntuaciones
export const getPuntuaciones = async () => {
  try {
    const response = await instance.get('/3');
    return response.data;
  } catch (error) {
    console.error("Error al obtener 3:", error);
    throw error;
  }
};

export const crearPuntuacion = async (puntuacionData) => {
  try {
    const response = await instance.post('/3', puntuacionData);
    return response.data;
  } catch (error) {
    console.error("Error al crear puntuación:", error);
    throw error;
  }
};

// 5. Frames
export const getFrames = async () => {
  try {
    const response = await instance.get('/4');
    return response.data;
  } catch (error) {
    console.error("Error al obtener 4:", error);
    throw error;
  }
};

// 6. Listas
export const getListas = async () => {
  try {
    const response = await instance.get('/5');
    return response.data;
  } catch (error) {
    console.error("Error al obtener 5:", error);
    throw error;
  }
};

// 7. Hilos
export const getHilos = async () => {
  try {
    const response = await instance.get('/6');
    return response.data;
  } catch (error) {
    console.error("Error al obtener 6:", error);
    throw error;
  }
};

// 8. Respuestas Hilo
export const getRespuestasHilo = async () => {
  try {
    const response = await instance.get('/7');
    return response.data;
  } catch (error) {
    console.error("Error al obtener respuestas al hilo:", error);
    throw error;
  }
};

// 9. Chats
export const getChats = async () => {
  try {
    const response = await instance.get('/8');
    return response.data;
  } catch (error) {
    console.error("Error al obtener chats:", error);
    throw error;
  }
};