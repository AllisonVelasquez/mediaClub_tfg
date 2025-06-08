import { instance } from "../axios";
import { getFrameById } from "../Frames/CRUD_Frames";

// Obtener todas las listas públicas de todos los usuarios
export const getListas = async () => {
  try {
    // Según rutas.php, no hay endpoint global, así que asume que tienes un endpoint para obtener todas las listas públicas
    // Si no existe, deberías crearlo en el backend o ajustar aquí para obtener solo las listas públicas de un usuario
    const response = await instance.get("listas/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener listas", error);
    throw error;
  }
};

// Crear una lista (para el usuario autenticado)
export const crearLista = async (nuevaLista) => {
  try {
    // El endpoint correcto según rutas.php es: POST /mi/listas/crear (requiere auth)
    const response = await instance.post("mi/listas/crear", nuevaLista);
    return response.data;
  } catch (error) {
    console.error("Error al crear lista:", error);
    throw error;
  }
};

// Eliminar una lista (para el usuario autenticado)
export const deleteLista = async (listaId) => {
  try {
    // El endpoint correcto según rutas.php es: DELETE /mi/listas/borrar/{lista:id}
    const response = await instance.delete(`mi/listas/borrar/${listaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lista:", error);
    throw error;
  }
};

// Actualizar una lista (para el usuario autenticado)
export const actualizarLista = async (listaId, newLista) => {
  try {
    // El endpoint correcto según rutas.php es: PATCH /mi/listas/editar/{lista:id}
    const response = await instance.patch(`mi/listas/editar/${listaId}`, newLista);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar lista:", error);
    throw error;
  }
};

// Obtener detalles de una lista propia (para el usuario autenticado)
export const getMiListaDetalle = async (listaId) => {
  try {
    // GET /mi/listas/{lista:id}/detalles
    const response = await instance.get(`mi/listas/${listaId}/detalles`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de la lista:", error);
    throw error;
  }
};

// Obtener listas públicas de un usuario por ID
export const getListasPublicasUsuario = async (usuarioId) => {
  try {
    // GET /usuarios/{usuario:id}/listas-publicas
    const response = await instance.get(`usuarios/${usuarioId}/listas-publicas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener listas públicas del usuario:", error);
    throw error;
  }
};

// Obtener detalles de una lista pública de un usuario
export const getListaPublicaDetalle = async (usuarioId, listaId) => {
  try {
    // GET /usuarios/{usuario:id}/listas-publicas/{lista:id}
    const response = await instance.get(`usuarios/${usuarioId}/listas-publicas/${listaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de la lista pública:", error);
    throw error;
  }
};

// Añadir un frame a una lista propia
export const addFrameToLista = async (listaId, frameId) => {
  try {
    // POST /mi/listas/{lista:id}/anadir/{frame:id}
    const response = await instance.post(`mi/listas/${listaId}/anadir/${frameId}`);
    return response.data;
  } catch (error) {
    console.error("Error al añadir frame a la lista:", error);
    throw error;
  }
};

// Quitar un frame de una lista propia
export const removeFrameFromLista = async (listaId, frameId) => {
  try {
    const response = await instance.delete(`mi/listas/${listaId}/quitar/${frameId}`);
    return response.data;
  } catch (error) {
    console.error("Error al quitar frame de la lista:", error);
    throw error;
  }
};

// Obtener los frames de una lista (usando los IDs de frames)
export const getFramesLista = async (listaId) => {
  try {
    // Puedes usar getMiListaDetalle o getListaPublicaDetalle según el contexto
    const response = await instance.get(`mi/listas/${listaId}/detalles`);
    const lista = response.data;
    if (!lista || !Array.isArray(lista.frame_id)) {
      console.warn("No se encontraron frames para esta lista.");
      return [];
    }
    const peliculas = await Promise.all(lista.frame_id.map((id) => getFrameById(id)));
    return peliculas;
  } catch (error) {
    console.error("Error al obtener la lista de frames:", error);
    throw error;
  }
};

