import "zone.js/dist/zone-microtask";
import "reflect-metadata";
import "babel-polyfill";

import {provide} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";

import {AppComponent} from "./components/AppComponent";

// entityManager
import {EntityManager} from "./dao/EntityManager";
import {WindowFactory} from "./util/factory/WindowFactory";

// Todos
import {TodoActions} from "./components/todo/actions/TodoActions";
import {TodoActionsCreator} from "./components/todo/actions/TodoActionsCreator";
import {TodoConverter} from "./dao/todo/TodoConverter"
import {TodoDao} from "./dao/todo/TodoDao";

// Facebook example
import {FacebookActions} from "./components/facebook/actions/FacebookActions";
import {FacebookActionsCreator} from "./components/facebook/actions/FacebookActionsCreator";
import {FbCommentConverter} from "./dao/fb-comment/FbCommentConverter";
import {FbCommentDao} from "./dao/fb-comment/FbCommentDao";
import {FbLikeConverter} from "./dao/fb-like/FbLikeConverter";
import {FbLikeDao} from "./dao/fb-like/FbLikeDao";
import {FbPostConverter} from "./dao/fb-post/FbPostConverter";
import {FbPostDao} from "./dao/fb-post/FbPostDao";
import {FbUserConverter} from "./dao/fb-user/FbUserConverter";
import {FbUserDao} from "./dao/fb-user/FbUserDao";
import {ViewModelUtil} from "./components/facebook/view-models/util/ViewModelUtil";

import {CharacterContentGenerator} from "./components/facebook/server-push/CharacterContentGenerator";
import {CreateCommentDelegate} from "./components/facebook/server-push/CreateCommentDelegate";
import {CreatePostDelegate} from "./components/facebook/server-push/CreatePostDelegate";
import {FakeServerPush} from "./components/facebook/server-push/FakeServerPush";
import {LikePostDelegate} from "./components/facebook/server-push/LikePostDelegate";

// Migration
import {SchemaVersionConverter} from "./dao/schema-version/SchemaVersionConverter";
import {SchemaVersionDao} from "./dao/schema-version/SchemaVersionDao";
import {MigrationProvider} from "./util/migration/MigrationProvider";
import {MigrationUtil} from "./util/migration/MigrationUtil";
import {MigrationOne} from "./util/migration/impl/MigrationOne";
import {MigrationTwo} from "./util/migration/impl/MigrationTwo";

// App Store
import {AppStore} from "./store/AppStore";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    AppStore,
    CharacterContentGenerator,
    CreateCommentDelegate,
    CreatePostDelegate,
    EntityManager,
    FacebookActions,
    FacebookActionsCreator,
    FakeServerPush,
    FbCommentConverter,
    FbCommentDao,
    FbLikeConverter,
    FbLikeDao,
    FbPostConverter,
    FbPostDao,
    FbUserConverter,
    FbUserDao,
    LikePostDelegate,
    MigrationProvider,
    MigrationUtil,
    MigrationOne,
    MigrationTwo,
    SchemaVersionConverter,
    SchemaVersionDao,
    TodoActions,
    TodoActionsCreator,
    TodoConverter,
    TodoDao,
    ViewModelUtil,
    WindowFactory
]);
