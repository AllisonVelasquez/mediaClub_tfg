import { useState, useEffect, useRef } from "react";
import { actualizarMiUsuario } from "../../services/Usuarios/CRUD_Usuarios";
import "./EditarPerfil.css";

const EditarPerfil = ({ datos, onCancel, onSave }) => {
  const redesInicial = (Array.isArray(datos.redes)
    ? datos.redes.reduce((acc, r) => {
        acc[r.nombre] = r.url;
        return acc;
      }, {})
    : {}) || {};

  const [originalDatos] = useState({
    alias: datos?.alias || "",
    bio: datos?.bio || "",
    foto_perfil: datos?.foto_perfil || "",
    redes: redesInicial,
  });

  const [alias, setAlias] = useState(originalDatos.alias);
  const [bio, setBio] = useState(originalDatos.bio);
  const [fotoPerfil, setFotoPerfil] = useState(originalDatos.foto_perfil);
  const [redes, setRedes] = useState(originalDatos.redes);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setAlias(datos?.alias || "");
    setBio(datos?.bio || "");
    setFotoPerfil(datos?.foto_perfil || "");
    setRedes(
      (Array.isArray(datos.redes)
        ? datos.redes.reduce((acc, r) => {
            acc[r.nombre] = r.url;
            return acc;
          }, {})
        : {}) || {}
    );
  }, [datos]);

  const handleRedChange = (nombre, valor) => {
    setRedes({ ...redes, [nombre]: valor });
  };

  // Función para convertir archivo a base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Handler para drop de archivo
  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const base64 = await fileToBase64(file);
        setFotoPerfil(base64);
      } catch (error) {
        alert("Error al leer la imagen.");
      }
    } else {
      alert("Por favor, arrastra una imagen válida.");
    }
  };

  // Otros handlers para drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);

  // Handler para input file (clic)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const base64 = await fileToBase64(file);
        setFotoPerfil(base64);
      } catch {
        alert("Error al leer la imagen.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosActualizados = {};

    if (alias !== originalDatos.alias) datosActualizados.alias = alias;
    if (bio !== originalDatos.bio) datosActualizados.bio = bio;
    if (fotoPerfil !== originalDatos.foto_perfil)
      datosActualizados.foto_perfil = fotoPerfil;

    const redesModificadas = Object.entries(redes).filter(([nombre, url]) => {
      const originalUrl = originalDatos.redes[nombre] || "";
      return url.trim() !== "" && url !== originalUrl;
    });

    if (redesModificadas.length > 0) {
      datosActualizados.redes = JSON.stringify(
        redesModificadas.map(([nombre, url]) => ({
          nombre,
          url,
        }))
      );
    }

    if (Object.keys(datosActualizados).length === 0) {
      alert("No hay cambios para guardar.");
      return;
    }

    try {
      await actualizarMiUsuario(datosActualizados);
      alert("Datos actualizados correctamente");
      onSave();
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos");
    }
  };

  return (
    <div className="editar-perfil">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Alias:
          <input value={alias} onChange={(e) => setAlias(e.target.value)} />
        </label>

        <label>
          Biografía:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>

        <label>
          Foto de Perfil:
          <div
            className={`dropzone ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
              border: "2px dashed #aaa",
              padding: "1rem",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt="Foto de perfil"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            ) : (
              <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>

        <h4>Redes Sociales</h4>
        {["Facebook", "Twitter", "Instagram", "YouTube"].map((nombre) => (
          <label key={nombre}>
            {nombre}:
            <input
              value={redes[nombre] || ""}
              onChange={(e) => handleRedChange(nombre, e.target.value)}
            />
          </label>
        ))}

        <div className="form-actions">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default EditarPerfil;
