

const API_URL = `http://4.237.58.241:3000`;



export const login = (email, password) => {
    const url = `${API_URL}/user/login`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Login failed.');
        }
        return res.json();
    })
    .then((response) => { 
        localStorage.setItem("token", response.token);
        return response;
    });
};


  export const register = (email, password) =>{
    const url = `${API_URL}/user/register`;
    return fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        
        },
        body: JSON.stringify({ email, password}),
    })
    .then ((res) => res.json())
    .then((response)=> {
        console.log(response.message);
        return response;
    })
  }

  export const getAuthenticatedResource = (resourceId) => {
    const url = `${API_URL}/${resourceId}`;
    const token = localStorage.getItem("token"); // Retrieve the stored token
    
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Include the token in the Authorization header
      },
    })
    .then((res) => res.json())
    .then((response) => {
      console.log('Resource fetched', response);
      return response;
    });
  };

  
  export function getCountriesWithVolcanoes() {
    const url = `${API_URL}/countries`;
    return fetch(url)
      .then((res) => res.json()); 
}

  export function getVolcanoWithCountries(country,distance) {
    const url = `${API_URL}/volcanoes?country=${country}&populatedWithin=${distance}km`
    return fetch(url)
      .then((res) => res.json())
      .then((data) =>
        data.map((volcano) => ({
          
            id: volcano.id,
            name: volcano.name,
            country:  volcano.country,
            region: volcano.region,
            subregion: volcano.subregion

        }))
      );
  }

  export const getVolcanoDetails = (volcanoId) => {
    const url = `${API_URL}/volcano/${volcanoId}`;
    const token = localStorage.getItem("token");
    
    const headers = {
        "Content-Type": "application/json"
    };

    if(token){
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(url, {
        method: "GET",
        headers: headers,
      })
      .then((res) => {
          if (!res.ok) {
              throw new Error('Failed to fetch volcano details');
          }
          return res.json();
      })
      .then((volcano) => ({
          
          name: volcano.name,
          country: volcano.country,
          region: volcano.region,
          subregion: volcano.subregion,
          last_eruption: volcano.last_eruption,
          summit: volcano.summit,
          elevation: volcano.elevation,
          latitude: volcano.latitude,
          longitude: volcano.longitude,
      }))
      .catch((error) => {
          console.error(error);
        
          throw error;
      });
  };