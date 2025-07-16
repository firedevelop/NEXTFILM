import axios from 'axios'
import { MoviesResponseSchema, MovieDetailSchema, VideosResponseSchema } from '../schema/movie-schema'
import { SearchParams } from '../types'
import { staticMoviesData, staticMovieDetails } from '../data/staticMovies'

// Configuración de la API
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

// Obtener el token desde las variables de entorno
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || ''

if (!TMDB_ACCESS_TOKEN) {
    console.warn('⚠️ TMDB_ACCESS_TOKEN no está configurado - usando datos estáticos como fallback')
} else {
    console.log('✅ TMDB_ACCESS_TOKEN configurado correctamente')
}

// Configuración de axios
const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
})

export async function getPopularMovies(page: number = 1) {
    // Si no hay token, usar datos estáticos
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Usando datos estáticos para películas populares')
        return staticMoviesData
    }

    try {
        const { data } = await tmdbApi.get(`/movie/popular?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing movies data:', result.error)
            console.log('📱 Fallback: usando datos estáticos')
            return staticMoviesData
        }
    } catch (error) {
        console.error('Error fetching popular movies:', error)
        console.log('📱 Fallback: usando datos estáticos')
        return staticMoviesData
    }
}

export async function getTopRatedMovies(page: number = 1) {
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Usando datos estáticos para películas mejor valoradas')
        return staticMoviesData.slice().sort((a, b) => b.vote_average - a.vote_average)
    }

    try {
        const { data } = await tmdbApi.get(`/movie/top_rated?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing top rated movies data:', result.error)
            console.log('📱 Fallback: usando datos estáticos')
            return staticMoviesData.slice().sort((a, b) => b.vote_average - a.vote_average)
        }
    } catch (error) {
        console.error('Error fetching top rated movies:', error)
        console.log('📱 Fallback: usando datos estáticos')
        return staticMoviesData.slice().sort((a, b) => b.vote_average - a.vote_average)
    }
}

export async function getUpcomingMovies(page: number = 1) {
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Usando datos estáticos para próximos estrenos')
        return staticMoviesData.filter(movie => new Date(movie.release_date) > new Date())
    }

    try {
        const { data } = await tmdbApi.get(`/movie/upcoming?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing upcoming movies data:', result.error)
            console.log('📱 Fallback: usando datos estáticos')
            return staticMoviesData.filter(movie => new Date(movie.release_date) > new Date())
        }
    } catch (error) {
        console.error('Error fetching upcoming movies:', error)
        console.log('📱 Fallback: usando datos estáticos')
        return staticMoviesData.filter(movie => new Date(movie.release_date) > new Date())
    }
}

export async function getNowPlayingMovies(page: number = 1) {
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Usando datos estáticos para películas en cartelera')
        return staticMoviesData.slice(0, 6) // Simular películas en cartelera
    }

    try {
        const { data } = await tmdbApi.get(`/movie/now_playing?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing now playing movies data:', result.error)
            console.log('📱 Fallback: usando datos estáticos')
            return staticMoviesData.slice(0, 6)
        }
    } catch (error) {
        console.error('Error fetching now playing movies:', error)
        console.log('📱 Fallback: usando datos estáticos')
        return staticMoviesData.slice(0, 6)
    }
}

export async function searchMovies(query: string, page: number = 1) {
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Usando datos estáticos para búsqueda:', query)
        const filteredMovies = staticMoviesData.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.original_title.toLowerCase().includes(query.toLowerCase()) ||
            movie.overview.toLowerCase().includes(query.toLowerCase())
        )
        return filteredMovies
    }

    try {
        const { data } = await tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing search results:', result.error)
            console.log('📱 Fallback: usando datos estáticos para búsqueda')
            const filteredMovies = staticMoviesData.filter(movie =>
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                movie.original_title.toLowerCase().includes(query.toLowerCase()) ||
                movie.overview.toLowerCase().includes(query.toLowerCase())
            )
            return filteredMovies
        }
    } catch (error) {
        console.error('Error searching movies:', error)
        console.log('📱 Fallback: usando datos estáticos para búsqueda')
        const filteredMovies = staticMoviesData.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.original_title.toLowerCase().includes(query.toLowerCase()) ||
            movie.overview.toLowerCase().includes(query.toLowerCase())
        )
        return filteredMovies
    }
}

