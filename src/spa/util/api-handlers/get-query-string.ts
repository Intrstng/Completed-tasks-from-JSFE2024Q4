import type { QueryParameters } from '../../../types';

export function getQueryString(queryParameters: QueryParameters[]): string {
    if (queryParameters.length === 0) {
        return '';
    }

    const queryString: string = queryParameters
        .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    return `?${queryString}`;
}
