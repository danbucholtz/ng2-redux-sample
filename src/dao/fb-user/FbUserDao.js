import {Injectable} from "angular2/core";

import {BaseDao} from "../BaseDao";
import {EntityManager} from "../EntityManager";

import {FbUserConverter} from "./FbUserConverter";

const table = "fbusers";

@Injectable()
export class FbUserDao extends BaseDao {
	constructor(fbUserConverter:FbUserConverter, entityManager:EntityManager) {
		super(table, fbUserConverter, entityManager);
	}

	getActiveUser(){
		return super.getOneByQuery("WHERE firstName=?", ["Frodo"]);
	}

	getBackgroundUsers(){
		return super.getByQuery("WHERE firstName != ?", ["Frodo"]);
	}

	getList(){
		return super.getByQuery("order by firstName");
	}

	insert(object){
		var query = `
			INSERT INTO ${table}
			(id, firstName, lastName, imageUrl)
			VALUES (?, ?, ?, ?)`;

		return this.entityManager.executeQuery(query, [object.id, object.firstName, object.lastName, object.imageUrl]);
	}

	update(object){
		var query = `
			Update ${table}
			SET firstName=?, lastName=?, imageUrl=?
			WHERE id=?`;

		return this.entityManager.executeQuery(query, [object.firstName, object.lastName, object.imageUrl, object.id]);
	}

	createTableIfDoesntExist(){
		return this.entityManager.executeQuery(`CREATE TABLE IF NOT EXISTS ${table} (id text primary key not null, firstName text not null, lastName text not null, imageUrl text not null)`);
	}
}
