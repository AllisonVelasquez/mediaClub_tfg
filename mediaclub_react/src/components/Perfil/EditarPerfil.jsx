import { useState, useEffect, useContext, useRef } from "react";
import { actualizarMiPerfil, eliminarMiCuenta } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import { AuthContext } from "../LogIn/AuthContext";
import "./EditarPerfil.css";

const EditarPerfil = ({ datos, onCancel, onSave }) => {
  const { logOut } = useContext(AuthContext);

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

  // Usar useRef para el input de archivo
  const fileInputRef = useRef(null);

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


  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);


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
      await actualizarMiPerfil(datosActualizados);
      alert("Datos actualizados correctamente");
      onSave();
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos");
    }
  };

  const handleEliminarCuenta = async () => {
    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible."
      )
    )
      return;

    const contrasena = window.prompt(
      "Por favor, confirma tu contraseña para eliminar la cuenta:"
    );
    if (!contrasena) {
      alert("Debes ingresar tu contraseña.");
      return;
    }

    try {
      await eliminarMiCuenta({ login_id: datos.login_id, contrasena });
      alert("Cuenta eliminada correctamente.");
      logOut();
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert("No se pudo eliminar la cuenta. Verifica tu contraseña e intenta de nuevo.");
    }
  };

  return (
    <div className="editar-perfil">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Alias:
          <input
            className="editar-input"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </label>

        <label>
          Biografía:
          <textarea
            className="editar-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <label>
          Foto de Perfil:
          <span className="pf-instruccion">Arrastra una imagen aquí o haz clic para seleccionar</span>
          <div
            className={`dropzone ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>

        <h4>Redes Sociales</h4>
        {["Facebook", "Twitter", "Instagram", "YouTube"].map((nombre) => (
          <label key={nombre}>
            {nombre}:
            <input
              className="editar-input"
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
      <br />
      <hr />
      <button className="btn-eliminar-cuenta" onClick={handleEliminarCuenta}>
        Eliminar mi cuenta
      </button>
    </div>
  );
};

export default EditarPerfil;

