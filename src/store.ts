import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Movie, MovieDetail, SearchParams, Video } from './types'
import { fetchMoviesByCategory, getMovieDetails, getMovieVideos } from './services/MovieService'

type MovieStore = {
    movies: Movie[]
    selectedMovie: MovieDetail | null
    selectedMovieVideos: Video[]
    loading: boolean
    initialized: boolean
    searchParams: SearchParams
    categories: Array<{ key: string; label: string }>
    fetchMovies: (searchParams: SearchParams) => Promise<void>
    fetchMovieDetails: (movieId: number) => Promise<void>
    fetchMovieVideos: (movieId: number) => Promise<void>
    setSearchParams: (params: SearchParams) => void
    clearSelectedMovie: () => void
    initializeApp: () => Promise<void>
}

export const useMovieStore = create<MovieStore>()(devtools((set, get) => ({
    movies: [],
    selectedMovie: null,
    selectedMovieVideos: [],
    loading: false,
    initialized: false,
    searchParams: {
        category: 'popular',
        page: 1,
        query: ''
    },
    categories: [
        { key: 'popular', label: 'Populares' },
        { key: 'top_rated', label: 'Mejor Valoradas' },
        { key: 'upcoming', label: 'Próximos Estrenos' },
        { key: 'now_playing', label: 'En Cartelera' }
    ],
    fetchMovies: async (searchParams: SearchParams) => {
        set(() => ({
            loading: true,
            searchParams
        }))
        try {
            const movies = await fetchMoviesByCategory(searchParams)
            set(() => ({
                movies: movies || [],
                loading: false
            }))
        } catch (error) {
            console.error('Error in fetchMovies:', error)
            set(() => ({
                movies: [],
                loading: false
            }))
        }
    },
    fetchMovieDetails: async (movieId: number) => {
        set(() => ({
            loading: true
        }))
        try {
            const movieDetails = await getMovieDetails(movieId)
            set(() => ({
                selectedMovie: movieDetails,
                loading: false
            }))
        } catch (error) {
            console.error('Error in fetchMovieDetails:', error)
            set(() => ({
                selectedMovie: null,
                loading: false
            }))
        }
    },
    fetchMovieVideos: async (movieId: number) => {
        try {
            const videos = await getMovieVideos(movieId)
            set(() => ({
                selectedMovieVideos: videos || []
            }))
        } catch (error) {
            console.error('Error in fetchMovieVideos:', error)
            set(() => ({
                selectedMovieVideos: []
            }))
        }
    },
    setSearchParams: (params: SearchParams) => {
        const currentParams = get().searchParams
        const newParams = { ...currentParams, ...params }
        set(() => ({
            searchParams: newParams
        }))
        get().fetchMovies(newParams)
    },
    clearSelectedMovie: () => {
        set(() => ({
            selectedMovie: null
        }))
    },
    initializeApp: async () => {
        const state = get()
        if (!state.initialized && state.movies.length === 0) {
            set(() => ({ initialized: true }))
            await get().fetchMovies({ category: 'popular', page: 1 })
        }
    }
})))