import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
  },
  {
    path: "list",
    loadChildren: () =>
      import("./pole-list/pole-list.module").then((m) => m.PoleListModule),
  },
  {
    path: "edit/:id",
    loadChildren: () =>
      import("./pole-edit/pole-edit.module").then((m) => m.PoleEditModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoleRoutingModule {}
