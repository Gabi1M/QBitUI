import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('@lingui/macro', () => {
    return {
        ...jest.requireActual('@lingui/macro'),
        t: jest.fn(),
    };
});

jest.mock('src/meridian/importMetaUtils', () => ({
    getVersion: jest.fn(),
    getIsDevEnv: jest.fn(),
    getIsMockEnabled: jest.fn(),
    getApiUrl: jest.fn(() => 'http://127.0.0.1:1000'),
}));

export { }