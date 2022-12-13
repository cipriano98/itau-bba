import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PoleEditRoutingModule } from "./pole-edit-routing.module";
import { PoleEditComponent } from "./pole-edit.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [PoleEditComponent],
  imports: [
    CommonModule,
    PoleEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      validation: false,
      dropSpecialCharacters: false
    }),
  ],
})
export class PoleEditModule {}
