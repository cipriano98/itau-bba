import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoleEditComponent } from './pole-edit.component';

const routes: Routes = [{ path: '', component: PoleEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoleEditRoutingModule { }
