import { getWeatherData } from "./api/weather-api.js"

const container = document.querySelector('.container')
const cardContainer = document.querySelector('.card-wrap')

let weatherData = null

async function prosesWeatherData(location) {
    loadingComponent()
    
    weatherData = await getWeatherData(location)

    renderWeatherData(weatherData)
}

function renderWeatherData(weatherData) {
    cardContainer.innerHTML = ''

    if (!weatherData) {
        const errorMessage = document.createElement('p')
        errorMessage.textContent = 'Please enter valid location.'
        cardContainer.appendChild(errorMessage)
        return
    }

    const currentConditions = weatherData.currentConditions.conditions
    const currentTemp = weatherData.currentConditions.temp
    const feels = weatherData.days[0]
    const moreInfoData = weatherData.currentConditions

    const cardTop = document.createElement('div')
    cardTop.classList.add('card')

    const topLeft = document.createElement('div')
    topLeft.classList.add('top-left')

    const mainInfo = document.createElement('div')
    mainInfo.classList.add('main-info')

    const location = document.createElement('div')
    location.classList.add('location')

    const condition = document.createElement('h2')
    condition.textContent = `Today: ${currentConditions}`

    const currentLocation = document.createElement('p')
    currentLocation.textContent = weatherData.resolvedAddress
    
    const tempContainer = document.createElement('div')
    tempContainer.classList.add('temp')
    
    const temp = document.createElement('h1')
    temp.textContent = `${currentTemp}°`
    
    const feelsContainer = document.createElement('div')
    feelsContainer.classList.add('feels-like')
    
    const feelsLike = document.createElement('p')
    feelsLike.textContent = `Feels Likes: ${weatherData.currentConditions.feelslike}°`

    const feelsMax = document.createElement('p')
    feelsMax.textContent = `Max: ${feels.feelslikemax}°`
    
    const feelsMin = document.createElement('p')
    feelsMin.textContent = `Min: ${feels.feelslikemin}°`

    const moreInfo = document.createElement('div')
    moreInfo.classList.add('more-info')
    moreInfo.innerHTML = `
        <div class="more-info-card">
            <div>
                <p>Humidity</p>
                <p><b>${moreInfoData.humidity}%</b></p>
            </div>
        </div>
        <div class="more-info-card">
            <div>
                <p>UV Index</p>
                <p><b>${moreInfoData.uvindex}</b></p>
            </div>
        </div>
        <div class="more-info-card">
            <div>
                <p>Chance of rain</p>
                <p><b>${moreInfoData.precipprob}%</b></p>
            </div>
        </div>
        <div class="more-info-card">
            <div>
                <p>Sunrise</p>
                <p><b>${moreInfoData.sunrise}</b></p>
            </div>
        </div>
        <div class="more-info-card">
            <div>
                <p>Wind speed</p>
                <p><b>${moreInfoData.windspeed} mph</b></p>
            </div>
        </div>
        <div class="more-info-card">
            <div>
                <p>Sunset</p>
                <p><b>${moreInfoData.sunset}</b></p>
            </div>
        </div>
    `

    const cardBottom = document.createElement('div')
    cardBottom.classList.add('card')
    
    const bottomRight = document.createElement('div')
    bottomRight.classList.add('bottom-right')
    
    const forecastTitle = document.createElement('h2')
    forecastTitle.textContent = 'Next 5 days'
    
    const forecastContainer = document.createElement('div')
    forecastContainer.classList.add('forecast-container')
    
    
    const forecastDays = weatherData.days.slice(1, 6)

    forecastDays.forEach((days, i) => {

        let daysName = new Date(days.datetime).toLocaleDateString('en', { weekday: 'long' })

        if (i === 0) daysName = 'Tomorrow'

        const forecast = document.createElement('div')
        forecast.classList.add('forecast')
        forecast.innerHTML = `
            <div class="day-container">
                <p><b>${daysName}</b></p>
                <p>${days.conditions}</p>
                <div class="day-forecast-temp">
                    <p><b>${days.tempmax}°</b></p>
                    <p>${days.tempmin}°</p>
                </div>
            </div>
        `

        forecastContainer.appendChild(forecast)
    })

    bottomRight.append(forecastTitle, forecastContainer)
    
    location.append(condition, currentLocation)
    tempContainer.append(temp)
    feelsContainer.append(feelsLike, feelsMax, feelsMin)

    mainInfo.append(location, tempContainer, feelsContainer)

    topLeft.append(mainInfo, moreInfo)

    cardTop.appendChild(topLeft)
    cardBottom.appendChild(bottomRight)

    cardContainer.append(cardTop, cardBottom)
}

function loadingComponent() {
    cardContainer.innerHTML = ''
    
    const loading = document.createElement('p')
    loading.textContent = 'Loading...'
    
    cardContainer.appendChild(loading)
}

export { renderWeatherData, prosesWeatherData }