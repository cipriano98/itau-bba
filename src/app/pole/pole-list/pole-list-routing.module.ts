import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoleListComponent } from './pole-list.component';

const routes: Routes = [{ path: '', component: PoleListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoleListRoutingModule { }
