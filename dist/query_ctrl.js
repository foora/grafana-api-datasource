"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiQueryCtrl = void 0;

var _sdk = require("app/plugins/sdk");

class ApiQueryCtrl extends _sdk.QueryCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    this.scope = $scope;
    this.target.queryConfig = this.target.queryConfig || '';
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  toggleEditorMode() {
    return;
  }

}

exports.ApiQueryCtrl = ApiQueryCtrl;
ApiQueryCtrl.templateUrl = 'partials/query-editor.html';
//# sourceMappingURL=query_ctrl.js.map
