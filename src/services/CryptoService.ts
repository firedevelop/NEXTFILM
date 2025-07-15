import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from '../schema/crypto-schema'
import { Pair } from '../types'

export async function getCryptos() {
    try {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
        const {data: { Data }} = await axios(url)
        const result = CryptoCurrenciesResponseSchema.safeParse(Data)
        if(result.success) {
            return result.data
        } else {
            console.error('Error parsing crypto data:', result.error)
            return []
        }
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error)
        return []
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    try {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`
        const { data: { DISPLAY } } = await axios(url)
        const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
        if(result.success) {
            return result.data
        } else {
            console.error('Error parsing price data:', result.error)
            return {
                IMAGEURL : '',
                PRICE: '',
                HIGHDAY: '',
                LOWDAY: '',
                CHANGEPCT24HOUR: '',
                LASTUPDATE: ''
            }
        }
    } catch (error) {
        console.error('Error fetching crypto price:', error)
        return {
            IMAGEURL : '',
            PRICE: '',
            HIGHDAY: '',
            LOWDAY: '',
            CHANGEPCT24HOUR: '',
            LASTUPDATE: ''
        }
    }
}