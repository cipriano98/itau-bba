import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Locale } from "../model/locale.model";

@Injectable({
  providedIn: "root",
})
export class LocaleService {
  public readonly locale$: Subject<Locale> = new Subject<Locale>();

  public laguage: Locale = "pt-BR";
}
