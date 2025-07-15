import { useEffect } from "react"
import { useMovieStore } from "../store"
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "../services/MovieService"

interface MovieTrailersProps {
    movieId: number
}

export default function MovieTrailers({ movieId }: MovieTrailersProps) {
    const { selectedMovieVideos, fetchMovieVideos } = useMovieStore()

    useEffect(() => {
        if (movieId) {
            fetchMovieVideos(movieId)
        }
    }, [movieId, fetchMovieVideos])

    if (!selectedMovieVideos || selectedMovieVideos.length === 0) {
        return null
    }

    // Mostrar solo el primer trailer/teaser
    const mainVideo = selectedMovieVideos[0]

    return (
        <div className="movie-trailers">
            <h3 className="trailers-title">Trailer</h3>
            <div className="trailer-container">
                <div className="video-wrapper">
                    <iframe
                        src={getYouTubeEmbedUrl(mainVideo.key)}
                        title={mainVideo.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video-iframe"
                    />
                </div>
                <div className="video-info">
                    <h4 className="video-title">{mainVideo.name}</h4>
                    <span className="video-type">{mainVideo.type}</span>
                </div>
            </div>

            {selectedMovieVideos.length > 1 && (
                <div className="additional-videos">
                    <h4 className="additional-title">Más videos</h4>
                    <div className="videos-grid">
                        {selectedMovieVideos.slice(1, 4).map((video) => (
                            <div key={video.id} className="video-thumbnail">
                                <div className="thumbnail-wrapper">
                                    <img 
                                        src={getYouTubeThumbnailUrl(video.key)}
                                        alt={video.name}
                                        className="thumbnail-image"
                                    />
                                    <div className="play-overlay">
                                        <button 
                                            className="play-btn"
                                            onClick={() => {
                                                const iframe = document.querySelector('.video-iframe') as HTMLIFrameElement
                                                if (iframe) {
                                                    iframe.src = getYouTubeEmbedUrl(video.key)
                                                    iframe.scrollIntoView({ behavior: 'smooth' })
                                                }
                                            }}
                                        >
                                            ▶
                                        </button>
                                    </div>
                                </div>
                                <div className="thumbnail-info">
                                    <p className="thumbnail-title">{video.name}</p>
                                    <span className="thumbnail-type">{video.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
