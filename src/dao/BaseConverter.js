export class BaseConverter {
	constructor() {}

	convertModelToPersistableFormat(object) {
		throw new Error("Child must implement");
	}

	convertPersistableFormatToModel(object) {
		throw new Error("Child must implement");
	}
}
