import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import * as moment from "moment";

import { characters } from "../../data/characters";

import { Character } from "../../interfaces/character";
import { Movie } from "../../interfaces/movie";
import { CharacterRoute } from "../../interfaces/character-route";

import { MoviesService } from "../../services/movies.service";
import { Observable, forkJoin, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  private route: ActivatedRoute;
  private selectedCharacterRoute: CharacterRoute;
  private moviesService: MoviesService;
  private characterMovies: Movie[];
  private overlayNoRowsTemplate;

  private gridApi;
  columnDefs = [
    {
      headerName: "Title",
      field: "title",
      width: 300
    },
    {
      headerName: "Release Date",
      field: "release_date",
      width: 300,
      cellRenderer: data => {
        return moment(data.value).format("dddd, MMMM D YYYY");
      }
    },
    {
      headerName: "Producer",
      field: "producer",
      width: 300
    },
    {
      headerName: "Director",
      field: "director",
      width: 300
    }
    //Thursday, May 19 2005
  ];
  rowData = [];
  constructor(route: ActivatedRoute, moviesService: MoviesService) {
    this.route = route;
    this.moviesService = moviesService;
    this.overlayNoRowsTemplate = "<span></span>";

    //this.characterMovies = [];
  }

  ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.gridApi.showLoadingOverlay();

      this.selectedCharacterRoute = characters[params.get("position")];

      this.moviesService
        .getCharacter(this.selectedCharacterRoute.url)
        .pipe(
          catchError(error => {
            this.rowData = [];
            this.gridApi.hideOverlay();
            return throwError(error);
          })
        )
        .subscribe((resp: Character) => {
          let allMoviesArr = [];
          for (let i = 0; i < resp.films.length; i++) {
            allMoviesArr.push(this.moviesService.getMovie(resp.films[i]));
          }
          const allMoviesObserve = forkJoin.apply(this, allMoviesArr);
          const subscribe = allMoviesObserve.subscribe((val: Movie[]) => {
            this.rowData = val;
            this.gridApi.refreshCells({ force: true });
            this.gridApi.hideOverlay();
          });
        });
    });
  }
}
