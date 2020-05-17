"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiDataSource = void 0;

var _data_parser = require("./data_parser");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiDataSource = /*#__PURE__*/function () {
  function ApiDataSource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, ApiDataSource);

    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.name = instanceSettings.name;
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = {
      'Content-Type': 'application/json'
    };

    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }

    this.parser = new _data_parser.Parser();
  }

  _createClass(ApiDataSource, [{
    key: "query",
    value: function query(options) {
      var _this = this;

      var queryConfig = this.parser.parseQueryConfig(options.targets[0].queryConfig);

      if (Object.keys(queryConfig).length === 0 || !queryConfig.path || !queryConfig.method) {
        return this.q.when({
          data: []
        });
      }

      var requestOptions = {
        url: this.url + queryConfig.path,
        method: queryConfig.method
      };

      if (queryConfig.method.toUpperCase() !== 'GET') {
        requestOptions.data = queryConfig.query || {};
        requestOptions.data.startTime = new Date(options.range.from._d).getTime();
        requestOptions.data.endTime = new Date(options.range.to._d).getTime();
      }

      return this.doRequest(requestOptions).then(function (res) {
        return _this.parser.parseQueryResponse(res, queryConfig);
      });
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return this.doRequest({
        url: this.url + '/test',
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          return {
            status: 'success',
            message: 'Data source is working',
            title: 'Success'
          };
        }
      });
    }
  }, {
    key: "doRequest",
    value: function doRequest(options) {
      options.withCredentials = this.withCredentials;
      options.headers = this.headers;
      return this.backendSrv.datasourceRequest(options);
    }
  }]);

  return ApiDataSource;
}();

exports.ApiDataSource = ApiDataSource;
//# sourceMappingURL=datasource.js.map
