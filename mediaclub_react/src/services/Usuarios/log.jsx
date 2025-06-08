import { instance } from "../axios";

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
