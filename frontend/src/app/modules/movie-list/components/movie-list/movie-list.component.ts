/**
 * movie-list.component
 * Componente encargado de filtrar y listar las películas por año
 */
import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies/movies.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
  host: { class: "big-cont" } // Para 'colocar' estilos desde el host 'router-outlet'
})
export class MovieListComponent implements OnInit {
  // Arreglo de películas obtenidas según los filtros
  public movies = [];
  // Año seleccionado para las búsquedas
  public selectedYear: number;
  // Arreglo de años disponibles para la búsqueda
  public years = [];
  // Página para la búsqueda // ver API themovieDB
  public page = 1;

  private unsubscribe$ = new Subject<void>();

  constructor(private movieService: MoviesService) {
    for (let i = 9; i <= 19; i++) {
      (i + "").length > 1
        ? this.years.push(parseInt(20 + `${i}`))
        : this.years.push(parseInt(200 + `${i}`));
    }
    this.selectedYear = this.years[0];
  }

  ngOnInit() {
    this.getMovies(this.selectedYear, this.page);
  }

  /**
   * ### onScroll
   * Método que se ejecuta cada que se realiza scroll en el límete de la página (para buscar más
   * datos haciendo uso de la paginación de la API de movieDB)
   */
  onScroll() {
    this.page++;
    this.getMovies(this.selectedYear, this.page);
  }

  /**
   * ### onChangeYear
   * Método encargado de limpiar la lista de películas y realizar una nueva búsqueda en el
   * año seleccionado
   */
  onChangeYear() {
    this.movies = [];
    this.getMovies(this.selectedYear, 1);
  }

  /**
   * ### getMovies
   * @param selectedYear number año seleccionado para la búsqueda
   * @param page number página seleccionada para la búsqueda
   */
  getMovies(selectedYear: number, page: number) {
    this.movieService
      .getMovies(selectedYear, page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(movies => {
        this.movies = this.movies.concat(movies);
      });
  }

  /**
   * ### ngOnDestroy
   * Una vez se destruye el componente se cancela la subscripción haciendo uso de un Subject
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
