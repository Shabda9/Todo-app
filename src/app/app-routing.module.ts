import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempTodoComponent } from './temp-todo/temp-todo.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  // {path: '', component: TodoComponent}
  {path: '', component: TempTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
