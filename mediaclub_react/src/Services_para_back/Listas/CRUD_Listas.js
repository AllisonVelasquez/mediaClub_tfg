import { instance } from "../axios"; // 6. Listas
import { getFrameById } from "../Frames/CRUD_Frames";
export const getListas = async () => {
  try {
    const response = await instance.get("listas/");

    return response.data;
  } catch (error) {
    console.error("Error al obtener Lista", error);
    throw error;
  }
};

export const crearLista = async (lista) => {
  try {
    const response = await instance.post("lista/" + lista);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteLista = async (id) => { 
  try {
    const response = await instance.delete(`lista/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const actualizarLista = async (listaId, newLista) => {
  try {
    const response = await instance.put(`/lista/${listaId}`, newLista);
    return response.data.find((lista) => lista.lista_id === listaId); // Retorna el usuario actualizado
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};
export const getFramesLista = async (id) => {
  try {
    const response = await instance.get(`frame_listas/`);

    const lista = response.data.find((el) => el.lista_id === parseInt(id));

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

