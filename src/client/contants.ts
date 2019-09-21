interface Endpoints {
    login: string;
    signUp: string;
}
interface Configuration {
    endpoints: Endpoints;
    baseUrl: string;
}

const configurations: { [key in 'development' | 'production']: Configuration } = {
    development: {
        baseUrl: 'http://localhost:3000',
        endpoints: {
            login: '/auth/login',
            signUp: '/user',
        },
    },
    production: {
        baseUrl: '',
        endpoints: {
            login: '',
            signUp: '',
        },
    },
};

export const configurationMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const selectedConfiguration = configurations[configurationMode];

Object.keys(selectedConfiguration.endpoints).forEach((k) => {
    const dynamicEndpoints = selectedConfiguration.endpoints as any;
    dynamicEndpoints[k] = selectedConfiguration.baseUrl + dynamicEndpoints[k];
});

export const configuration = selectedConfiguration;
