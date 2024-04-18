const API_URL = `http://4.237.58.241:3000`;

/* This entire page handles all of the API requests a user would make with the volcano api */
export const apiLogin = (email, password) => {
    const url = `${API_URL}/user/login`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => Promise.reject(json));
            }

        })
        .then((response) => {
            localStorage.setItem("token", response.token);
            return response;
        })
        .catch(error => {
            throw new Error(error.message || 'Login failed, please try again.');
        });
};


export const register = (email, password) => {
    const url = `${API_URL}/user/register`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(json => {
                    throw new Error(json.message || 'Registration failed, please try again.');
                });
            }
        })
        .catch(error => {
            throw error;
        });
};

export const getAuthenticatedResource = (resourceId) => {
    const url = `${API_URL}/${resourceId}`;
    const token = localStorage.getItem("token");

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch countries');
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error);
            throw error; 
        });
}

export function getVolcanoWithCountries(country, distance) {
    const url = `${API_URL}/volcanoes?country=${country}&populatedWithin=${distance}km`;
    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch volcanoes for the given country and distance');
            }
            return res.json();
        })
        .then((data) => data.map((volcano) => ({
            id: volcano.id,
            name: volcano.name,
            country: volcano.country,
            region: volcano.region,
            subregion: volcano.subregion,
        })))
        .catch((error) => {
            console.error(error);
            throw error; 
        });
}

export const getVolcanoDetails = (volcanoId) => {
    const url = `${API_URL}/volcano/${volcanoId}`;
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Token:", token);
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
        .then((volcano) => {
            // Volcano object for if user not logged in
            const volcanoDetails = {
                name: volcano.name,
                country: volcano.country,
                region: volcano.region,
                subregion: volcano.subregion,
                last_eruption: volcano.last_eruption,
                summit: volcano.summit,
                elevation: volcano.elevation,
                latitude: volcano.latitude,
                longitude: volcano.longitude,
            };

            // If user logged in then they get extra info
            if (token) {
                volcanoDetails.population_5km = volcano.population_5km;
                volcanoDetails.population_10km = volcano.population_10km;
                volcanoDetails.population_30km = volcano.population_30km;
                volcanoDetails.population_100km = volcano.population_100km;
            }

            return volcanoDetails;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};



