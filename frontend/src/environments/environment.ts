export const environment = {
  production: false,
  auth: {
    clientID: "fnABUxb1JbtqtS72ejN7tFm1yXqXvWeb",
    domain: "dev-b7eep6ob.auth0.com",
    redirect: "http://localhost:4200/callback",
    scope: "openid profile email",
    audience: "https://dev-b7eep6ob.auth0.com/api/v2/"
  },
  movieDB: {
    url: "https://api.themoviedb.org/3",
    imgUrl: " https://image.tmdb.org",
    apiKey: "9f798505a4fc839aa041c8d16b491db5"
  },
  myApi: {
    url: "http://localhost:3000/api"
  }
};
