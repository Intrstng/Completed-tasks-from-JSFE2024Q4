import '../style.scss';
import LocalStorageState from '../state/localStorageState';
import { Pages } from '../types';
import Router from '../router/router';

export default class App {
    private readonly keyToRecordInLS: string;
    private router: any;
    private main: any;

    constructor() {}

    createView() {}

    createRoutes(state) {}

    setContent(page, view) {}

    init() {
        console.log('Application initialized...');
    }
}
