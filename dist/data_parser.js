System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Parser;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('Parser', Parser = function () {
                function Parser() {
                    _classCallCheck(this, Parser);
                }

                _createClass(Parser, [{
                    key: 'parseQueryConfig',
                    value: function parseQueryConfig(ConfigStr) {
                        var options = void 0;
                        try {
                            options = JSON.parse(ConfigStr);
                        } catch (err) {
                            options = {};
                        }
                        return options;
                    }
                }, {
                    key: 'parseQueryResponse',
                    value: function parseQueryResponse(res, options) {
                        if (!res) {
                            return { data: [] };
                        }

                        var format = options.format;

                        if (format === 'table') {
                            return this.parseTableData(res, options);
                        } else {
                            return { data: [] };
                        }
                    }
                }, {
                    key: 'parseTableData',
                    value: function parseTableData(data, options) {
                        if (!(data instanceof Array) || data.length === 0) {
                            return { data: [] };
                        }
                        var columns = options.columns;
                        if (columns.length === 0) {
                            return { data: [] };
                        }
                        var result = {
                            type: 'table',
                            columns: [],
                            rows: []
                        };
                        for (var j = 0, clen = columns.length; j < clen; j++) {
                            var key = columns[j].key;
                            var label = columns[j].label;
                            result.columns.push({ text: label });
                            for (var i = 0, len = data.length; i < len; i++) {
                                if (!result.rows[i]) result.rows[i] = [];
                                var item = data[i];
                                result.rows[i].push(item[key]);
                            }
                        }
                        return { data: [result] };
                    }
                }]);

                return Parser;
            }());

            _export('Parser', Parser);
        }
    };
});
//# sourceMappingURL=data_parser.js.map
