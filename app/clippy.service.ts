import {Injectable} from "@angular/core";
import integer = fhir.integer;

declare var clippy: any;


@Injectable()
export class Clippy {

	constructor() {
		clippy.load('Clippy', function (agent) {

			let importantInformation: string[] = [
				"Is there a FHIR alarm?",
				"SMART is the hot news",
				"Bald ist FHIRabend",
				"Irish Interoperability Projects - FHIReland",
				`FHIR! I am the god of hell fire and I bring you:
				 FHIR!
				 I'll take you to burn.
				 FHIR!
				 I'll take you to learn.
				 I'll see you burn!`,
				"Is it hot in here? Wait...it's just me...",
				"....and it burns, burns, burns...the ring of FHIR....the ring of FHIR....",
				// "Daenerys stormborn of the house Targaryen, the first of her name, the unburnt queen of meereen, queen of the andals and the rhoynar and the FHIR",
				"Everyone in the jury will get 50€ if we win :)",
				"the hotter you are, the faster we come",
				"Friendly FHIR",
				"Don't play with FHIR"
			];

			agent.show();

			setInterval(function () {
				agent.speak(importantInformation[Math.floor(Math.random() * importantInformation.length) + 0]);
			}, 15000);

			setInterval(function () {
				agent.animate();
			}, 8000);
		})
	}

	private randomInt(min: number, max: number): number {
		let randomNumber: number = Math.floor((Math.random() * max) + min);

		return randomNumber;
	}
}