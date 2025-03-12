import Loader from './loader';
import { ApiItem, LoaderOptions } from '../../types';

class AppLoader extends Loader {
    constructor() {
        const apiUrl: ApiItem = process.env.API_URL;
        const apiKey: ApiItem = process.env.API_KEY;

        if (!apiUrl || !apiKey) {
            const errorMessage = 'API_URL or API_KEY is not defined in environment variables.';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        const options: LoaderOptions = {
            apiKey,
        };
        super(apiUrl, options);
    }
}

export default AppLoader;
