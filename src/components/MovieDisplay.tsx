import { useMovieStore } from "../store"
import { getImageUrl, formatReleaseDate, formatVoteAverage } from "../services/MovieService"
import { genreMap, movieCategories } from "../data"
import Spinner from "./Spinner"
import MovieTrailers from "./MovieTrailers"

export default function MovieDisplay() {
    const { movies, selectedMovie, loading, initialized, searchParams, fetchMovieDetails } = useMovieStore()

    if (loading) {
        return <Spinner />
    }

    if (movies.length === 0 && !loading) {
        // Si no está inicializado, mostrar mensaje de bienvenida
        if (!initialized) {
            return (
                <div className="no-results">
                    <h3>¡Bienvenido a NextFilm!</h3>
                    <p>Cargando las películas más populares...</p>
                </div>
            )
        }
        
        // Solo mostrar "no se encontraron películas" si hay una búsqueda activa
        if (searchParams.query && searchParams.query.trim()) {
            return (
                <div className="no-results">
                    <h3>No se encontraron películas</h3>
                    <p>No hay resultados para "{searchParams.query}". Intenta con otros términos de búsqueda.</p>
                </div>
            )
        }
        
        // Si no hay búsqueda activa pero está inicializado, algo salió mal
        return (
            <div className="no-results">
                <h3>Error al cargar películas</h3>
                <p>Por favor, recarga la página o selecciona otra categoría.</p>
            </div>
        )
    }

    const handleMovieClick = (movieId: number) => {
        fetchMovieDetails(movieId)
    }

    const getGenreNames = (genreIds: number[]) => {
        return genreIds.slice(0, 3).map(id => genreMap[id]).filter(Boolean).join(', ')
    }

    return (
        <div className="movie-display">
            {/* Película seleccionada (detalles) */}
            {selectedMovie && (
                <div className="movie-detail">
                    <div className="movie-detail-header">
                        <img 
                            src={getImageUrl(selectedMovie.poster_path)}
                            alt={selectedMovie.title}
                            className="movie-detail-poster"
                        />
                        <div className="movie-detail-info">
                            <h2 className="movie-detail-title">{selectedMovie.title}</h2>
                            {selectedMovie.original_title !== selectedMovie.title && (
                                <p className="movie-detail-original-title">
                                    Título original: {selectedMovie.original_title}
                                </p>
                            )}
                            <p className="movie-detail-overview">{selectedMovie.overview}</p>
                            <div className="movie-detail-stats">
                                <span className="movie-stat">
                                    ⭐ {formatVoteAverage(selectedMovie.vote_average)}/10
                                </span>
                                <span className="movie-stat">
                                    📅 {formatReleaseDate(selectedMovie.release_date)}
                                </span>
                                {selectedMovie.runtime && (
                                    <span className="movie-stat">
                                        ⏱️ {selectedMovie.runtime} min
                                    </span>
                                )}
                            </div>
                            {selectedMovie.genres.length > 0 && (
                                <div className="movie-detail-genres">
                                    {selectedMovie.genres.map(genre => (
                                        <span key={genre.id} className="genre-tag">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {selectedMovie.tagline && (
                                <p className="movie-tagline">"{selectedMovie.tagline}"</p>
                            )}
                        </div>
                    </div>
                    {selectedMovie.backdrop_path && (
                        <div className="movie-backdrop">
                            <img 
                                src={getImageUrl(selectedMovie.backdrop_path, 'w1280')}
                                alt={selectedMovie.title}
                                className="backdrop-image"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Trailers de YouTube */}
            {selectedMovie && (
                <MovieTrailers movieId={selectedMovie.id} />
            )}

            {/* Lista de películas */}
            <div className="movies-grid">
                <h3 className="grid-title">
                    {searchParams.query 
                        ? `Resultados para: "${searchParams.query}"`
                        : movieCategories.find(cat => cat.key === searchParams.category)?.label || 'Películas'
                    }
                </h3>
                <div className="movies-list">
                    {movies.map(movie => (
                        <div 
                            key={movie.id} 
                            className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <div className="movie-poster-container">
                                <img 
                                    src={getImageUrl(movie.poster_path)}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-rating">
                                    ⭐ {formatVoteAverage(movie.vote_average)}
                                </div>
                            </div>
                            <div className="movie-info">
                                <h4 className="movie-title">{movie.title}</h4>
                                <p className="movie-release-date">
                                    {formatReleaseDate(movie.release_date)}
                                </p>
                                {movie.genre_ids.length > 0 && (
                                    <p className="movie-genres">
                                        {getGenreNames(movie.genre_ids)}
                                    </p>
                                )}
                                <p className="movie-overview">
                                    {movie.overview.length > 150 
                                        ? `${movie.overview.substring(0, 150)}...` 
                                        : movie.overview
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
