import {Injectable} from "angular2/core";

import {WindowFactory} from "../util/factory/WindowFactory";

const databaseName = "my-sample-app.db";

@Injectable()
export class EntityManager {
	constructor(windowFactory:WindowFactory) {
		this.windowFactory = windowFactory;
		this.window = this.windowFactory.getWindow();
        this.dbInstance = null;
	}

	getDatabaseConnection(){
        if ( ! this.dbInstance ){
			this.dbInstance = this.window.openDatabase(databaseName, "1.0", "My Sample App", 200000);
        }
        return this.dbInstance;
    }

    executeQuery(query, parameters){
		if ( ! parameters ){
			parameters = [];
		}
		return this.executeQueryWebSql(query, parameters);
    }

	executeQueryWebSql(query, parameters){
		var self = this;
		return new Promise(function(resolve, reject){
			self.getDatabaseConnection().transaction(tx => {
				tx.executeSql(query, parameters, function(tx, results){
					resolve(results);
				}, function(transaction, error){
					reject(error);
				});
			});
		});
	}
}
