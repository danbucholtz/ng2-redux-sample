import {Injectable} from "angular2/core";
import {BaseMigration} from "./BaseMigration";

import {FbUser} from "../../../dao/fb-user/FbUser";
import {FbUserDao} from "../../../dao/fb-user/FbUserDao";

Injectable()
export class MigrationTwo extends BaseMigration {
	constructor(fbUserDao:FbUserDao) {
		super();
        this.fbUserDao = fbUserDao;
	}

	getVersion() {
		return 2;
	}

	async migrate() {
		/* Insert Default Users */
        var frodo = new FbUser(null, "Frodo", "Baggins", "images/frodo.png");
        var gandalf = new FbUser(null, "Gandalf", "The Grey", "images/gandalf.jpg");
        var aragorn = new FbUser(null, "Aragorn", "Son of Arathorn", "images/aragorn.png");
        var legolas = new FbUser(null, "Legolas", "Thranduilion", "images/legolas.jpg");
        var gimli = new FbUser(null, "Gimli", "Son of Gloin", "images/gimli.png");
        var boromir = new FbUser(null, "Boromir", "Son of Denethor", "images/boromir.jpg");
        var sam = new FbUser(null, "Samwise", "Gamgee", "images/sam.jpg");
        var pippin = new FbUser(null, "Peregrin", "Took", "images/pippin.jpg");
        var merry = new FbUser(null, "Meriadoc", "Brandybuck", "images/merry.jpg");

        await this.fbUserDao.save(frodo);
        await this.fbUserDao.save(gandalf);
        await this.fbUserDao.save(aragorn);
        await this.fbUserDao.save(legolas);
        await this.fbUserDao.save(gimli);
        await this.fbUserDao.save(boromir);
        await this.fbUserDao.save(sam);
        await this.fbUserDao.save(pippin);
        await this.fbUserDao.save(merry);

	}
}
