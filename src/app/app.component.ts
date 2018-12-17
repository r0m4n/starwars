import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { characters } from "./data/characters";
import { CharacterRoute } from "./interfaces/character-route";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string = "starwars";
  router: Router;
  characters: CharacterRoute[];

  constructor(router: Router) {
    this.characters = characters;
    this.router = router;
  }
  showMovies(position: number) {
    this.router.navigate(["/character", position]);
  }
}
