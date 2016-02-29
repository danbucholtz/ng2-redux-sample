import {Component, View, Input} from "angular2/core";
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";

import {OverviewPage} from "./overview-page/OverviewPage";
import {TodoMasterDetail} from "./todo/todo-master-detail/TodoMasterDetail";
import {NewsFeed} from "./facebook/news-feed/NewsFeed";

import {MigrationUtil} from "../util/migration/MigrationUtil";

@Component({
  selector: "app"
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="container" *ngIf="initialized">
        <h1>Angular 2 Redux Samples</h1>
        <hr class="featurette-divider"/>
        <router-outlet></router-outlet>
        <hr class="featurette-divider"/>
        <footer>
          <p>By Dan Bucholtz</p>
        </footer>
    </div>
    <div *ngIf="!initialized">
        <h4>Initializing Application...</h4>
    </div>
  `
})
@RouteConfig([
  { path: "/", component: OverviewPage, as: "OverviewPage", useAsDefaut:true},
  { path: "/todos", component:TodoMasterDetail, as: "TodoMasterDetail"},
  { path: "/facebook", component: NewsFeed, as: "NewsFeed"}
])
export class AppComponent {
    constructor(migrationUtil:MigrationUtil){
        this.migrationUtil = migrationUtil;
        this.initialized = false;
    }

    async ngOnInit(){
        // in a real app, you'd want to use a migration pattern like rails or something
        // for now, just create the database tables we need
        await this.initializeAppData();
    }

    async initializeAppData(){
        try{
            await this.migrationUtil.doMigrations();
            this.initialized = true;
        }
        catch(ex){
            alert(`Failed to initialize app database tables - ${ex.message}`);
        }
    }
}
