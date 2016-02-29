import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
	selector: "overview-page",
	template: `
	<div class="row">
		<div class="col-md-3">
			<div class="show-pointer cube basic-cube text-center" [routerLink]='["TodoMasterDetail"]'>
				<h2>Todos</h2>
				<p>A very basic example</p>
			</div>
		</div>
		<div class="col-md-3">
			<div class="show-pointer cube advanced-cube text-center" [routerLink]='["NewsFeed"]'>
				<h2>Facebook</h2>
				<p>An advanced example</p>
			</div>
		</div>
	</div>
  `,
	directives: [ROUTER_DIRECTIVES]
})
export class OverviewPage {
	constructor() {}
}
