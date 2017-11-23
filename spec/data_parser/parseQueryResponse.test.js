import { Parser } from '../../src/data_parser';
const parser = new Parser();

const emptyResponse = {};
const emptyArrayData = { data: [] };
const notArrayData = { data: 'test' };
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
const notArrayColumnsTableOptions =  {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'table',
    'columns': ''
};
const emptyArrayColumnsTableOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'table',
    'columns': []
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
const noLinesSeriesOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'series'
};
const noTimeKeySeriesOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'series',
    'lines': {
        'line': [
            { 'key': 'pv', 'label': 'pv' },
            { 'key': 'uv', 'label': 'uv' }
        ]
    }
};
const notArrayLineSeriesOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'series',
    'lines': {
        'timeKey': 'time',
        'line': ''
    }
};
const emptyArrayLineSeriesOptions = {
    'path': '/api',
    'method': 'GET',
    'query': {},
    'format': 'series',
    'lines': {
        'timeKey': 'time',
        'line': []
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
        test('notArrayData', () => {
            let result = parser.parseQueryResponse(notArrayData, tableOptions);
            expect(result).toEqual({ data: [] });
        });
        test('emptyArrayData', () => {
            let result = parser.parseQueryResponse(emptyArrayData, tableOptions);
            expect(result).toEqual({ data: [] });
        });
        test('notArrayColumnsTableOptions', () => {
            let result = parser.parseQueryResponse(tableData, notArrayColumnsTableOptions);
            expect(result).toEqual({ data: [] });
        });
        test('emptyArrayColumnsTableOptions', () => {
            let result = parser.parseQueryResponse(tableData, emptyArrayColumnsTableOptions);
            expect(result).toEqual({ data: [] });
        });
        test('right table data and right table options', () => {
            let result = parser.parseQueryResponse(tableData, tableOptions);
            expect(result.data).toHaveLength(1);
            expect(result.data[0].type).toBe('table');
            expect(result.data[0].columns).toEqual([{ text: 'column name 1' }, { text: 'column name 2' }]);
            expect(result.data[0].rows).toEqual([[1, 'test1'], [2, 'test2']]);
        });
    });
    describe('parseSeries', () => {
        test('notArrayData', () => {
            let result = parser.parseQueryResponse(notArrayData, seriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('emptyArrayData', () => {
            let result = parser.parseQueryResponse(emptyArrayData, seriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('noLinesSeriesOptions', () => {
            let result = parser.parseQueryResponse(seriesData, noLinesSeriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('noTimeKeySeriesOptions', () => {
            let result = parser.parseQueryResponse(seriesData, noTimeKeySeriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('notArrayLineSeriesOptions', () => {
            let result = parser.parseQueryResponse(seriesData, notArrayLineSeriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('emptyArrayLineSeriesOptions', () => {
            let result = parser.parseQueryResponse(seriesData, emptyArrayLineSeriesOptions);
            expect(result).toEqual({ data: [] });
        });
        test('right series data and right series options', () => {
            let result = parser.parseQueryResponse(seriesData, seriesOptions);
            expect(result.data).toHaveLength(2);
            expect(result.data[0].target).toBe('pv');
            expect(result.data[1].target).toBe('uv');
            expect(result.data[0].datapoints).toEqual([[200, 1510200000000], [100, 1510300000000], [300, 1510400000000]]);
            expect(result.data[1].datapoints).toEqual([[200, 1510200000000], [100, 1510300000000], [300, 1510400000000]]);
        });
    });
});