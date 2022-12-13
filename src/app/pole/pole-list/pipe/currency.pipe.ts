import { Pipe, PipeTransform } from "@angular/core";
import { Locale } from "src/app/locale/model/locale.model";

@Pipe({
  name: "currency",
})
export class CurrencyPipe implements PipeTransform {
  transform(valuation: number, locale: Locale): string {
    const currency: string = locale === "en" ? "USD" : "BRL";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(valuation);
  }
}
