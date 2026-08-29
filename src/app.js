import { prosesWeatherData } from "./dom.js"

const input = document.getElementById('location')

prosesWeatherData('jakarta')

export default function App() {
    input.addEventListener('keyup', (e) => {
        const location = input.value

        if (e.key === 'Enter' && location.trim() !== '' ) {
            console.log(`nama lokasi: ${location}`)

            prosesWeatherData(location)

            input.value = ''
        }
    })

}