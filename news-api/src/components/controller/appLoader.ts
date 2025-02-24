import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl: string = process.env.API_URL as string;
        const options: LoaderOptions = {
            apiKey: process.env.API_KEY,
        };
        super(apiUrl, options);
    }
}

export type LoaderOptions = {
    apiKey: string | undefined;
}

export type MergedOptions = {
    sources?: string | null;
    apiKey?: string | undefined;
};

export default AppLoader;
