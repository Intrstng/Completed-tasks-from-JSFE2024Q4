import type {
    AppState,
    CallbackQuery,
    Car,
    Constants,
    DriveData,
    EngineData,
    Paths,
    QueryParameters,
    Winner,
} from '../../types';
import {
    AppStateKeys,
    CarStatus,
    ContentTypes,
    Description,
    Http_Methods,
    HttpHeaderKeys,
    QueryParameterKeys,
} from '../../types';
import type LocalStorageState from '../state/session-storage-state';
import { getQueryString } from '../util/api-handlers/get-query-string';
import {
    isCarArray,
    isCarItem,
    isDriveItem,
    isEngineItem,
    isWinnerArray,
    isWinnerItem,
} from '../util/assertion-functions/assertion-functions';

export default class ApiController {
    private readonly baseUrl: string;
    private readonly path: Paths;
    private readonly state: LocalStorageState;
    private readonly constants: Constants;
    private readonly getQueryString: CallbackQuery | null;

    constructor(paths: Paths, state: LocalStorageState, constants: Constants) {
        this.baseUrl = constants.baseURL;
        this.path = paths;
        this.state = state;
        this.constants = constants;
        this.getQueryString = getQueryString;
    }

    public async getCars(page: number): Promise<void> {
        try {
            const parameters: QueryParameters[] = [
                { key: QueryParameterKeys.PAGE, value: page },
                { key: QueryParameterKeys.LIMIT, value: this.constants.carsOnPage },
            ];

            const queryParameters = this.getQueryString ? this.getQueryString(parameters) : '';

            const response = await fetch(`${this.baseUrl}${this.path.garage}${queryParameters}`);

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            const responseData: unknown = await response.json();
            if (!isCarArray(responseData)) {
                throw new Error('API response does not match Car[] type');
            }

            const carsData: Car[] = responseData;
            const carsQuantity = Number(response.headers.get(HttpHeaderKeys.X_TOTAL_COUNT));

            const currentState: AppState = this.state.getState();
            const newState: AppState = {
                ...currentState,
                carsQuantity,
                cars: carsData,
            };
            this.state.setState(newState);
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
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

            const data: unknown = await response.json();

            if (isCarItem(data)) {
                return data;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async createCar(data: Partial<Car>): Promise<void> {
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
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async updateCar(data: Partial<Car>, id: number): Promise<void> {
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
                return undefined;
            }

            await response.json();
            const currentPage: AppState[AppStateKeys] = this.state.getState()[AppStateKeys.GARAGE_PAGE];

            if (typeof currentPage === 'number' && Number.isFinite(currentPage)) {
                await this.getCars(currentPage);
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async deleteCar(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
                method: Http_Methods.DELETE,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async startEngine(id: number): Promise<EngineData | undefined> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.engine}?id=${id}&${CarStatus.STARTED}`, {
                method: Http_Methods.PATCH,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            const data: unknown = await response.json();

            if (isEngineItem(data)) {
                return data;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async stopEngine(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.engine}?id=${id}&${CarStatus.STOPPED}`, {
                method: Http_Methods.PATCH,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async driveCar(id: number): Promise<DriveData | undefined> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.engine}?id=${id}&${CarStatus.DRIVE}`, {
                method: Http_Methods.PATCH,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return { success: false };
            }

            const data: unknown = await response.json();

            if (isDriveItem(data)) {
                return data;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async getAllWinners(sortType: string, sortOrderType: string = Description.ASC, page: number): Promise<void> {
        try {
            const parameters: QueryParameters[] = [
                { key: QueryParameterKeys.PAGE, value: page },
                { key: QueryParameterKeys.SORT, value: sortType },
                { key: QueryParameterKeys.ORDER, value: sortOrderType },
                { key: QueryParameterKeys.LIMIT, value: this.constants.winnersOnPage },
            ];

            const queryParameters = this.getQueryString ? this.getQueryString(parameters) : '';

            const response = await fetch(`${this.baseUrl}${this.path.winners}${queryParameters}`);

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            const winnersResponse: unknown = await response.json();
            let winners: Array<Winner> = [];

            if (isWinnerArray(winnersResponse)) {
                winners = winnersResponse;
            }

            const winnersQuantity = Number(response.headers.get(HttpHeaderKeys.X_TOTAL_COUNT));

            const winnersData: Awaited<Car | undefined>[] = await Promise.all(
                winners.map(winner => this.getCar(winner.id))
            );
            const validWinnersData: Car[] = winnersData.filter((car): car is Car => car !== undefined);

            const currentState: AppState = this.state.getState();

            const newState: AppState = {
                ...currentState,
                winners,
                winnersData: validWinnersData,
                winnersQuantity,
            };

            this.state.setState(newState);
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async createWinner(data: Winner): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.winners}`, {
                method: Http_Methods.POST,
                headers: {
                    [HttpHeaderKeys.CONTENT_TYPE]: ContentTypes.JSON,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async updateWinner(data: Partial<Winner>, id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`, {
                method: Http_Methods.PUT,
                headers: {
                    [HttpHeaderKeys.CONTENT_TYPE]: ContentTypes.JSON,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async deleteWinner(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`, {
                method: Http_Methods.DELETE,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }

    public async checkWinner(id: number): Promise<Winner | boolean | undefined> {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`, {
                method: Http_Methods.GET,
            });

            if (!response.ok) {
                return false;
            }

            const data: unknown = await response.json();

            if (isWinnerItem(data)) {
                return data;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
            return undefined;
        }
    }
}
