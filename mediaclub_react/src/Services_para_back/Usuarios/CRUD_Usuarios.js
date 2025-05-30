import { instance } from "../axios";

// Crear usuario (registro)
export const crearUsuario = async (usuarioData) => {
  try {
    const response = await instance.post("/auth/registro", usuarioData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error("Error al registrar usuario:", response.data.message);
      throw new Error("No se pudo registrar el usuario.");
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Obtener perfil de usuario por alias (público)
export const obtenerPerfilPorAlias = async (alias) => {
  try {
    const response = await instance.get(`/usuarios/${alias}/perfil`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw error;
  }
};

// Obtener perfil propio (requiere auth y token Sanctum)
export const obtenerMiPerfil = async () => {
  try {
    const response = await instance.get("/me/perfil");
    return response.data;
  } catch (error) {
    console.error("Error al obtener tu perfil:", error);
    throw error;
  }
};

// Actualizar datos del usuario logueado
export const actualizarMiUsuario = async (usuarioData) => {
  try {
    const response = await instance.patch("/me/actualizar-datos", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar tu perfil:", error);
    throw error;
  }
};

// Eliminar cuenta del usuario logueado
export const eliminarMiCuenta = async () => {
  try {
    const response = await instance.delete("/me/borrar-cuenta");
    return response.data;
  } catch (error) {
    console.error("Error al eliminar tu cuenta:", error);
    throw error;
  }
};
