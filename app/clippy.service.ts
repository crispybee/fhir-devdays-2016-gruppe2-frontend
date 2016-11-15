import {Injectable} from "@angular/core";

declare var clippy: any;


@Injectable()
export class Clippy {

	importantInformation: string[] = [
		"",
		""
	];


	constructor() {
		clippy.load('Clippy', function (agent) {
			agent.show();

			setInterval(function () {
				agent.speak("Bla!");
			}, 15000);

			setInterval(function () {
				agent.animate();
			}, 8000);
		})
	}
}