import { instance } from "../axios";

// 1. Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await instance.get("0/");
    // Accedemos a los usuarios dentro de la estructura 'data'
    return response.data.data.usuarios;
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    throw error;
  }
};

// 2. Obtener un usuario específico por ID
export const getUsuario = async (id) => {
  try {
    const response = await instance.get(`0/`);
    // Debería retornar solo el objeto de usuario si existe
    return response.data.data.usuarios.find(
      (usuario) => usuario.usuario_id === id
    );
  } catch (error) {
    console.error("Error al obtener Usuario:", error);
    throw error;
  }
};

// 3. Crear un nuevo usuario
// 3. Crear un nuevo usuario
export const crearUsuario = async (usuarioData) => {
  try {
    // Realizamos el POST para crear el nuevo usuario
    const response = await instance.patch("0/usuarios/", usuarioData);
    // Verificamos si la creación fue exitosa y retornamos la respuesta
    if (response.status === 200 || response.status === 201) {
      console.log("Usuario creado correctamente");
      return response.data; // Retornamos los datos de la respuesta
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
    const response = await instance.delete(`/usuarios/${usuarioId}`);
    // En este caso retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
