import { instance } from "../axios";

// --- AUTENTICACIÓN ---

export const logInUsuario = async (usuarioData) => {
  try {
    const response = await instance.post("/auth/login", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const crearUsuario = async (usuarioData) => {
  try {
    const response = await instance.post("/auth/registro", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const cerrarSesion = async () => {
  try {
    const response = await instance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

// --- PERFIL ---



export const obtenerMiPerfil = async () => {
  try {
    const response = await instance.get("/mi/perfil");    
    
    return response.data.contenido;
  } catch (error) {
    console.error("Error al obtener tu perfil:", error);
    throw error;
  }
};

export const actualizarMiUsuario = async (datosActualizados) => {
  try {
    const response = await instance.patch("/mi/actualizar-datos", datosActualizados);
    return response.data;
  } catch (error) {
    // Extraer mensaje de error de la respuesta, si existe
    if (error.response && error.response.data) {
      console.error("Error al actualizar tu perfil:", error.response.data);
      throw error.response.data;  // Lanzar los datos del error para manejar en frontend
    } else {
      console.error("Error al actualizar tu perfil:", error.message);
      throw new Error("Error desconocido al actualizar tu perfil");
    }
  }
};


export const eliminarMiCuenta = async ({ login_id, contrasena }) => {
  try {
    const response = await instance.delete("/mi/borrar-cuenta", {
      data: { login_id, contrasena },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar tu cuenta:", error);
    throw error;
  }
};

export const obtenerPerfilUsuario = async (id) => {
  const res = await instance.get(`/usuarios/${id}/perfil`);
  return res.data;
};

export const obtenerListasPublicas = async (id) => {
  const res = await instance.get(`/usuarios/${id}/listas-publicas`);
  return res.data;
};

export const obtenerAmigosUsuario = async (id) => {
  const res = await instance.get(`/usuarios/${id}/amigos`);
  return res.data;
};

export const obtenerActividadUsuario = async (id) => {
  const res = await instance.get(`/usuarios/${id}/actividad`);
  return res.data;
};