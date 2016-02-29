import uuid from "node-uuid";

export class BaseDao {
	constructor(tableName, converter, entityManager, postSaveHookList, postDeleteHookList) {
		this.tableName = tableName;
		this.converter = converter;
		this.entityManager = entityManager;
		this.postSaveHookList = postSaveHookList;
		this.postDeleteHookList = postDeleteHookList;
	}

	createTableIfDoesntExist() {
		throw new Error("Child must implement this");
	}

	async getAllMap(){
		var instances = await this.getAll();
		var map = new Map();
		for ( var instance of instances ){
			map.set(instance.id, instance);
		}
		return map;
	}

	async getAll() {
		var results = await this.entityManager.executeQuery(`SELECT * FROM ${this.tableName}`);
		var rows = results.rows;
		var modelInstances = [];
		for (var i = 0; i < rows.length; i++) {
			var persistedEntity = rows.item(i);
			modelInstances.push(this.converter.convertPersistableFormatToModel(persistedEntity));
		}
		return modelInstances;
	}

	async getFromIdList(listOfIds){
		var questionMarks = [];
		for ( let i = 0; i < listOfIds.length; i++ ){
			questionMarks.push("?");
		}
		var questionMarkString = questionMarks.join();
		var query = `WHERE id IN (${questionMarkString})`;
		return this.getByQuery(query, listOfIds);
	}

	async getById(id) {
		var results = await this.entityManager.executeQuery(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
		var rows = results.rows;
		if (rows.length === 0) {
			return null;
		}
		return this.converter.convertPersistableFormatToModel(rows.item(0));
	}

	async getByQuery(where, params) {
		var results = await this.entityManager.executeQuery(`SELECT * FROM ${this.tableName} ${where}`, params);
		var rows = results.rows;
		var modelInstances = [];
		for (var i = 0; i < rows.length; i++) {
			var persistedEntity = rows.item(i);
			modelInstances.push(this.converter.convertPersistableFormatToModel(persistedEntity));
		}
		return modelInstances;
	}

	async getOneByQuery(where, params) {
		var results = await this.getByQuery(where, params);
		if ( results.length > 0 ){
			return results[0];
		}
		return null;
	}

	async save(object) {
		var persistable = this.converter.convertModelToPersistableFormat(object);
		var result = null;
		var existing = null;
		if (persistable.id) {
			// look up the existing by id
			existing = await this.getById(persistable.id);
			result = await this.update(persistable);
		} else {
			persistable.id = uuid.v4();
			result = await this.insert(persistable);
		}

		var model = this.converter.convertPersistableFormatToModel(persistable);

		if ( this.postSaveHookList && this.postSaveHookList.length > 0 ){
			for ( var postSaveHook of this.postSaveHookList ){
				postSaveHook.postSave(existing, model);
			}
		}

		return model;
	}

	update(object) {
		throw new Error("child needs to implement update");
	}

	insert(object) {
		throw new Error("child needs to implement insert");
	}

	async delete(id) {
		var existing = await this.getById(id);
		await this.entityManager.executeQuery(`DELETE FROM ${this.tableName} WHERE id=?`, [id]);

		if ( this.postDeleteHookList && this.postDeleteHookList.length > 0 ){
			for ( var postDeleteHook of this.postDeleteHookList ){
				postDeleteHook.postDelete(existing);
			}
		}

		return true;
	}
}
