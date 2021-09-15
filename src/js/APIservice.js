const BASE_URL = "https://pixabay.com/api/?image_type=photo&orientation=horizontal"
const API_KEY = "23364798-13e999d1bd4f00c21ed04ef58"

export default async function fetchImages(name, page) {
    const response = await fetch(`${BASE_URL}&q=${name}&page=${page}&per_page=12&key=${API_KEY}`)
    if (!response.ok) {
        throw new Error("Connection error. Try again later.")
    }
    return await response.json( )
}