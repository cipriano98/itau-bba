import { MatPaginatorIntl } from "@angular/material/paginator";
import { Locale } from "src/app/locale/model/locale.model";
import { LocaleService } from "src/app/locale/service/locale.service";

let language: Locale;

const locale = {
  "pt-BR": {
    itemsPerPageLabel: "Itens por página:",
    nextPageLabel: "Próxima página",
    previousPageLabel: "Página anterior",
    of: "de",
  },
  en: {
    itemsPerPageLabel: "items per page:",
    nextPageLabel: "Next page",
    previousPageLabel: "Previous page",
    of: "of",
  },
};

const rangeLabel = (page: number, pageSize: number, length: number): string => {
  if (length == 0 || pageSize == 0) {
    return `0 ${locale[language].of} ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} ${locale[language].of} ${length}`;
};

export function getTranslatePaginator(
  localeService: LocaleService
): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();
  language = localeService.laguage;

  translate(paginatorIntl);
  localeService.locale$.subscribe({
    next: (locale) => {
      language = locale;
      translate(paginatorIntl);
    },
  });

  return paginatorIntl;
}

const translate = (paginatorIntl: MatPaginatorIntl): void => {
  paginatorIntl.itemsPerPageLabel = locale[language].itemsPerPageLabel;
  paginatorIntl.nextPageLabel = locale[language].nextPageLabel;
  paginatorIntl.previousPageLabel = locale[language].previousPageLabel;
  paginatorIntl.getRangeLabel = rangeLabel;
};
