import {Injectable} from "angular2/core";
import {ReduxStore} from "angular2-redux-store";

import {applyMiddleware, combineReducers, createStore} from "redux";

import {TodoReducer} from "../components/todo/reducers/TodoReducer";
import {FacebookReducer} from "../components/facebook/reducers/FacebookReducer";

var todoReducer = new TodoReducer();
var facebookReducer = new FacebookReducer();

const createStoreWithMiddleware = applyMiddleware()(createStore);

const reducer = combineReducers({
    todosState: todoReducer.reduce,
    facebookState: facebookReducer.reduce
});

const store = createStoreWithMiddleware(reducer);

@Injectable()
export class AppStore extends ReduxStore {
    constructor(){
        super(store);
    }
}
