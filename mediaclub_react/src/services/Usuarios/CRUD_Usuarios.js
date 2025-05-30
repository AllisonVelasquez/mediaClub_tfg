import { instance } from "../api";

// 1. Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await instance.get("usuarios/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    throw error;
  }
};

// 2. Obtener un usuario específico por ID
export const getUsuario = async (id) => {
  try {
    const response = await instance.get(`usuarios/`);
    // Debería retornar solo el objeto de usuario si existe
    return response.data.find(
      (usuario) => usuario.usuario_id === Number(id)
    );
  } catch (error) {
    console.error("Error al obtener Usuario:", error);
    throw error;
  }
};

export const crearUsuario = async (usuarioData) => {
  try {
    // Realizamos el POST para crear el nuevo usuario
    const response = await instance.post("usuarios", usuarioData);
    // Verificamos si la creación fue exitosa y retornamos la respuesta
    if (response.status === 200 || response.status === 201) {
      return response.data; 
    } else {
      console.error("Error al crear usuario:", response.data.message);
      throw new Error("No se pudo crear el usuario.");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// 4. Actualizar un usuario existente
export const actualizarUsuario = async (usuarioId, usuarioData) => {
  try {
    const response = await instance.put(`/usuarios/${usuarioId}`, usuarioData);
    return response.data.data.usuarios.find(
      (usuario) => usuario.usuario_id === usuarioId
    ); // Retorna el usuario actualizado
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// 5. Eliminar un usuario
export const eliminarUsuario = async (usuarioId) => {
  try {
    const response = await instance.delete(`0/usuarios/${usuarioId}`);
    // En este caso retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
