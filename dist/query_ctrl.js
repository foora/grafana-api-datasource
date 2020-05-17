"use strict";

exports.__esModule = true;
exports.ApiQueryCtrl = void 0;

var _sdk = require("app/plugins/sdk");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ApiQueryCtrl = /*#__PURE__*/function (_QueryCtrl) {
  _inheritsLoose(ApiQueryCtrl, _QueryCtrl);

  function ApiQueryCtrl($scope, $injector) {
    var _this;

    _this = _QueryCtrl.call(this, $scope, $injector) || this;
    _this.scope = $scope;
    _this.target.queryConfig = _this.target.queryConfig || '';
    return _this;
  }

  var _proto = ApiQueryCtrl.prototype;

  _proto.onChangeInternal = function onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  };

  _proto.toggleEditorMode = function toggleEditorMode() {
    return;
  };

  return ApiQueryCtrl;
}(_sdk.QueryCtrl);

exports.ApiQueryCtrl = ApiQueryCtrl;
ApiQueryCtrl.templateUrl = 'partials/query-editor.html';
//# sourceMappingURL=query_ctrl.js.map
