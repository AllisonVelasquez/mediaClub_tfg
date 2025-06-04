import { instance } from "../axios";

// LogIn de usuario (autenticación)
export const logInUsuario = async (usuarioData) => {
  try {
    const response = await instance.post("auth/login", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
// Crear usuario (registro)
export const crearUsuario = async (usuarioData) => {
  try {

    const response = await instance.post("auth/registro", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Obtener perfil de usuario por alias (público)
export const obtenerPerfilPorAlias = async (alias) => {
  try {
    const response = await instance.get(`usuarios/${alias}/perfil`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw error;
  }
};

// Obtener perfil propio (requiere auth y token Sanctum)
export const obtenerMiPerfil = async () => {
  try {
    const response = await instance.get("me/perfil");
    return response.data;
  } catch (error) {
    console.error("Error al obtener tu perfil:", error);
    throw error;
  }
};

// Actualizar datos del usuario logueado
export const actualizarMiUsuario = async (usuarioData) => {
  try {
    const response = await instance.patch("me/actualizar-datos", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar tu perfil:", error);
    throw error;
  }
};

// Eliminar cuenta del usuario logueado
export const eliminarMiCuenta = async () => {
  try {
    const response = await instance.delete("me/borrar-cuenta");
    return response.data;
  } catch (error) {
    console.error("Error al eliminar tu cuenta:", error);
    throw error;
  }
};
