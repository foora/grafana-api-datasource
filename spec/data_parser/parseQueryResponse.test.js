import { Parser } from '../../src/data_parser';
const parser = new Parser();

const emptyResponse = {};
const emptyArrayData = { data: [] };
const NotArrayData = { data: 'test' };
const tableData = {
    'data': [
        { 'time': 1, 'name': 'test1' },
        { 'time': 2, 'name': 'test2' }
    ]
};
const seriesData = {
    'data': [
        { 'pv': 200, 'uv': 200, time: 1510200000000 },
        { 'pv': 100, 'uv': 100, time: 1510300000000 },
        { 'pv': 300, 'uv': 300, time: 1510400000000 }
    ]
};


const notTableOrSeriesOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'line',
    'columns': [
        { 'key': 'time', 'label': 'column name 1' },
        { 'key': 'name', 'label': 'column name 2' }
    ]
};
const tableOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'table',
    'columns': [
        { 'key': 'time', 'label': 'column name 1' },
        { 'key': 'name', 'label': 'column name 2' }
    ]
};
const seriesOptions = {
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
describe('parseQueryResponse', () => {
    test('emptyResponse', () => {
        let result = parser.parseQueryResponse(emptyResponse, tableOptions);
        expect(result).toEqual({ data: [] });
    });
    test('notTableOrSeriesOptions', () => {
        let result = parser.parseQueryResponse(tableData, notTableOrSeriesOptions);
        expect(result).toEqual({ data: [] });
    });
    describe('parseTable', () => {
        test('NotArrayData', () => {
            let result = parser.parseQueryResponse(NotArrayData, tableOptions);
            expect(result).toEqual({ data: [] });
        });
        test('emptyArrayData', () => {
            let result = parser.parseQueryResponse(emptyArrayData, tableOptions);
            expect(result).toEqual({ data: [] });
        });
    });
    describe('parseSeries', () => {
        test('NotArrayData', () => {
            let result = parser.parseQueryResponse(NotArrayData, seriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('emptyArrayData', () => {
            let result = parser.parseQueryResponse(emptyArrayData, seriesOptions);
            expect(result).toEqual({ data: [] });
        });
    });
});