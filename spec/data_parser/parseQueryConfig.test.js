import { Parser } from '../../src/data_parser';
const parser = new Parser();

const tableQueryTestStr = `{
    "path": "/api",
    "method": "GET",
    "query": {},
    "format": "table",
    "columns": [
        {"key": "time", "label": "column name 1"},
        {"key": "name", "label": "column name 2"}
    ]
}`;

const tableQueryTestJson = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'table',
    'columns': [
        { 'key': 'time', 'label': 'column name 1' },
        { 'key': 'name', 'label': 'column name 2' }
    ]
};

const seriesQueryTestStr = `{
    "path": "/api",
    "method": "GET",
    "query": {},
    "format": "series",
    "lines": {
        "timeKey": "time",
        "line": [
            {"key": "pv", "label": "pv"},
            {"key": "uv", "label": "uv"}
        ]
    }
}`;

const seriesQueryTestJson = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'series',
    'lines': {
        'timeKey': 'time',
        'line': [
            { 'key': 'pv', 'label': 'pv' },
            { 'key': 'uv', 'label': 'uv' }
        ]
    }
};
const errorQueryTestStr = `{
    'path': "/api",
    "method": "GET",
    "query": {},
    "format": "table",
    "columns": [
        {"key": "time", "label": "column name 1"},
        {"key": "name", "label": "column name 2"}
    ]
}`;

describe('queryConfig test', () => {
    test('parseTableQuery', () => {
        let result = parser.parseQueryConfig(tableQueryTestStr);
        expect(result).toEqual(tableQueryTestJson);
    });
    test('parseseriesQuery', () => {
        let result = parser.parseQueryConfig(seriesQueryTestStr);
        expect(result).toEqual(seriesQueryTestJson);
    });
    test('parseErrorQuery', () => {
        let result = parser.parseQueryConfig(errorQueryTestStr);
        expect(result).toEqual({});
    });
});