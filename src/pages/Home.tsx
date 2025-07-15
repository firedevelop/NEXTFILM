import { useEffect } from "react"
import MovieSearchForm from "../components/MovieSearchForm"
import { useMovieStore } from "../store"
import MovieDisplay from "../components/MovieDisplay"
import Footer from "../components/Footer"

export default function Home() {
    const { initializeApp } = useMovieStore()

    useEffect(() => {
        // Inicializar la aplicación cargando películas populares
        initializeApp()
    }, [initializeApp])

    return (
        <div className="app-container">
            <div className="main-layout">
                <div className="search-section">
                    <MovieSearchForm />
                </div>
                <div className="content">
                    <MovieDisplay />
                </div>
            </div>

            <Footer />
        </div>
    )
}
