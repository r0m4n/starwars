import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Character } from "../interfaces/character";
import { Movie } from "../interfaces/movie";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getCharacter<Observable>(url:string) {
    return this.http.get<Character>(url);
  }
  getMovie<Observable>(url:string) {
    return this.http.get<Movie>(url);
  }
}
