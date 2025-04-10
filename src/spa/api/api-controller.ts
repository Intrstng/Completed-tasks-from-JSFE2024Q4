import {
    AppState,
    AppStateKeys,
    Car,
    CarStatus,
    Constants,
    ContentTypes,
    Description,
    EngineData,
    Http_Methods,
    HttpHeaderKeys,
    Paths,
    QueryParameterKeys,
    QueryParameters,
    Winner,
} from '../../types';
import LocalStorageState from '../state/session-storage-state';

export default class ApiController {
    private readonly baseUrl: string;
    private readonly path: Paths;
    private readonly state: LocalStorageState;
    private readonly constants: Constants;

    constructor(paths: Paths, state: LocalStorageState, constants: Constants) {
        this.baseUrl = constants.baseURL;
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
            await this.state.setState(newState);
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
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
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
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
                return undefined;
            }

            // const newCar = await response.json();
            // const currentState: AppState = this.state.getState();
            // const newState: AppState = {
            //     ...currentState,
            //     cars: [...currentState.cars, newCar],
            // };
            // this.state.setState(newState);
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
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
                return undefined;
            }

            await response.json();
            const currentPage: AppState[AppStateKeys] = this.state.getState()[AppStateKeys.GARAGE_PAGE];

            if (typeof currentPage === 'number' && isFinite(currentPage)) {
                console.log('Inside update api call');
                await this.getCars(currentPage);
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
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
                return undefined;
            }
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async startEngine(id: number): Promise<EngineData | undefined> | undefined {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.engine}?id=${id}&${CarStatus.STARTED}`, {
                method: Http_Methods.PATCH,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            return await response.json();
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async stopEngine(id: number): Promise<void> | undefined {
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
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async driveCar(id: number): Promise<{ success: boolean } | undefined> | undefined {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.engine}?id=${id}&${CarStatus.DRIVE}`, {
                method: Http_Methods.PATCH,
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return { success: false };
            }

            return await response.json();
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async getAllWinners(
        sortType: string,
        sortOrderType: string = Description.ASC,
        page: number
    ): Promise<void> | undefined {
        try {
            const parameters: QueryParameters[] = [
                { key: QueryParameterKeys.PAGE, value: page },
                { key: QueryParameterKeys.SORT, value: sortType },
                { key: QueryParameterKeys.ORDER, value: sortOrderType },
                { key: QueryParameterKeys.LIMIT, value: this.constants.winnersOnPage },
            ];

            const response = await fetch(`${this.baseUrl}${this.path.winners}${this.getQueryString(parameters)}`);

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return undefined;
            }

            const winners = await response.json();
            const winnersQuantity = Number(response.headers.get(HttpHeaderKeys.X_TOTAL_COUNT));

            const winnersData = await Promise.all(winners.map((winner: Winner) => this.getCar(winner.id)));

            const currentState: AppState = this.state.getState();

            const newState: AppState = {
                ...currentState,
                winners,
                winnersData,
                winnersQuantity,
            };

            this.state.setState(newState);
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async createWinner(data: Winner): Promise<void> | undefined {
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
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async updateWinner(data: Partial<Winner>, id: number): Promise<void> | undefined {
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
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async deleteWinner(id: number): Promise<void> | undefined {
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
                error instanceof Error ? error.message : String(error)
            );
            return undefined;
        }
    }

    public async checkWinner(id: number): Promise<Winner | boolean | undefined> | undefined {
        try {
            const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`, {
                method: Http_Methods.GET,
            });

            if (!response.ok) {
                return false;
            }

            return await response.json();
        } catch (error: unknown) {
            console.error(
                'Network error or unexpected issue occurred:',
                error instanceof Error ? error.message : String(error)
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
