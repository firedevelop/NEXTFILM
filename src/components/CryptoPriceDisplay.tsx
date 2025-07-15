import { useMemo } from "react"
import { useCryptoStore } from "../store"
import { currencies } from "../data"
import Spinner from "./Spinner"

// Mapeo de símbolos de moneda
const currencySymbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'MXN': '$'
}

export default function CryptoPriceDisplay() {

    const result = useCryptoStore((state) => state.result)
    const loading = useCryptoStore((state) => state.loading)
    const currentPair = useCryptoStore((state) => state.currentPair)
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const hasResult = useMemo(() => !Object.values(result).includes('') , [result])
    
    // Obtener información de la moneda seleccionada
    const selectedCurrency = currencies.find(currency => currency.code === currentPair.currency)
    const currencySymbol = currencySymbols[currentPair.currency] || currentPair.currency
    
    // Obtener información de la criptomoneda seleccionada
    const selectedCrypto = cryptocurrencies.find(crypto => crypto.CoinInfo.Name === currentPair.criptocurrency)
    
    return (
        <div className="result-wrapper">
            {loading ? (
                <Spinner />
            ) : hasResult ? (
                <>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.8rem', margin: '0.5rem 0', color: 'var(--black)' }}>
                            {currentPair.criptocurrency}
                        </h1>
                        <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: 'var(--gray-medium)', fontWeight: '600' }}>
                            {selectedCrypto?.CoinInfo.FullName || 'Criptomoneda'}
                        </h2>
                        <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0', color: 'var(--primary)', fontWeight: '500' }}>
                            {currencySymbol} {selectedCurrency?.name || 'Moneda'}
                        </h3>
                    </div>
                    <div className="result">
                        <img
                            src={`https://cryptocompare.com/${result.IMAGEURL}`}
                            alt="Imagen Cryptomoneda"
                        />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio más alto del día: <span>{result.HIGHDAY}</span></p>
                            <p>Precio más bajo del día: <span>{result.LOWDAY}</span></p>
                            <p>Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="welcome-state">
                    <div className="welcome-content">
                        <img 
                            src="/images/logo.svg" 
                            alt="Bitcoin Logo" 
                            className="welcome-logo"
                            onError={(e) => {
                                console.error('Error loading logo:', e);
                                // Fallback to a default icon if logo fails to load
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <h2>Crypto Monitor</h2>
                        <p>Selecciona una moneda y una criptomoneda para ver la cotización en tiempo real</p>
                        <div className="default-selection">
                            <span>🇺🇸 USD</span>
                            <span>→</span>
                            <span>₿ BTC</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
