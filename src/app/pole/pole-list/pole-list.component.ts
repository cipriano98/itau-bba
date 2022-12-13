import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { finalize, Subscription } from "rxjs";
import { LOCALE } from "src/app/locale/constants/locale.constant";
import {
  Locale,
  LocaleConstantPagePoleList,
} from "src/app/locale/model/locale.model";
import { LocaleService } from "src/app/locale/service/locale.service";
import { Pole } from "../model/pole.model";
import { PoleService } from "../service/pole.service";

@Component({
  selector: "it-pole-list",
  templateUrl: "./pole-list.component.html",
  styleUrls: ["./pole-list.component.scss"],
})
export class PoleListComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private readonly service: PoleService,
    private readonly localeService: LocaleService
  ) {}

  @ViewChild(MatPaginator)
  private readonly paginator!: MatPaginator;
  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  public loading: boolean = false;
  public currency!: Locale;
  public locale: LocaleConstantPagePoleList =
    LOCALE[this.localeService.laguage].pole.list;
  public readonly pole = new MatTableDataSource<Pole>([]);
  public readonly displayedColumns: string[] = [
    "name",
    "business",
    "valuation",
    "active",
    "action",
  ];

  private localeChange?: Subscription;

  ngOnInit(): void {
    const dutchRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length == 0 || pageSize == 0) {
        return `0 van ${length}`;
      }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = "Items por página:";
    paginatorIntl.nextPageLabel = "Próxima página";
    paginatorIntl.previousPageLabel = "Página anterior";
    paginatorIntl.getRangeLabel = dutchRangeLabel;

    this.getLocale();
    this.getPoles();
  }

  ngOnDestroy(): void {
    this.localeChange?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.pole.paginator = this.paginator;
    this.pole.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const filterValue = target.value;

    this.pole.filter = filterValue.trim().toLowerCase();
  }

  private getLocale(): void {
    this.localeChange = this.localeService.locale$.subscribe({
      next: (locale) => {
        this.currency = locale;
        this.locale = LOCALE[locale].pole.list;
      },
    });
  }

  private getPoles(): void {
    this.loading = true;

    this.service
      .getPoles()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data): void => {
          this.pole.data = data;
        },
        error: (err): void => {
          console.dir(err);
        },
      });
  }
}
