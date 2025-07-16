import axios from 'axios'
import { MoviesResponseSchema, MovieDetailSchema, VideosResponseSchema } from '../schema/movie-schema'
import { SearchParams } from '../types'

// Configuración de la API
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Obtener el token desde las variables de entorno
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || ''

if (!TMDB_ACCESS_TOKEN) {
    console.error('❌ TMDB_ACCESS_TOKEN no está configurado en las variables de entorno')
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
    try {
        const { data } = await tmdbApi.get(`/movie/popular?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing movies data:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error fetching popular movies:', error)
        return []
    }
}

export async function getTopRatedMovies(page: number = 1) {
    try {
        const { data } = await tmdbApi.get(`/movie/top_rated?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing top rated movies data:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error fetching top rated movies:', error)
        return []
    }
}

export async function getUpcomingMovies(page: number = 1) {
    try {
        const { data } = await tmdbApi.get(`/movie/upcoming?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing upcoming movies data:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error fetching upcoming movies:', error)
        return []
    }
}

export async function getNowPlayingMovies(page: number = 1) {
    try {
        const { data } = await tmdbApi.get(`/movie/now_playing?language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing now playing movies data:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error fetching now playing movies:', error)
        return []
    }
}

export async function searchMovies(query: string, page: number = 1) {
    try {
        const { data } = await tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`)
        const result = MoviesResponseSchema.safeParse(data)
        if (result.success) {
            return result.data.results
        } else {
            console.error('Error parsing search results:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error searching movies:', error)
        return []
    }
}

export async function getMovieDetails(movieId: number) {
    try {
        const { data } = await tmdbApi.get(`/movie/${movieId}?language=en-US`)
        const result = MovieDetailSchema.safeParse(data)
        if (result.success) {
            return result.data
        } else {
            console.error('Error parsing movie details:', result.error)
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
    } catch (error) {
        console.error('Error fetching movie details:', error)
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
}

export async function getMovieVideos(movieId: number) {
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
