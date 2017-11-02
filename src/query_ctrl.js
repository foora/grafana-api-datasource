import { QueryCtrl } from 'app/plugins/sdk';

export class ApiQueryCtrl extends QueryCtrl {
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

ApiQueryCtrl.templateUrl = 'partials/query-editor.html';