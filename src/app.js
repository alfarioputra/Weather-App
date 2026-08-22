import { getWeatherData } from "./api/weather-api.js"

const input = document.getElementById('location')

export default function App() {
    input.addEventListener('keyup', (e) => {
        const location = input.value

        if (e.key === 'Enter' && location.trim() !== '' ) {
            console.log(`nama lokasi: ${location}`)

            getWeatherData(location)
        }
    })

}