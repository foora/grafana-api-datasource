System.register(['app/plugins/sdk'], function (_export, _context) {
    "use strict";

    var QueryCtrl, _createClass, ApiQueryCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            QueryCtrl = _appPluginsSdk.QueryCtrl;
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

            _export('ApiQueryCtrl', ApiQueryCtrl = function (_QueryCtrl) {
                _inherits(ApiQueryCtrl, _QueryCtrl);

                function ApiQueryCtrl($scope, $injector) {
                    _classCallCheck(this, ApiQueryCtrl);

                    var _this = _possibleConstructorReturn(this, (ApiQueryCtrl.__proto__ || Object.getPrototypeOf(ApiQueryCtrl)).call(this, $scope, $injector));

                    _this.scope = $scope;
                    _this.target.queryConfig = _this.target.queryConfig || '';
                    return _this;
                }

                _createClass(ApiQueryCtrl, [{
                    key: 'onChangeInternal',
                    value: function onChangeInternal() {
                        this.panelCtrl.refresh(); // Asks the panel to refresh data.
                    }
                }]);

                return ApiQueryCtrl;
            }(QueryCtrl));

            _export('ApiQueryCtrl', ApiQueryCtrl);

            ApiQueryCtrl.templateUrl = 'partials/query-editor.html';
        }
    };
});
//# sourceMappingURL=query_ctrl.js.map
