import { Parser } from '../../src/data_parser';

describe('Class Parser', () => {
    test('new Parser()', () => {
        let parser = new Parser();
        expect(parser).toBeInstanceOf(Parser);
        expect(parser.parseQueryConfig).toBeInstanceOf(Function);
        expect(parser.parseQueryResponse).toBeInstanceOf(Function);
        expect(parser.parseSeriesData).toBeInstanceOf(Function);
        expect(parser.parseTableData).toBeInstanceOf(Function);
    });
});