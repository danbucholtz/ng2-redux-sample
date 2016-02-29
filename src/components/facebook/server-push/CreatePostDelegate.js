import {CharacterContentGenerator} from "./CharacterContentGenerator";
import {FacebookActionsCreator} from "../actions/FacebookActionsCreator";
import {FbUserDao} from "../../../dao/fb-user/FbUserDao";
import {FbPost} from "../../../dao/fb-post/FbPost";
import {randomNumberInRange} from "../../../util/RandomNumberInRange";

export class CreatePostDelegate{
    constructor(characterContentGenerator:CharacterContentGenerator, facebookActionsCreator:FacebookActionsCreator, fbUserDao:FbUserDao){
        this.characterContentGenerator = characterContentGenerator;
        this.facebookActionsCreator = facebookActionsCreator;
        this.fbUserDao = fbUserDao;
    }

    async generatePost(){
        try{
            // get the background users
            var users = await this.fbUserDao.getBackgroundUsers();
            // choose a random one from the list to make a post
            var randomIndex = randomNumberInRange(0, users.length - 1);
            var user = users[randomIndex];

            var content = this.characterContentGenerator.getRandomContentForUser(user.firstName);

            var post = new FbPost(null, user.id, content);

            this.facebookActionsCreator.createPost(post);

        }
        catch(ex){
            alert(`Failed to create a post from the background - ${ex.message}`);
        }
    }
}
