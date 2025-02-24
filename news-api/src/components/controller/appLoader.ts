import Loader from './loader';
import { LoaderOptions } from '../../types';

class AppLoader extends Loader {
    constructor() {
        const apiUrl: string = process.env.API_URL as string;
        const options: LoaderOptions = {
            apiKey: process.env.API_KEY,
        };
        super(apiUrl, options);
    }
}

export default AppLoader;
