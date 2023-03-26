import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(
        'https://7vhpofmv4m.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    )
    .then((res) => {
        return res.json();
    })
    .catch((error) => error);

    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
}

const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
    .then ((res) => res.json())
    .catch((error) => error.json());

    return result;
};

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.history.pushState('', '', newUrl);
    }
    else {
        newUrl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newUrl);
    }
};


export const getEvents = async () => {
    NProgress.start();

    if (window.location.href.indexOf('localhost') > -1) {
        NProgress.done();
        return mockData;
    };
    
    if (result.data) {
        var locations = extractLocations(result.data.events);
        localStorage.setItem('lastEvents', JSON.stringify(result.data));
        localStorage.setItem('locations', JSON.stringify(locations));
    };
    
    if (!navigator.onLine) {
        const data = localStorage.getItem("lastEvents");
        NProgress.done();
        return data ? JSON.parse(events).events:[];
    };

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = 'https://7vhpofmv4m.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
        const result = await axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem('lastEvents', JSON.stringify(result.data));
            localStorage.setItem('locations', JSON.stringify(locations));
            NProgress.done();
            return result.data.events;
        }
    };
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if (!code) {
            const results = await axios.get(
                'https://7vhpofmv4m.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
            );
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }

    return accessToken;
};