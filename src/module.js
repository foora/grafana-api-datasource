import { ApiDataSource } from './datasource';
import { ApiQueryCtrl } from './query_ctrl';

class ApiConfigCtrl {}
ApiConfigCtrl.templateUrl = 'partials/config.html';


export {
    ApiDataSource as Datasource,
    ApiQueryCtrl as QueryCtrl,
    ApiConfigCtrl as ConfigCtrl
};