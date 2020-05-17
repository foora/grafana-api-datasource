"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Datasource", {
  enumerable: true,
  get: function get() {
    return _datasource.ApiDataSource;
  }
});
Object.defineProperty(exports, "QueryCtrl", {
  enumerable: true,
  get: function get() {
    return _query_ctrl.ApiQueryCtrl;
  }
});
exports.ConfigCtrl = void 0;

var _datasource = require("./datasource");

var _query_ctrl = require("./query_ctrl");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiConfigCtrl = function ApiConfigCtrl() {
  _classCallCheck(this, ApiConfigCtrl);
};

exports.ConfigCtrl = ApiConfigCtrl;
ApiConfigCtrl.templateUrl = 'partials/config.html';
//# sourceMappingURL=module.js.map
