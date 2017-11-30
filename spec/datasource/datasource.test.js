import { ApiDataSource } from '../../src/datasource';
import { Parser } from '../../src/data_parser';

const instanceSettings = {
    name: 'test',
    type: 'table',
    url: 'localhost:8000',
    withCredentials: false,
    basicAuth: 'test'
};
const NoAuthInstanceSettings = {
    name: 'test',
    type: 'table',
    url: 'localhost:8000',
    withCredentials: false,
    basicAuth: ''
};

const $q = {
    when(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data);
            }, 100);
        });
    }
};
const backendSrv = {
    datasourceRequest: jest.fn()
};

const RequestFailMock = (options) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: 500, data: [] });
        }, 100);
    });
};
const RequestSuccessMock = (options) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: 200, data: [] });
        }, 100);
    });
};

const templateSrv = {};

const testDatasourceResult = { status: 'success', message: 'Data source is working', title: 'Success' };

const emptyOptionsQuery = { targets: [{ queryConfig: {}}] };

const noPathOptionsQuery = {
    targets: [
        {
            queryConfig: `{
                "method": "POST",
                "query": {},
                "format": "table",
                "columns": [
                    { "key": "time", "label": "column name 1" },
                    { "key": "name", "label": "column name 2" }
                ]
            }`
        }
    ]
};

const noMethodOptionsQuery = {
    targets: [
        {
            queryConfig: `{
                "path": "/api",
                "query": {},
                "format": "table",
                "columns": [
                    { "key": "time", "label": "column name 1" },
                    { "key": "name", "label": "column name 2" }
                ]
            }`
        }
    ]
};

const rightPostOptionsQuery = {
    targets: [
        {
            queryConfig: `{
                "path": "/api",
                "method": "POST",
                "query": {},
                "format": "table",
                "columns": [
                    { "key": "time", "label": "column name 1" },
                    { "key": "name", "label": "column name 2" }
                ]
            }`
        }
    ],
    range: {
        from: { _d: 1510200000000 },
        to: { _d: 1510300000000 }
    }
};
const rightPostNoQueryOptionsQuery = {
    targets: [
        {
            queryConfig: `{
                "path": "/api",
                "method": "POST",
                "format": "table",
                "columns": [
                    { "key": "time", "label": "column name 1" },
                    { "key": "name", "label": "column name 2" }
                ]
            }`
        }
    ],
    range: {
        from: { _d: 1510200000000 },
        to: { _d: 1510300000000 }
    }
};
const rightGetOptionsQuery = {
    targets: [
        {
            queryConfig: `{
                "path": "/api",
                "method": "GET",
                "query": {},
                "format": "table",
                "columns": [
                    { "key": "time", "label": "column name 1" },
                    { "key": "name", "label": "column name 2" }
                ]
            }`
        }
    ],
    range: {
        from: { _d: 1510200000000 },
        to: { _d: 1510300000000 }
    }
};

describe('apiDataSource', () => {

    test('Class no basicAuth', () => {
        const apiDataSource = new ApiDataSource(NoAuthInstanceSettings, $q, backendSrv, templateSrv);
        expect(apiDataSource.query).toBeInstanceOf(Function);
        expect(apiDataSource.testDatasource).toBeInstanceOf(Function);
        expect(apiDataSource.doRequest).toBeInstanceOf(Function);
        expect(apiDataSource.q).toEqual($q);
        expect(apiDataSource.backendSrv).toEqual(backendSrv);
        expect(apiDataSource.templateSrv).toEqual(templateSrv);
        expect(apiDataSource.name).toBe(instanceSettings.name);
        expect(apiDataSource.type).toBe(instanceSettings.type);
        expect(apiDataSource.url).toBe(instanceSettings.url);
        expect(apiDataSource.withCredentials).toBe(instanceSettings.withCredentials);
        expect(apiDataSource.headers).toEqual({ 'Content-Type': 'application/json' });
        expect(apiDataSource.parser).toBeInstanceOf(Parser);
    });

    test('Class have basicAuth', () => {
        const apiDataSource = new ApiDataSource(instanceSettings, $q, backendSrv, templateSrv);
        expect(apiDataSource.query).toBeInstanceOf(Function);
        expect(apiDataSource.testDatasource).toBeInstanceOf(Function);
        expect(apiDataSource.doRequest).toBeInstanceOf(Function);
        expect(apiDataSource.q).toEqual($q);
        expect(apiDataSource.backendSrv).toEqual(backendSrv);
        expect(apiDataSource.templateSrv).toEqual(templateSrv);
        expect(apiDataSource.name).toBe(instanceSettings.name);
        expect(apiDataSource.type).toBe(instanceSettings.type);
        expect(apiDataSource.url).toBe(instanceSettings.url);
        expect(apiDataSource.withCredentials).toBe(instanceSettings.withCredentials);
        expect(apiDataSource.headers).toEqual({ 'Content-Type': 'application/json', Authorization: 'test' });
        expect(apiDataSource.parser).toBeInstanceOf(Parser);
    });

    const apiDataSource = new ApiDataSource(instanceSettings, $q, backendSrv, templateSrv);
    test('doRequest Function', () => {
        apiDataSource.backendSrv.datasourceRequest.mockImplementationOnce(RequestSuccessMock);
        let request = apiDataSource.doRequest({});
        expect(request).toBeInstanceOf(Promise);
    });

    test('testDatasource Function fail', () => {
        // apiDataSource.backendSrv.datasourceRequest.mockImplementationOnce(RequestFailMock);
        let request = apiDataSource.testDatasource();
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toBeUndefined();
        });
    });
    // test('testDatasource Function success', () => {
    //     apiDataSource.backendSrv.datasourceRequest.mockImplementationOnce(RequestSuccessMock);
    //     let request = apiDataSource.testDatasource();
    //     expect(request).toBeInstanceOf(Promise);
    //     request.then((result) => {
    //         expect(result).toEqual(testDatasourceResult);
    //     });
    // });

    test('query Function empty options', () => {
        let request = apiDataSource.query(emptyOptionsQuery);
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toEqual({ data: [] });
        });
    });
    test('query Function noPath options', () => {
        let request = apiDataSource.query(noPathOptionsQuery);
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toEqual({ data: [] });
        });
    });
    test('query Function noMethod options', () => {
        let request = apiDataSource.query(noMethodOptionsQuery);
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toEqual({ data: [] });
        });
    });
    test('query Function right get options', () => {
        apiDataSource.backendSrv.datasourceRequest.mockImplementationOnce(RequestSuccessMock);
        let request = apiDataSource.query(rightGetOptionsQuery);
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toEqual({ data: [] });
        });
    });
    test('query Function right post options', () => {
        apiDataSource.backendSrv.datasourceRequest.mockImplementationOnce(RequestSuccessMock);
        let request = apiDataSource.query(rightPostOptionsQuery);
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toEqual({ data: [] });
        });
    });
    test('query Function right post options(have query)', () => {
        apiDataSource.backendSrv.datasourceRequest.mockImplementationOnce(RequestSuccessMock);
        let request = apiDataSource.query(rightPostNoQueryOptionsQuery);
        expect(request).toBeInstanceOf(Promise);
        request.then((result) => {
            expect(result).toEqual({ data: [] });
        });
    });
});