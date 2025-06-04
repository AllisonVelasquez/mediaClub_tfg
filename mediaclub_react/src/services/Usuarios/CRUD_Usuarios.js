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

export const obtenerPerfilPorId = async (usuarioId) => {
  try {
    const response = await instance.get(`/usuarios/${usuarioId}/perfil`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil público:", error);
    throw error;
  }
};

export const obtenerMiPerfil = async () => {
  try {
    const response = await instance.get("/mi/perfil");
    console.log("Perfil obtenido:", response.data);
    
    return response.data;
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
    console.error("Error al actualizar tu perfil:", error);
    throw error;
  }
};

export const eliminarMiCuenta = async () => {
  try {
    const response = await instance.delete("/mi/borrar-cuenta");
    return response.data;
  } catch (error) {
    console.error("Error al eliminar tu cuenta:", error);
    throw error;
  }
};
