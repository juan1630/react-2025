import { describe, expect, test } from "vitest";
import { giphyApi } from './giphy.api'

describe('giphyApi', () => {
    test('should be configured correctly', ()=> {
        const params = giphyApi.defaults.params

        expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs")
        // expect(giphyApi.defaults.params.lang).toBe("en")
        // expect(giphyApi.defaults.params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY)
        //toBe solo para tipos primitivos
        expect(params).toStrictEqual({ lang: 'en', api_key: 'cL0ZFTFSvJXloQHonXZOlM7n4N8gQAEs' })
    })
})