"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiDataSource = void 0;

var _data_parser = require("./data_parser");

class ApiDataSource {
  constructor(instanceSettings, $q, backendSrv, templateSrv) {
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

  query(options) {
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

    return this.doRequest(requestOptions).then(res => this.parser.parseQueryResponse(res, queryConfig));
  }

  testDatasource() {
    return this.doRequest({
      url: this.url + '/test',
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Data source is working',
          title: 'Success'
        };
      }
    });
  }

  doRequest(options) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;
    return this.backendSrv.datasourceRequest(options);
  }

}

exports.ApiDataSource = ApiDataSource;
//# sourceMappingURL=datasource.js.map
