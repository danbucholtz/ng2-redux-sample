import {Injectable} from "angular2/core";

import {BaseConverter} from "../BaseConverter";
import {Todo} from "./Todo";

@Injectable()
export class TodoConverter {
	constructor() {
	}

	convertModelToPersistableFormat(todo) {
		if (!todo instanceof Todo) {
			throw new Error("Invalid Parameter Type - requires Todo model");
		}
		var persistable = {};
		persistable.id = todo.get("id");
		persistable.text = todo.get("text");
        persistable.completed = todo.get("completed") ? 1 : 0;

		return persistable;
	}

	convertPersistableFormatToModel(object) {
		return new Todo(object.id, object.text, (object.completed > 0));
	}
}
