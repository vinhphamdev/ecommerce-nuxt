import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = "https://strapi-poc.gophuot.vn"
const strapi = new Strapi(apiUrl)

export default strapi;
export { apiUrl }