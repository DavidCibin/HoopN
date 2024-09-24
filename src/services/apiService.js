// const BASE_URL = process.env.REACT_APP_API_URL || '/api/api/';
const BASE_URL = '/api/api/';

function getWeatherZ(zip) {
    fetch(BASE_URL + "weather/zip/" + zip).then(res => { console.log(res); return res.json() })
        .catch(err => console.log(err));
}

<<<<<<< HEAD
async function getWeatherL(lat, lng) {
    return await fetch(BASE_URL + "weather/loc/" + lat + "&" + lng)
        .then((response) => {
            return response.json()
=======
async function getWeatherL(lat,lng)
{
    console.log(lat,lng, BASE_URL+"weather/loc/"+lat+"&"+lng);
    return await fetch (BASE_URL+"weather/loc/"+lat+"&"+lng)
    .then((response)=>{
        return response.json()
>>>>>>> 3361a9674670cb2fec85a6d063437e97f7a2ff42

        })
        .then((data) => {
            console.log(data, 'weather')
            return data

        })
        .catch(err => { console.log(err) })
}

function getPlacesZ(zip) {
    return fetch(BASE_URL + "nps/zip/" + zip)
}




function getPhoto(ref) {
    console.log(ref, "^^This is the photoRef");

    return fetch(BASE_URL + "photos/" + ref)
        .then((response) => {
            console.log(response, "\n^^This is the photo response")
            return response

        })
        .then((data) => {

            console.log(data, 'places')
            return data

        })
        .catch(err => { console.log(err) })

}

function getPlacesL(lat, lng) {
    return fetch(BASE_URL + "nps/loc/" + lat + "&" + lng)
        .then((response) => {
            // console.log(response.json(), 'response.json() here');
            return response.json()

        })
        .then((data) => {
            console.log(data, 'places here')
            return data

        })
        .catch(err => { console.log(err) })
}

function getPlaceById(placeId) {
    return fetch(BASE_URL + `place/${placeId}`)
        .then((response) => {
            return response.json()

        })
        .then((data) => {

            console.log(data, 'places')
            return data

        })
        .catch(err => { console.log(err) })
}

// eslint-disable-next-line
export default
    {
        getWeatherZ,
        getWeatherL,
        getPlacesZ,
        getPlacesL,
        getPlaceById,
        getPhoto
    }