import {Component, EventEmitter} from "angular2/core";

import {AppStore} from "../../../store/AppStore";

import {FacebookActionsCreator} from "../actions/FacebookActionsCreator";
import {FakeServerPush} from "../server-push/FakeServerPush";
import {AddPost} from "../add-post/AddPost";
import {Post} from "../post/Post";

@Component({
    directives: [AddPost, Post],
	selector: "newsfeed",
	template: `
    <div class="row nav">
      <ol class="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li class="active">Facebook</li>
      </ol>
    </div>
    <div class="neutral-background" *ngIf="initialized">
        <div class="row">
            <div class="col-md-6">
                <add-post [fbUser]="user"></add-post>
            </div>
            <div class="col-md-6">
                <p>Facebook is an active place for a hobbit!  Go ahead and share a status update.
                    your friends are already very active on Facebook as you'll see.
                    Likes/Comments will be "pushed out" (simulated) to demostrate how
                    Redux works with data that is both push and pulled.
                </p>
                <p>You can also like and add comments to updates as well</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <post *ngFor="#post of posts" [post]="post" [commentingUser]="user"></post>
            </div>
        </div>
    </div>
    <div *ngIf="!initialized">
        Facebook Example
    </div>
  	`
})
export class NewsFeed {

	constructor(appStore:AppStore, facebookActionsCreator:FacebookActionsCreator, fakeServerPush:FakeServerPush) {
		this.appStore = appStore;
        this.facebookActionsCreator = facebookActionsCreator;
        this.fakeServerPush = fakeServerPush;
	}

	ngOnInit() {
		this.unsubscribe = this.appStore.subscribe(() => {
			this.processStateChange(this.appStore.getState().facebookState);
		});

        this.facebookActionsCreator.initializeApp();

        this.fakeServerPush.start();
	}

	ngOnDestroy(){
        this.fakeServerPush.cancel();
	}

	processStateChange(state){
        this.user = state.get("myUser");
        this.posts = state.get("posts");
        this.initialized = true;
	}
}
