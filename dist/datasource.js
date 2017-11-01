System.register(['./data_parser'], function (_export, _context) {
    "use strict";

    var Parser, _createClass, ApiDataSource;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_data_parser) {
            Parser = _data_parser.default;
        }],
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

            _export('ApiDataSource', ApiDataSource = function () {
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
                    this.parser = new Parser();
                }

                _createClass(ApiDataSource, [{
                    key: 'query',
                    value: function query(options) {
                        var _this = this;

                        var queryConfig = this.parser.parseQueryConfig(options.targets.queryConfig);
                        if (Object.keys(queryConfig).length === 0 || !queryConfig.path || !queryConfig.method) {
                            return this.q.when({ data: [] });
                        }
                        return this.doRequest({
                            url: this.url + queryConfig.path,
                            method: queryConfig.method
                        }).then(function (res) {
                            return _this.parser.parseQueryResponse(res, queryConfig);
                        });
                    }
                }, {
                    key: 'testDatasource',
                    value: function testDatasource() {
                        return this.doRequest({
                            url: this.url + '/test',
                            method: 'GET'
                        }).then(function (response) {
                            if (response.status === 200) {
                                return { status: 'success', message: 'Data source is working', title: 'Success' };
                            }
                        });
                    }
                }, {
                    key: 'doRequest',
                    value: function doRequest(options) {
                        options.withCredentials = this.withCredentials;
                        options.headers = this.headers;
                        return this.backendSrv.datasourceRequest(options);
                    }
                }]);

                return ApiDataSource;
            }());

            _export('ApiDataSource', ApiDataSource);
        }
    };
});
//# sourceMappingURL=datasource.js.map
