import { API_KEY } from './ApiKey.js'

export default function App() {
    console.log('hello world')
    const input = document.getElementById('location')
    
    function fetchData(addres) {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${addres}?key=${API_KEY}`)
            .then((response => response.json()))
            .then((data) => console.log(data))
            .catch(err => console.log('error', err))
    }

    input.addEventListener('keyup', (e) => {
        const location = input.value

        if (e.key === 'Enter' && location.trim() !== '' ) {
            console.log(`nama lokasi: ${location}`)

            fetchData(location)
        }
    })

}