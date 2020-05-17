"use strict";

exports.__esModule = true;
exports.Parser = void 0;

var Parser = /*#__PURE__*/function () {
  function Parser() {}

  var _proto = Parser.prototype;

  _proto.parseQueryConfig = function parseQueryConfig(ConfigStr) {
    var options;

    try {
      options = JSON.parse(ConfigStr);
    } catch (err) {
      options = {};
    }

    return options;
  };

  _proto.parseQueryResponse = function parseQueryResponse(res, options) {
    if (!res.data) {
      return {
        data: []
      };
    }

    var format = options.format;

    if (format === 'table') {
      return this.parseTableData(res.data, options);
    } else if (format === 'series') {
      return this.parseSeriesData(res.data, options);
    } else {
      return {
        data: []
      };
    }
  };

  _proto.parseTableData = function parseTableData(data, options) {
    if (!(data instanceof Array) || data.length === 0) {
      return {
        data: []
      };
    }

    var columns = options.columns;

    if (!(columns instanceof Array) || columns.length === 0) {
      return {
        data: []
      };
    }

    var result = {
      type: 'table',
      columns: [],
      rows: []
    };

    for (var j = 0, clen = columns.length; j < clen; j++) {
      var key = columns[j].key;
      var label = columns[j].label;
      result.columns.push({
        text: label
      });

      for (var i = 0, len = data.length; i < len; i++) {
        if (!result.rows[i]) result.rows[i] = [];
        var item = data[i];
        result.rows[i].push(item[key]);
      }
    }

    return {
      data: [result]
    };
  };

  _proto.parseSeriesData = function parseSeriesData(data, options) {
    if (!(data instanceof Array) || data.length === 0) {
      return {
        data: []
      };
    }

    var lines = options.lines;

    if (!lines || !lines.timeKey || !(lines.line instanceof Array) || lines.line.length === 0) {
      return {
        data: []
      };
    }

    var timeKey = lines.timeKey;
    var result = [];

    var _loop = function _loop(i, len) {
      var temp = {
        target: lines.line[i].label,
        datapoints: []
      };
      var key = lines.line[i].key;
      data.forEach(function (item) {
        return temp.datapoints.push([item[key], item[timeKey]]);
      });
      result.push(temp);
    };

    for (var i = 0, len = lines.line.length; i < len; i++) {
      _loop(i, len);
    }

    return {
      data: result
    };
  };

  return Parser;
}();

exports.Parser = Parser;
//# sourceMappingURL=data_parser.js.map
