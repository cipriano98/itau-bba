import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Locale } from "./locale/model/locale.model";
import { LocaleService } from "./locale/service/locale.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private readonly localeService: LocaleService) {}

  public locale: "PT" | "EN" = "PT";

  ngOnInit(): void {
    this.toggleLanguage();
    this.nextLocale("pt-BR");
  }

  public toggleLanguage(): void {
    const isEN: boolean = this.locale === "EN";
    const locale: Locale = isEN ? "pt-BR" : "en";
    this.nextLocale(locale);
  }

  private nextLocale(nextLocale: Locale): void {
    this.localeService.locale$.next(nextLocale);

    this.localeService.locale$.pipe(take(1)).subscribe((locale) => {
      this.localeService.laguage = locale;
      this.locale = locale === "pt-BR" ? "PT" : "EN";
    });
  }
}
