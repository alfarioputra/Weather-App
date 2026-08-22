import { API_KEY } from './api-key.js'

async function getWeatherData(addres) {
    try {
        const fetchData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${addres}?key=${API_KEY}`)
        const response =  await fetchData.json()
        
        console.log(response)
    } catch (error) {
        throw new Error("Can't connect to the API, Please try again", error)
    }
}

export { getWeatherData }