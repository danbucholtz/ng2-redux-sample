import {Injectable} from "angular2/core";

import {BaseDao} from "../BaseDao";
import {EntityManager} from "../EntityManager";

import {FbPostConverter} from "./FbPostConverter";

const table = "fbposts";

@Injectable()
export class FbPostDao extends BaseDao {
	constructor(fbPostConverter:FbPostConverter, entityManager:EntityManager) {
		super(table, fbPostConverter, entityManager);
	}

	insert(object){
		var query = `
			INSERT INTO ${table}
			(id, userId, content)
			VALUES (?, ?, ?)`;

		return this.entityManager.executeQuery(query, [object.id, object.userId, object.content]);
	}

	update(object){
		var query = `
			Update ${table}
			SET userId=?, content=?
			WHERE id=?`;

		return this.entityManager.executeQuery(query, [object.userId, object.content, object.id]);
	}

	createTableIfDoesntExist(){
		return this.entityManager.executeQuery(`CREATE TABLE IF NOT EXISTS ${table} (id text primary key not null, userId text not null, content text not null)`);
	}
}
