import fetchMock from 'jest-fetch-mock';

import { getApiUrl } from 'meridian/importMetaUtils';

import { Api } from '../api';
import { ApiError, ContentType, Headers, RequestMethod } from '../types';

interface TestObjectType {
    a: number;
    b: number;
    c: string;
    d: {
        e: number;
        f: string;
    };
}

const testObject: TestObjectType = {
    a: 1,
    b: 2,
    c: '3',
    d: {
        e: 4,
        f: '5',
    },
};

describe('Api', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe('get', () => {
        it('should return the correct response for successful GET request for application/json content type', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
            });
            const api = new Api();
            const response = await api.get<TestObjectType>('something');
            expect(response).toStrictEqual(testObject);
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: undefined,
                credentials: 'include',
                method: RequestMethod.GET,
            });
        });

        it('should return the correct response for successful GET request for application/json content type with params', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
            });
            const searchParams = new URLSearchParams({
                someParam: 'some',
            });
            const api = new Api();
            const response = await api.get<TestObjectType>('something', searchParams);
            expect(response).toStrictEqual(testObject);
            expect(fetchMock).toHaveBeenCalledWith(
                `${getApiUrl()}/api/v2/something?${searchParams.toString()}`,
                {
                    headers: undefined,
                    credentials: 'include',
                    method: RequestMethod.GET,
                },
            );
        });

        it('should return the correct response for successful GET request for text/plain content type', async () => {
            fetchMock.mockResponseOnce('Correct response', {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.TEXT_PLAIN,
                },
            });
            const api = new Api();
            const response = await api.get<TestObjectType>('something');
            expect(response).toStrictEqual('Correct response');
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: undefined,
                credentials: 'include',
                method: RequestMethod.GET,
            });
        });

        it('should throw error if status code is not successful for GET request', async () => {
            const status = 400;
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
                status,
            });
            const api = new Api();
            await expect(api.get<TestObjectType>('something')).rejects.toThrowError(
                new ApiError(
                    status,
                    `GET request for ${getApiUrl()}/api/v2/something failed with status: ${status}`,
                ),
            );
        });
    });

    describe('post', () => {
        it('should return the correct response for successful POST request for application/json', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
            });
            const api = new Api();
            const response = await api.post<TestObjectType>(
                'something',
                JSON.stringify(testObject),
            );
            expect(response).toStrictEqual(testObject);
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: { [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON },
                credentials: 'include',
                method: RequestMethod.POST,
                body: JSON.stringify(testObject),
            });
        });

        it('should return the correct response for successful POST request for text/plain', async () => {
            fetchMock.mockResponseOnce('Correct response', {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.TEXT_PLAIN,
                },
            });
            const api = new Api();
            const response = await api.post<TestObjectType>(
                'something',
                JSON.stringify(testObject),
            );
            expect(response).toStrictEqual('Correct response');
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: { [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON },
                credentials: 'include',
                method: RequestMethod.POST,
                body: JSON.stringify(testObject),
            });
        });

        it('should return the correct response for successful POST request with form data', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
            });
            const formData = new FormData();
            formData.append('data', JSON.stringify(testObject));
            const api = new Api();
            const response = await api.post<TestObjectType>('something', formData);
            expect(response).toStrictEqual(testObject);
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.MULTIPART_FORM_DATA,
                },
                credentials: 'include',
                method: RequestMethod.POST,
                body: formData,
            });
        });

        it('should throw error if status code is not successful for POST request', async () => {
            const status = 400;
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
                status,
            });
            const api = new Api();
            await expect(
                api.post<TestObjectType>('something', JSON.stringify(testObject)),
            ).rejects.toThrowError(
                new ApiError(
                    status,
                    `POST request for ${getApiUrl()}/api/v2/something failed with status: ${status}`,
                ),
            );
        });
    });

    describe('delete', () => {
        it('should return the correct response for successful DELETE request for application/json content type', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
            });
            const api = new Api();
            const response = await api.delete<TestObjectType>('something');
            expect(response).toStrictEqual(testObject);
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: undefined,
                credentials: 'include',
                method: RequestMethod.DELETE,
            });
        });

        it('should return the correct response for successful DELETE request for application/json content type', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
            });
            const searchParams = new URLSearchParams({
                someParam: 'some',
            });
            const api = new Api();
            const response = await api.delete<TestObjectType>('something', searchParams);
            expect(response).toStrictEqual(testObject);
            expect(fetchMock).toHaveBeenCalledWith(
                `${getApiUrl()}/api/v2/something?${searchParams.toString()}`,
                {
                    headers: undefined,
                    credentials: 'include',
                    method: RequestMethod.DELETE,
                },
            );
        });

        it('should return the correct response for successful DELETE request for text/plain content type', async () => {
            fetchMock.mockResponseOnce('Correct response', {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.TEXT_PLAIN,
                },
            });
            const api = new Api();
            const response = await api.delete<TestObjectType>('something');
            expect(response).toStrictEqual('Correct response');
            expect(fetchMock).toHaveBeenCalledWith(`${getApiUrl()}/api/v2/something`, {
                headers: undefined,
                credentials: 'include',
                method: RequestMethod.DELETE,
            });
        });

        it('should throw error if status code is not successful for GET request', async () => {
            const status = 400;
            fetchMock.mockResponseOnce(JSON.stringify(testObject), {
                headers: {
                    [Headers.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
                },
                status,
            });
            const api = new Api();
            await expect(api.delete<TestObjectType>('something')).rejects.toThrowError(
                new ApiError(
                    status,
                    `DELETE request for ${getApiUrl()}/api/v2/something failed with status: ${status}`,
                ),
            );
        });
    });
});
