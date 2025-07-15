import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { useState, useEffect } from "react"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

// Mapeo de símbolos de moneda
const currencySymbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'MXN': '$'
}

// Colores de gradiente para cada moneda
const currencyGradients: Record<string, string> = {
    'USD': 'usd-gradient',
    'EUR': 'eur-gradient', 
    'GBP': 'gbp-gradient',
    'MXN': 'mxn-gradient'
}

export default function CriptoSearchForm() {
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)

    const [pair, setPair] = useState<Pair>({
        currency: 'USD', // Valor predeterminado: Dólar estadounidense
        criptocurrency: ''
    })
    const [error, setError] = useState('')
    
    // Efecto para seleccionar BTC automáticamente cuando las criptomonedas estén cargadas
    useEffect(() => {
        if (cryptocurrencies.length > 0 && pair.criptocurrency === '') {
            // Buscar Bitcoin en la lista
            const bitcoin = cryptocurrencies.find(crypto => crypto.CoinInfo.Name === 'BTC')
            if (bitcoin) {
                const newPair = {
                    ...pair,
                    criptocurrency: 'BTC'
                }
                setPair(newPair)
                // Hacer la consulta automáticamente con USD y BTC
                if (newPair.currency && newPair.criptocurrency) {
                    fetchData(newPair)
                }
            }
        }
    }, [cryptocurrencies, pair, fetchData])
    
    const handleCurrencyClick = (currencyCode: string) => {
        const newPair = {
            ...pair,
            currency: currencyCode
        }
        setPair(newPair)
        
        if(newPair.criptocurrency === '') {
            setError('Debes seleccionar una criptomoneda')
            return
        }
        setError('')
        fetchData(newPair)
    }

    const handleCryptoClick = (cryptoName: string) => {
        const newPair = {
            ...pair,
            criptocurrency: cryptoName
        }
        setPair(newPair)
        
        if(newPair.currency === '') {
            setError('Debes seleccionar una moneda primero')
            return
        }
        setError('')
        fetchData(newPair)
    }

    return (
        <div className="sidebar">
            <div className="currency-selector">
                <label>
                    Moneda: {pair.currency && (
                        <span className="selected-currency-inline">
                            {' '}{currencies.find(c => c.code === pair.currency)?.name}
                        </span>
                    )}
                </label>
                <div className="currency-buttons">
                    {currencies.map(currency => (
                        <button
                            key={currency.code}
                            className={`currency-coin ${currencyGradients[currency.code]} ${pair.currency === currency.code ? 'selected' : ''}`}
                            onClick={() => handleCurrencyClick(currency.code)}
                            title={currency.name}
                        >
                            <span className="currency-symbol">
                                {currencySymbols[currency.code]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="crypto-list">
                <h3>Criptomonedas</h3>
                <div className="crypto-grid">
                    {cryptocurrencies.length === 0 ? (
                        <p>Cargando criptomonedas...</p>
                    ) : (
                        cryptocurrencies.map( crypto => (
                            <div
                                key={crypto.CoinInfo.Name}
                                className={`crypto-item ${pair.criptocurrency === crypto.CoinInfo.Name ? 'selected' : ''}`}
                                onClick={() => handleCryptoClick(crypto.CoinInfo.Name)}
                            >
                                <img 
                                    src={`https://cryptocompare.com${crypto.CoinInfo.ImageUrl || '/media/37746251/btc.png'}`}
                                    alt={crypto.CoinInfo.FullName}
                                    className="crypto-logo"
                                />
                                <div className="crypto-info">
                                    <span className="crypto-symbol">{crypto.CoinInfo.Name}</span>
                                    <span className="crypto-name">{crypto.CoinInfo.FullName}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
