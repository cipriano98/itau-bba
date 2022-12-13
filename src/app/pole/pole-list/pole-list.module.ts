import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PoleListRoutingModule } from "./pole-list-routing.module";
import { PoleListComponent } from "./pole-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CurrencyPipe } from "./pipe/currency.pipe";
import { getTranslatePaginator } from "./providers/mat-paginator-translate.provider";
import { LocaleService } from "src/app/locale/service/locale.service";

@NgModule({
  declarations: [PoleListComponent, CurrencyPipe],
  imports: [
    CommonModule,
    PoleListRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: getTranslatePaginator,
      deps: [LocaleService],
    },
  ],
})
export class PoleListModule {}
