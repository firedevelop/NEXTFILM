import { useMovieStore } from "../store"
import { movieCategories } from "../data"
import { useState } from "react"
import { SearchParams } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function MovieSearchForm() {
    const { searchParams, setSearchParams } = useMovieStore()
    const [localSearchParams, setLocalSearchParams] = useState<SearchParams>(searchParams)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        
        if (localSearchParams.query && localSearchParams.query.trim().length < 2) {
            setError('La búsqueda debe tener al menos 2 caracteres')
            return
        }
        
        setSearchParams({
            ...localSearchParams,
            page: 1 // Reset a la primera página en nueva búsqueda
        })
    }

    const handleCategoryChange = (category: string) => {
        const newParams = {
            category,
            page: 1,
            query: ''
        }
        setLocalSearchParams(newParams)
        setSearchParams(newParams)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchParams({
            ...localSearchParams,
            query: e.target.value
        })
    }

    const clearSearch = () => {
        const newParams = {
            category: localSearchParams.category || 'popular',
            page: 1,
            query: ''
        }
        setLocalSearchParams(newParams)
        setSearchParams(newParams)
    }

    return (
        <div className="search-form-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="logo-group">
                    <h1 className="nextfilm-logo" onClick={() => window.location.reload()}>
                        NEXTFILM
                    </h1>
                </div>
                
                <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <select 
                        id="category"
                        value={localSearchParams.category || 'popular'}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="form-select"
                    >
                        {movieCategories.map(category => (
                            <option key={category.key} value={category.key}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="search">Buscar película:</label>
                    <div className="search-input-group">
                        <input 
                            id="search"
                            type="text"
                            value={localSearchParams.query || ''}
                            onChange={handleSearchChange}
                            placeholder="Buscar por título..."
                            className="form-input"
                        />
                        {localSearchParams.query && (
                            <button 
                                type="button" 
                                onClick={clearSearch}
                                className="clear-button"
                            >
                                ✕
                            </button>
                        )}
                        <button type="submit" className="search-icon-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="search-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </form>
        </div>
    )
}
