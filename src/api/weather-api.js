const apikey = process.env.API_KEY

async function getWeatherData(addres) {
    try {
        const fetchData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${addres}?key=${apikey}`)
        const response =  await fetchData.json()
        
        return response

    } catch (error) {
        console.error("Can't connect to the API, Please try again", error)
    }
}

export { getWeatherData }