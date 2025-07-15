import { z } from 'zod'

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string()
})

export const VideoSchema = z.object({
    id: z.string(),
    iso_639_1: z.string(),
    iso_3166_1: z.string(),
    key: z.string(),
    name: z.string(),
    site: z.string(),
    size: z.number(),
    type: z.string(),
    official: z.boolean(),
    published_at: z.string()
})

export const VideosResponseSchema = z.object({
    id: z.number(),
    results: z.array(VideoSchema)
})

export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    original_title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    release_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    popularity: z.number(),
    genre_ids: z.array(z.number()),
    adult: z.boolean(),
    original_language: z.string(),
    video: z.boolean()
})

export const MoviesResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number()
})

export const MovieDetailSchema = z.object({
    id: z.number(),
    title: z.string(),
    original_title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    release_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    popularity: z.number(),
    runtime: z.number().nullable(),
    genres: z.array(GenreSchema),
    budget: z.number(),
    revenue: z.number(),
    tagline: z.string(),
    status: z.string(),
    adult: z.boolean(),
    original_language: z.string(),
    video: z.boolean()
})

export const SearchParamsSchema = z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    page: z.number().optional()
})