export async function getMovieDetails(movieId: number) {
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Usando datos estáticos para detalles de película:', movieId)
        // Si tenemos detalles estáticos para esta película, usarlos
        if (staticMovieDetails[movieId as keyof typeof staticMovieDetails]) {
            return staticMovieDetails[movieId as keyof typeof staticMovieDetails]
        }
        // Si no, crear detalles básicos desde los datos de películas
        const movie = staticMoviesData.find(m => m.id === movieId)
        if (movie) {
            return {
                ...movie,
                runtime: 120,
                genres: movie.genre_ids.map(id => ({ 
                    id, 
                    name: {
                        28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia',
                        80: 'Crimen', 99: 'Documental', 18: 'Drama', 10751: 'Familiar',
                        14: 'Fantasía', 36: 'Historia', 27: 'Terror', 10402: 'Música',
                        9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia ficción',
                        10770: 'Película de TV', 53: 'Suspenso', 10752: 'Guerra', 37: 'Western'
                    }[id] || 'Desconocido'
                })),
                budget: 0,
                revenue: 0,
                tagline: '',
                status: 'Released'
            }
        }
    }

    try {
        const { data } = await tmdbApi.get(`/movie/${movieId}?language=en-US`)
        const result = MovieDetailSchema.safeParse(data)
        if (result.success) {
            return result.data
        } else {
            console.error('Error parsing movie details:', result.error)
            console.log('📱 Fallback: usando datos estáticos')
            const movie = staticMoviesData.find(m => m.id === movieId)
            if (movie) {
                return {
                    ...movie,
                    runtime: 120,
                    genres: movie.genre_ids.map(id => ({ 
                        id, 
                        name: {
                            28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia',
                            80: 'Crimen', 99: 'Documental', 18: 'Drama', 10751: 'Familiar',
                            14: 'Fantasía', 36: 'Historia', 27: 'Terror', 10402: 'Música',
                            9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia ficción',
                            10770: 'Película de TV', 53: 'Suspenso', 10752: 'Guerra', 37: 'Western'
                        }[id] || 'Desconocido'
                    })),
                    budget: 0,
                    revenue: 0,
                    tagline: '',
                    status: 'Released'
                }
            }
        }
    } catch (error) {
        console.error('Error fetching movie details:', error)
        console.log('📱 Fallback: usando datos estáticos')
        const movie = staticMoviesData.find(m => m.id === movieId)
        if (movie) {
            return {
                ...movie,
                runtime: 120,
                genres: movie.genre_ids.map(id => ({ 
                    id, 
                    name: {
                        28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia',
                        80: 'Crimen', 99: 'Documental', 18: 'Drama', 10751: 'Familiar',
                        14: 'Fantasía', 36: 'Historia', 27: 'Terror', 10402: 'Música',
                        9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia ficción',
                        10770: 'Película de TV', 53: 'Suspenso', 10752: 'Guerra', 37: 'Western'
                    }[id] || 'Desconocido'
                })),
                budget: 0,
                revenue: 0,
                tagline: '',
                status: 'Released'
            }
        }
    }

    // Fallback por defecto
    return {
        id: movieId,
        title: '',
        original_title: '',
        overview: '',
        poster_path: null,
        backdrop_path: null,
        release_date: '',
        vote_average: 0,
        vote_count: 0,
        popularity: 0,
        runtime: null,
        genres: [],
        budget: 0,
        revenue: 0,
        tagline: '',
        status: '',
        adult: false,
        original_language: '',
        video: false
    }
}

export async function getMovieVideos(movieId: number) {
    if (!TMDB_ACCESS_TOKEN) {
        console.log('📱 Sin videos disponibles (modo estático)')
        return []
    }

    try {
        const { data } = await tmdbApi.get(`/movie/${movieId}/videos?language=en-US`)
        const result = VideosResponseSchema.safeParse(data)
        if (result.success) {
            // Filtrar solo videos de YouTube que sean trailers o teasers
            return result.data.results.filter(video => 
                video.site === 'YouTube' && 
                (video.type === 'Trailer' || video.type === 'Teaser') &&
                video.official
            )
        } else {
            console.error('Error parsing videos data:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error fetching movie videos:', error)
        return []
    }
}

export function getYouTubeEmbedUrl(videoKey: string): string {
    return `https://www.youtube.com/embed/${videoKey}?autoplay=0&controls=1&rel=0`
}

export function getYouTubeThumbnailUrl(videoKey: string): string {
    return `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`
}

export async function fetchMoviesByCategory(searchParams: SearchParams) {
    const { category = 'popular', page = 1, query } = searchParams
    
    if (query && query.trim()) {
        return await searchMovies(query, page)
    }
    
    switch (category) {
        case 'top_rated':
            return await getTopRatedMovies(page)
        case 'upcoming':
            return await getUpcomingMovies(page)
        case 'now_playing':
            return await getNowPlayingMovies(page)
        case 'popular':
        default:
            return await getPopularMovies(page)
    }
}

export function getImageUrl(imagePath: string | null, size: string = 'w500'): string {
    if (!imagePath) return '/images/no-image.png'
    return `https://image.tmdb.org/t/p/${size}${imagePath}`
}

export function formatReleaseDate(dateString: string): string {
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    } catch {
        return dateString
    }
}

export function formatVoteAverage(voteAverage: number): string {
    return voteAverage.toFixed(1)
}
