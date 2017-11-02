export class Parser {
    parseQueryConfig(ConfigStr) {
        let options;
        try {
            options = JSON.parse(ConfigStr);
        } catch (err) {
            options = {};
        }
        return options;
    }
    parseQueryResponse(res, options) {
        if (!res.data) {
            return { data: [] };
        }

        let format = options.format;

        if (format === 'table') {
            return this.parseTableData(res.data, options);
        } else {
            return { data: [] };
        }
    }

    parseTableData(data, options) {
        if (!(data instanceof Array) || data.length === 0) {
            return { data: [] };
        }
        let columns = options.columns;
        if (columns.length === 0) {
            return { data: [] };
        }
        let result = {
            type: 'table',
            columns: [],
            rows: []
        };
        for (let j = 0, clen = columns.length; j < clen; j++) {
            let key = columns[j].key;
            let label = columns[j].label;
            result.columns.push({ text: label });
            for (let i = 0, len = data.length; i < len; i++) {
                if (!result.rows[i]) result.rows[i] = [];
                let item = data[i];
                result.rows[i].push(item[key]);
            }
        }
        return { data: [result] };
    }
}