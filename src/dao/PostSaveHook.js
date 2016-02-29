export class PostSaveHook {
    constructor(){}

    postSave(previousEntity, newEntity){
        throw new Error("Must be implemented by sub-class");
    }
}
