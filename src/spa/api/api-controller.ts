import {
    AppState,
    AppStateKeys,
    Car,
    Constants,
    ContentTypes,
    Http_Methods,
    HttpHeaderKeys,
    Paths,
    QueryParameterKeys,
    QueryParameters,
} from '../../types';
import { CONSTANTS } from '../state/initialState';
import LocalStorageState from '../state/local-storage-state';

export default class ApiController {
    private readonly baseUrl: string;
    private readonly path: Paths;
    private readonly state: LocalStorageState;
    private readonly constants: Constants;

    constructor(baseUrl: string, paths: Paths, state: LocalStorageState, constants: Constants) {
        this.baseUrl = baseUrl;
        this.path = paths;
        this.state = state;
        this.constants = constants;
    }

    public async getCars(page: number): Promise<void> | undefined {
        try {
            const parameters: QueryParameters[] = [
                { key: QueryParameterKeys.PAGE, value: page },
                { key: QueryParameterKeys.LIMIT, value: this.constants.carsOnPage },
            ];

            const response = await fetch(`${this.baseUrl}${this.path.garage}${this.getQueryString(parameters)}`);

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            const carsData: Car[] = await response.json();
            const carsQuantity = Number(response.headers.get(HttpHeaderKeys.X_TOTAL_COUNT));

            const currentState: AppState = this.state.getState();
            const newState: AppState = {
                ...currentState,
                carsQuantity,
                cars: carsData,
            };

            this.state.setState(newState);
        } catch (error) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : error
            );
            return undefined;
        }
    }

    public async getCar(id: number): Promise<Car | undefined> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
                method: Http_Methods.GET,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            return await response.json();
        } catch (error) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : error
            );
            return undefined;
        }
    }

    public async createCar(data: Partial<Car>): Promise<void> | undefined {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.garage}`, {
                method: Http_Methods.POST,
                headers: {
                    [HttpHeaderKeys.CONTENT_TYPE]: ContentTypes.JSON,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : error
            );
            return undefined;
        }
    }

    public async updateCar(data: Partial<Car>, id: number): Promise<void> | undefined {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
                method: Http_Methods.PUT,
                headers: {
                    [HttpHeaderKeys.CONTENT_TYPE]: ContentTypes.JSON,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }

            await response.json();
            // const curPage = state.get('page');
            const currentPage: AppState[AppStateKeys] = this.state.getField(AppStateKeys.GARAGE_PAGE);
            if (currentPage instanceof Number && typeof currentPage === 'number' && isFinite(currentPage)) {
                await this.getCars(currentPage);
            }
        } catch (error) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : error
            );
            return undefined;
        }
    }

    public async deleteCar(id: number): Promise<void> | undefined {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
                method: Http_Methods.DELETE,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : error
            );
            return undefined;
        }
    }

    private getQueryString(queryParameters: QueryParameters[]): string {
        if (queryParameters.length === 0) {
            return '';
        }

        const queryString: string = queryParameters
            .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return `?${queryString}`;
    }
}
