System.register(["./datasource", "./query_ctrl"], function (_export, _context) {
  "use strict";

  var ApiDataSource, ApiQueryCtrl, ApiConfigCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_datasource) {
      ApiDataSource = _datasource.ApiDataSource;
    }, function (_query_ctrl) {
      ApiQueryCtrl = _query_ctrl.ApiQueryCtrl;
    }],
    execute: function () {
      _export("ConfigCtrl", ApiConfigCtrl = function ApiConfigCtrl() {
        _classCallCheck(this, ApiConfigCtrl);
      });

      ApiConfigCtrl.templateUrl = 'partials/config.html';

      _export("Datasource", ApiDataSource);

      _export("QueryCtrl", ApiQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
