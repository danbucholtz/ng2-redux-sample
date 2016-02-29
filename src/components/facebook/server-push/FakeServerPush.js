// this class uses a timeout to simulate a websocket (or something)
// connect and a scenario where updates are pushed out to the client

import {CreateCommentDelegate} from "./CreateCommentDelegate";
import {CreatePostDelegate} from "./CreatePostDelegate";
import {LikePostDelegate} from "./LikePostDelegate";
import {randomNumberInRange} from "../../../util/RandomNumberInRange";

export class FakeServerPush{
    constructor(createCommentDelegate:CreateCommentDelegate, createPostDelegate:CreatePostDelegate, likePostDelegate:LikePostDelegate){
        this.createCommentDelegate = createCommentDelegate;
        this.createPostDelegate = createPostDelegate;
        this.likePostDelegate = likePostDelegate;
    }

    start(){
        this.timeout = setInterval(() => {
            console.log("Timer Triggered");
            this.takeAction();
        }, 4000);
    }

    cancel(){
        clearInterval(this.timeout);
    }

    takeAction(){
        var result = randomNumberInRange(1, 3);
        if ( result === 1 ){
            this.createPostDelegate.generatePost();
        }
        else if ( result === 2 ){
            this.likePostDelegate.likePost();
        }
        else{
            this.createCommentDelegate.generateComment();
        }
    }
}
