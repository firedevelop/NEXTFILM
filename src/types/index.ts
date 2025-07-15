import { z } from 'zod'
import { GenreSchema, MovieSchema, MovieDetailSchema, SearchParamsSchema, VideoSchema } from '../schema/movie-schema'

export type Genre = z.infer<typeof GenreSchema>
export type Movie = z.infer<typeof MovieSchema>
export type MovieDetail = z.infer<typeof MovieDetailSchema>
export type SearchParams = z.infer<typeof SearchParamsSchema>
export type Video = z.infer<typeof VideoSchema>