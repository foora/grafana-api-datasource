import { QueryCtrl } from 'app/plugins/sdk';

export class ApiQueryCtrl extends QueryCtrl {
    constructor($scope, $injector) {
        super($scope, $injector);
        this.scope = $scope;
        this.target.queryConfig = this.target.queryConfig || '';
    }
}

ApiQueryCtrl.templateUrl = 'partials/query-editor.html';