import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import { obtenerMiPerfil } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import { getTopMuvis, getTopTMDB, getRecientes } from "../../services/Frames/CRUD_Frames";
import { getUltimaActividadUsuarioYAmigos } from "../../services/Usuarios/Mi/CRUD_Usuarios";

const baseImgUrl = "https://image.tmdb.org/t/p/w500";

const PeliculaCard = ({ pelicula, onClick }) => (
	<div className="inicio-pelicula-card" onClick={() => onClick(pelicula.id)}>
		<img
			src={
				pelicula.poster_url
					? baseImgUrl + pelicula.poster_url
					: "/images/posterDefault.png"
			}
			alt={pelicula.titulo}
			className="inicio-pelicula-poster"
		/>
		<div className="inicio-pelicula-titulo">{pelicula.titulo}</div>
	</div>
);

const ActividadCard = ({ actividad }) => (
	<div className="inicio-actividad-card">
		<span className="inicio-actividad-usuario">{actividad.usuario_nombre}</span>: {actividad.descripcion}
		<span className="inicio-actividad-fecha">{actividad.fecha}</span>
	</div>
);

const Inicio = () => {
	const [usuario, setUsuario] = useState(null);
	const [topMuvis, setTopMuvis] = useState([]);
	const [topTMDB, setTopTMDB] = useState([]);
	const [recientes, setRecientes] = useState([]);
	const [actividades, setActividades] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const perfil = await obtenerMiPerfil();
			setUsuario(perfil);

			const [muvis, tmdb, recientes, actividad] = await Promise.all([
				getTopMuvis(5),
				getTopTMDB(5),
				getRecientes(5),
				getUltimaActividadUsuarioYAmigos()
			]);
			setTopMuvis(muvis || []);
			setTopTMDB(tmdb || []);
			setRecientes(recientes || []);
			setActividades(actividad || []);
		};
		fetchData();
	}, []);

	const handlePeliculaClick = (id) => {
		navigate(`/peliculas/${id}`);
	};

	return (
		<div className="inicio-container">
			<h1 className="inicio-bienvenida">
				Bienvenido, {usuario ? usuario.nombre : "Usuario"}
			</h1>

			<div className="inicio-seccion">
				<h3>Top películas en Muvis</h3>
				<div className="inicio-peliculas-grid">
					{topMuvis.map((pelicula) => (
						<PeliculaCard key={pelicula.id} pelicula={pelicula} onClick={handlePeliculaClick} />
					))}
				</div>
			</div>

			<div className="inicio-seccion">
				<h3>Top películas en TMDB</h3>
				<div className="inicio-peliculas-grid">
					{topTMDB.map((pelicula) => (
						<PeliculaCard key={pelicula.id} pelicula={pelicula} onClick={handlePeliculaClick} />
					))}
				</div>
			</div>

			<div className="inicio-seccion">
				<h3>Películas más recientes</h3>
				<div className="inicio-peliculas-grid">
					{recientes.map((pelicula) => (
						<PeliculaCard key={pelicula.id} pelicula={pelicula} onClick={handlePeliculaClick} />
					))}
				</div>
			</div>

			<div className="inicio-seccion">
				<h3>Última actividad</h3>
				<div className="inicio-actividad-lista">
					{actividades.length === 0 && <div>No hay actividad reciente.</div>}
					{actividades.map((actividad, idx) => (
						<ActividadCard key={idx} actividad={actividad} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Inicio;