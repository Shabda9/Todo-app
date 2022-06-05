import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tasks } from '../model/interface';
import { AngularFireList } from '@angular/fire/compat/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class TodoComponent implements OnInit {

  public todoForm !: FormGroup;
  public tasks: Tasks[] = [];
  public inProgress: Tasks[] = [];
  public done: Tasks[] = [];
  public updateIndex !: any;
  public isEditEnabled: boolean = false;

  public fire!: Observable<any>[];

  // public fireDatabaseRef;

  constructor(
    private fb: FormBuilder,
    private afDb: AngularFireDatabase
  ) {

    // const itemsRef: AngularFireList<any> = afDb.list('todos');
    // this.fireDatabaseRef = itemsRef;
    // this.fireDatabaseRef.valueChanges().subscribe(res => {
    //   this.fire = <any>res
    // });

  }

  ngOnInit(): void {
    this.initializeTodoForm();
  }

  private initializeTodoForm(): void {
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required],
      storyPoints: ['', Validators.required],
      key: ['']
    });
  }

  public drop(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public addTask(): void {
    this.tasks.push({
      description: this.todoForm.value.taskName,
      storyPoints: this.todoForm.value.storyPoints,
      done: false
    });
    this.todoForm.reset();

    // this.fireDatabaseRef.push({
    //   taskName: this.todoForm.value.taskName,
    //   storyPoints: Number(this.todoForm.value.storyPoints),
    // }).then((snap) => {
    //     console.log(this.tasks)
    //   });
    }

  public deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  public deleteInprogressTask(index: number): void {
    this.inProgress.splice(index, 1);
  }

  public deleteCompletedTask(index: number): void {
    this.done.splice(index, 1);
  }

  public onEdit(item: Tasks, index: number): void {
    this.todoForm.controls['taskName'].setValue(item.description);
    this.todoForm.controls['storyPoints'].setValue(item.storyPoints);

    this.updateIndex = index;
    this.isEditEnabled = true;
  }

  public updateTask(): void {
    this.tasks[this.updateIndex].description = this.todoForm.value.taskName;
    this.tasks[this.updateIndex].storyPoints = this.todoForm.value.storyPoints;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
}
