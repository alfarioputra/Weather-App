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
    const card = document.createElement('div')
    card.classList.add('card')

    const topLeft = document.createElement('div')
    topLeft.classList.add('top-left')

    const mainInfo = document.createElement('div')
    mainInfo.classList.add('main-info')

    const location = document.createElement('div')
    location.classList.add('location')

    const condition = document.createElement('h2')
    const currentConditions = weatherData.currentConditions.conditions
    condition.textContent = `Today: ${currentConditions}`

    const currentLocation = document.createElement('p')
    currentLocation.textContent = weatherData.resolvedAddress
    
    const tempContainer = document.createElement('div')
    tempContainer.classList.add('temp')
    
    const temp = document.createElement('h1')
    const currentTemp = `${weatherData.currentConditions.temp}°`
    temp.textContent = currentTemp
    
    const feelsContainer = document.createElement('div')
    feelsContainer.classList.add('feels-like')
    
    const feelsLike = document.createElement('p')
    const feelsMax = document.createElement('p')
    const feelsMin = document.createElement('p')
    
    const feels = weatherData.days[0]
    
    feelsLike.textContent = `Feels Likes: ${weatherData.currentConditions.feelslike}°`
    feelsMax.textContent = `Max: ${feels.feelslikemax}°`
    feelsMin.textContent = `Min: ${feels.feelslikemin}°`


    const moreInfo = document.createElement('div')
    moreInfo.classList.add('more-info')
    
    const moreInfoData = weatherData.currentConditions
    console.log(weatherData)

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
                <p>${moreInfoData.precipprob}%</p>
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
    
    location.append(condition, currentLocation)
    tempContainer.append(temp)
    feelsContainer.append(feelsLike, feelsMax, feelsMin)

    mainInfo.append(location, tempContainer, feelsContainer)

    topLeft.append(mainInfo, moreInfo)

    card.append(topLeft)

    cardContainer.appendChild(card)
}

function loadingComponent() {
    cardContainer.innerHTML = ''

    
}

export { renderWeatherData, prosesWeatherData }