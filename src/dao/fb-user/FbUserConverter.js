import {Injectable} from "angular2/core";

import {BaseConverter} from "../BaseConverter";
import {FbUser} from "./FbUser";

@Injectable()
export class FbUserConverter {
	constructor() {
	}

	convertModelToPersistableFormat(fbUser) {
		if (!fbUser instanceof FbUser) {
			throw new Error("Invalid Parameter Type - requires FbUser model");
		}
		var persistable = {};
		persistable.id = fbUser.get("id");
		persistable.firstName = fbUser.get("firstName");
        persistable.lastName = fbUser.get("lastName");
		persistable.imageUrl = fbUser.get("imageUrl");

		return persistable;
	}

	convertPersistableFormatToModel(object) {
		return new FbUser(object.id, object.firstName, object.lastName, object.imageUrl);
	}
}
