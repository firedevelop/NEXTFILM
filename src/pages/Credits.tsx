import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Credits() {
    return (
        <div className="app-container">
            <div className="app-header">
                <h1 className="app-title">
                    NEXTFILM
                </h1>
            </div>

            <div className="credits-container">
                <div className="credits-content">
                    <Link to="/" className="back-link">
                        ← Back to App
                    </Link>
                    
                    <h2 className="credits-title">Credits & Acknowledgments</h2>
                    
                    <div className="credits-section">
                        <h3>📄 Licenses & Attributions</h3>
                        
                        <div className="license-item">
                            <h4>The Movie Database (TMDb)</h4>
                            <p><strong>Data Provider & API License</strong></p>
                            <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                            <p>All movie data, images, and metadata are provided by The Movie Database (TMDb) under their terms of use.</p>
                            
                            <ul className="license-details">
                                <li>Service: Movie data, images, and metadata</li>
                                <li>License type: TMDb API Terms of Use</li>
                                <li>Attribution: Required - Logo display implemented</li>
                                <li>Commercial use: Permitted under TMDb terms</li>
                                <li>Data ownership: The Movie Database (TMDb)</li>
                            </ul>
                            
                            <ul className="license-links">
                                <li>
                                    <strong>TMDb Website:</strong> 
                                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                                        https://www.themoviedb.org/
                                    </a>
                                </li>
                                <li>
                                    <strong>TMDb API Terms:</strong> 
                                    <a href="https://www.themoviedb.org/api-terms-of-use" target="_blank" rel="noopener noreferrer">
                                        https://www.themoviedb.org/api-terms-of-use
                                    </a>
                                </li>
                                <li>
                                    <strong>TMDb API Documentation:</strong> 
                                    <a href="https://developers.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                                        https://developers.themoviedb.org/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="license-item">
                            <h4>Google Fonts</h4>
                            <p><strong>Typography License</strong></p>
                            <p>This project uses Google Fonts under the Open Font License (OFL).</p>
                            
                            <h5>Fonts Used:</h5>
                            <ul className="license-details">
                                <li><strong>Inter:</strong> Primary UI font - SIL Open Font License 1.1</li>
                                <li><strong>Bebas Neue:</strong> Logo font - SIL Open Font License 1.1</li>
                                <li>Commercial use: Allowed</li>
                                <li>Modification: Allowed</li>
                                <li>Distribution: Allowed</li>
                                <li>Attribution: Not required but appreciated</li>
                            </ul>
                            
                            <ul className="license-links">
                                <li>
                                    <strong>Google Fonts:</strong> 
                                    <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">
                                        https://fonts.google.com/
                                    </a>
                                </li>
                                <li>
                                    <strong>Inter Font:</strong> 
                                    <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer">
                                        https://fonts.google.com/specimen/Inter
                                    </a>
                                </li>
                                <li>
                                    <strong>Bebas Neue Font:</strong> 
                                    <a href="https://fonts.google.com/specimen/Bebas+Neue" target="_blank" rel="noopener noreferrer">
                                        https://fonts.google.com/specimen/Bebas+Neue
                                    </a>
                                </li>
                                <li>
                                    <strong>SIL Open Font License:</strong> 
                                    <a href="https://scripts.sil.org/OFL" target="_blank" rel="noopener noreferrer">
                                        https://scripts.sil.org/OFL
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="license-item">
                            <h4>Netflix Design Inspiration</h4>
                            <p><strong>Design Reference & Fair Use</strong></p>
                            <p>This project draws visual inspiration from Netflix's user interface design for educational and portfolio purposes.</p>
                            <p><strong>Important Disclaimer:</strong> This is an independent project not affiliated with, endorsed by, or connected to Netflix, Inc.</p>
                            
                            <ul className="license-details">
                                <li>Purpose: Educational and portfolio demonstration</li>
                                <li>Inspiration: Netflix UI/UX design patterns and color scheme</li>
                                <li>Content: Original implementation using TMDb data</li>
                                <li>Trademarks: Netflix trademarks belong to Netflix, Inc.</li>
                                <li>Commercial use: This project is for demonstration purposes only</li>
                                <li>Fair use: Design inspiration for educational purposes</li>
                            </ul>
                            
                            <ul className="license-links">
                                <li>
                                    <strong>Netflix:</strong> 
                                    <a href="https://www.netflix.com/" target="_blank" rel="noopener noreferrer">
                                        https://www.netflix.com/
                                    </a>
                                </li>
                                <li>
                                    <strong>Netflix Trademark Guidelines:</strong> 
                                    <a href="https://brand.netflix.com/" target="_blank" rel="noopener noreferrer">
                                        https://brand.netflix.com/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="license-item">
                            <h4>YouTube API</h4>
                            <p><strong>Video Content Integration</strong></p>
                            <p>Movie trailers and promotional videos are embedded from YouTube under YouTube's Terms of Service.</p>
                            
                            <ul className="license-details">
                                <li>Service: Video embedding and trailer playback</li>
                                <li>Content: Movie trailers from official channels</li>
                                <li>License: YouTube Terms of Service</li>
                                <li>Embedding: Permitted through YouTube iframe API</li>
                                <li>Content ownership: Respective movie studios and distributors</li>
                            </ul>
                            
                            <ul className="license-links">
                                <li>
                                    <strong>YouTube Terms of Service:</strong> 
                                    <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
                                        https://www.youtube.com/t/terms
                                    </a>
                                </li>
                                <li>
                                    <strong>YouTube API Services:</strong> 
                                    <a href="https://developers.google.com/youtube/terms/api-services-terms-of-service" target="_blank" rel="noopener noreferrer">
                                        YouTube API Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="credits-section">
                        <h3>🛠️ Development & Technical Credits</h3>
                        
                        <div className="tech-stack">
                            <h4>Technologies Used</h4>
                            <div className="tech-grid">
                                <div className="tech-item">
                                    <h5>Frontend Framework</h5>
                                    <ul>
                                        <li>React 18 - User interface library</li>
                                        <li>TypeScript - Type-safe JavaScript</li>
                                        <li>Vite - Build tool and development server</li>
                                    </ul>
                                </div>
                                
                                <div className="tech-item">
                                    <h5>State Management & Data</h5>
                                    <ul>
                                        <li>Zustand - Lightweight state management</li>
                                        <li>Axios - HTTP client for API requests</li>
                                        <li>Zod - Schema validation</li>
                                    </ul>
                                </div>
                                
                                <div className="tech-item">
                                    <h5>Styling & Design</h5>
                                    <ul>
                                        <li>CSS3 - Modern styling with Grid & Flexbox</li>
                                        <li>Google Fonts - Inter & Bebas Neue typography</li>
                                        <li>Responsive Design - Mobile-first approach</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="credits-section">
                        <h3>📊 Project Information</h3>
                        
                        <div className="project-info">
                            <h4>NEXTFILM - Movie Discovery Platform</h4>
                            <p>A Netflix-inspired movie discovery application built as a portfolio project to demonstrate modern web development skills.</p>
                            
                            <div className="project-details">
                                <p><strong>Purpose:</strong> Educational portfolio demonstration</p>
                                <p><strong>Technology Stack:</strong> React + TypeScript + Vite</p>
                                <p><strong>Data Source:</strong> The Movie Database (TMDb) API</p>
                                <p><strong>Design Inspiration:</strong> Netflix user interface</p>
                                <p><strong>Target Audience:</strong> Recruiters, developers, movie enthusiasts</p>
                            </div>
                            
                            <div className="legal-disclaimer">
                                <h5>Legal Disclaimer</h5>
                                <p>This project is an independent educational demonstration and is not affiliated with, endorsed by, or connected to Netflix, Inc., The Movie Database, or any movie studios. All trademarks and copyrights belong to their respective owners.</p>
                                <p>This application is for demonstration purposes only and complies with fair use guidelines for educational projects.</p>
                            </div>
                        </div>
                    </div>

                    <div className="credits-section">
                        <h3>🎬 Content Attribution</h3>
                        
                        <div className="content-attribution">
                            <p><strong>Movie Data:</strong> All movie information, ratings, cast details, and metadata provided by The Movie Database (TMDb).</p>
                            <p><strong>Movie Images:</strong> Posters, backdrops, and promotional images sourced from TMDb with proper attribution.</p>
                            <p><strong>Video Content:</strong> Movie trailers embedded from official YouTube channels of movie studios and distributors.</p>
                            <p><strong>No Copyright Infringement Intended:</strong> All content is used for educational and demonstration purposes under fair use principles.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

