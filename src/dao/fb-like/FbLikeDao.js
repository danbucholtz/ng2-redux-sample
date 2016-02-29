import {Injectable} from "angular2/core";

import {BaseDao} from "../BaseDao";
import {EntityManager} from "../EntityManager";

import {FbLikeConverter} from "./FbLikeConverter";

const table = "fblikes";

@Injectable()
export class FbLikeDao extends BaseDao {
	constructor(fbLikeConverter:FbLikeConverter, entityManager:EntityManager) {
		super(table, fbLikeConverter, entityManager);
	}

	insert(object){
		var query = `
			INSERT INTO ${table}
			(id, postId, userId)
			VALUES (?, ?, ?)`;

		return this.entityManager.executeQuery(query, [object.id, object.postId, object.userId]);
	}

	update(object){
		var query = `
			Update ${table}
			SET postId=?, userId=?
			WHERE id=?`;

		return this.entityManager.executeQuery(query, [object.postId, object.userId, object.id]);
	}

	createTableIfDoesntExist(){
		return this.entityManager.executeQuery(`CREATE TABLE IF NOT EXISTS ${table} (id text primary key not null, postId text not null, userId text not null)`);
	}
}
