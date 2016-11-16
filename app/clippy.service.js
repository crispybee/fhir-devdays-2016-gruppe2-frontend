"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Clippy = (function () {
    function Clippy() {
        this.importantInformation = [
            "It is FHIR alarm, we call it a burnt area",
            "SMART is the hot news",
            "Bald ist FHIRabend",
            "Irish Interoperability Projects - FHIReland",
            "FHIR!I am the god of hell fire and I bring you:\n\t\tFHIR!\n\t\tI'll take you to burn.\n\t\tFHIR!\n\t\tI'll take you to learn.\n\t\tI'll see you burn!",
            "Is it hot in here? Wait...it's just me...",
            "Set a hospital on FHIR and it will be hot",
            "....and it burns, burns, burns...the ring of FHIR....the ring of FHIR....",
            "A FHIR cannot kill a dragon!",
            "Daenerys stormborn of the house Targaryen, the first of her name, the unburnt queen of meereen, queen of the andals and the rhoynar and the FHIR",
            "Everyone in the jury will get 50€ if we win :)",
            "the hotter you are, the faster we come",
            "friendly FHIR",
            "Don't play with FHIR"
        ];
        clippy.load('Clippy', function (agent) {
            agent.show();
            setInterval(function () {
                agent.speak("Bla!");
            }, 15000);
            setInterval(function () {
                agent.animate();
            }, 8000);
        });
    }
    Clippy = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Clippy);
    return Clippy;
}());
exports.Clippy = Clippy;
//# sourceMappingURL=clippy.service.js.map