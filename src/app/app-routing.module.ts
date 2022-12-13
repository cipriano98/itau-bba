import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "pole",
    pathMatch: "full",
  },
  {
    path: "pole",
    loadChildren: () => import("./pole/pole.module").then((m) => m.PoleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
