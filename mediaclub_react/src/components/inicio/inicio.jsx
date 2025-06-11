import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMiPerfil } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import {getFramesOrderByVotosMuvis,	getFramesOrderByVotosTmdb,getFramesRecientes} from "../../services/Frames/CRUD_Frames";
import "./inicio.css";


const PeliculaCard = ({ pelicula, onClick }) => (
	<div
		className="inicio-pelicula-card"
		onClick={() => pelicula.id && onClick(pelicula.id)}
		tabIndex={0}
		role="button"
	>
		<img
			src={pelicula.poster_url
}
			alt={pelicula.titulo || "Sin título"}
			className="inicio-pelicula-poster"
			onError={(e) => {
				e.target.onerror = null;
				e.target.src = "/images/posterDefault.png";
			}}
		/>
		<div className="inicio-pelicula-titulo">
			{pelicula.titulo || "Sin título"}
		</div>
	</div>
);

const Inicio = () => {
	const [usuario, setUsuario] = useState(null);
	const [topMuvis, setTopMuvis] = useState([]);
	const [topTMDB, setTopTMDB] = useState([]);
	const [recientes, setRecientes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError("");
			try {
				const perfil = await obtenerMiPerfil();
				setUsuario(perfil);

				const [muvisResp, tmdbResp, recientesResp] = await Promise.all([
					getFramesOrderByVotosMuvis("desc", 1),
					getFramesOrderByVotosTmdb("desc", 1),
					getFramesRecientes(1),
				]);

				const muvis =
					Array.isArray(muvisResp?.contenido?.data) &&
						muvisResp?.contenido?.data.length > 0
						? muvisResp.contenido.data.slice(0, 5)
						: [];
				const tmdb =
					Array.isArray(tmdbResp?.contenido?.data) &&
						tmdbResp?.contenido?.data.length > 0
						? tmdbResp.contenido.data.slice(0, 5)
						: [];
				const recientes =
					Array.isArray(recientesResp?.contenido?.data) &&
						recientesResp?.contenido?.data.length > 0
						? recientesResp.contenido.data.slice(0, 5)
						: [];

				setTopMuvis(muvis);
				setTopTMDB(tmdb);
				setRecientes(recientes);
			} catch (err) {
				setError("Error al cargar los datos de inicio.");
				setTopMuvis([]);
				setTopTMDB([]);
				setRecientes([]);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handlePeliculaClick = (id) => {
		if (id) navigate(`/peliculasDetalles/${id}`);
	};

	if (loading) {
		return <div className="estado-carga">Cargando inicio...</div>;
	}

	if (error) {
		return <div className="estado-carga">{error}</div>;
	}

	return (
		<div className="inicio-container">
			<h1 className="inicio-bienvenida">
				Te damos la bienvenida a Muvis, {usuario ? usuario.alias : "Usuario"}
			</h1>
			<div className="inicio-seccion">
				<h3>Películas más recientes</h3>
				{recientes.length === 0 ? (
					<div className="estado-carga">No hay películas para mostrar.</div>
				) : (
					<ListaPeliculasCustom
						frames={recientes}
						onPeliculaClick={handlePeliculaClick}
					/>
				)}
			</div>
			<div className="inicio-seccion">
				<h3>Top películas en Muvis</h3>
				{topMuvis.length === 0 ? (
					<div className="estado-carga">No hay películas para mostrar.</div>
				) : (
					<ListaPeliculasCustom
						frames={topMuvis}
						onPeliculaClick={handlePeliculaClick}
					/>
				)}
			</div>

			<div className="inicio-seccion">
				<h3>Top películas en TMDB</h3>
				{topTMDB.length === 0 ? (
					<div className="estado-carga">No hay películas para mostrar.</div>
				) : (
					<ListaPeliculasCustom
						frames={topTMDB}
						onPeliculaClick={handlePeliculaClick}
					/>
				)}
			</div>
		</div>
	);
};

const ListaPeliculasCustom = ({ frames, onPeliculaClick }) => {
	return (
		<div className="inicio-peliculas-grid">
			{frames.map((pelicula) => (
				<PeliculaCard
					key={pelicula.id}
					pelicula={pelicula}
					onClick={onPeliculaClick}
				/>
			))}
		</div>
	);
};

export default Inicio;