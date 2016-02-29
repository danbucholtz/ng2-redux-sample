import {Injectable} from 'angular2/core';

@Injectable()
export class WindowFactory {
	constructor() {
	}

	getWindow(){
        return window;
    }
}
