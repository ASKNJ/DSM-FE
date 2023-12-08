export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_UNAUTHORIZED = 401;


export const getToken = async (scope) => {
    try {
        const response = await fetch(process.env.REACT_APP_ACCESS_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_BE_CLIENT_ID}&client_secret=${process.env.REACT_APP_BE_CLIENT_SECRET_KEY}&scope=${scope}`
        });
        const resData = await response.json();
        if (response.status === HTTP_STATUS_OK) {
            return resData.access_token;
        }
    }
    catch (err) {
        console.log('There is an error while fetching data: ', err);
        return null;
    }
}


export const getCategoryImpactsData = async (catId, accesstoken) => {
    try {
        const url = catId === -1 ? `${process.env.REACT_APP_API_BASE_URL}/prod/footprints` :
            `${process.env.REACT_APP_API_BASE_URL}/prod/footprints?cat=${catId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
            }
        });
        const resData = await response.json();
        if (response.status === HTTP_STATUS_OK) {
            return resData;
        }
        else if (response.status === HTTP_STATUS_UNAUTHORIZED) {
            const new_access_token = await getToken(process.env.REACT_APP_ACCESS_READ_SCOPE);
            getDataPerImpact(catId, new_access_token);
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('There is an error while fetching data: ', err);
        return null;
    }
};

export const getDataPerImpact = async (impactId, accesstoken) => {
    console.log('impactId is: ',impactId);
    try {
        const url = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${url}/prod/footprints/${impactId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
            }
        });
        const resData = await response.json();
        if (response.status === HTTP_STATUS_OK) {
            const categoryData = resData.filter((data, idx) =>
                data?.contrib_id_type?.split('#')[1].toLowerCase() === "category"
            );
            const otherData = resData.filter((data, idx) =>
                data?.contrib_id_type?.split("#")[2]?.toLowerCase() === "other"
            );
            return [categoryData, otherData];
        }
        else if (response.status === HTTP_STATUS_UNAUTHORIZED) {
            const new_access_token = await getToken(process.env.REACT_APP_ACCESS_READ_SCOPE);
            getDataPerImpact(impactId, new_access_token);
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('There is an error while fetching data per impact id: ', err);
        return null;
    }
};


