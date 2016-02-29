import {Injectable} from "angular2/core";

import {BaseConverter} from "../BaseConverter";
import {SchemaVersion} from "./SchemaVersion";

@Injectable()
export class SchemaVersionConverter extends BaseConverter {
    constructor(){
        super();
    }

    convertModelToPersistableFormat(object){
        if ( ! object instanceof SchemaVersion ){
            throw new Error("Invalid Parameter Type - requires SchemaVersion model");
        }
        var persistable = {};
        persistable.id = object.id;
        persistable.version = object.version;
        return persistable;
    }

    convertPersistableFormatToModel(object){
        var schemaVersion = new SchemaVersion();
        schemaVersion.id = object.id;
        schemaVersion.version = object.version;
        return schemaVersion;
    }
}
