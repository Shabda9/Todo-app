import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Tasks } from '../model/interface';
import { MinMaxValidator } from '../services/min-max-validators';

@Component({
  selector: 'app-temp-todo',
  templateUrl: './temp-todo.component.html',
  styleUrls: ['./temp-todo.component.scss']
})
export class TempTodoComponent implements OnInit {

  public todoForm !: FormGroup;
  public tasks: Tasks[] = [];
  public inProgress: Tasks[] = [];
  public done: Tasks[] = [];
  public updateIndex !: any;
  public isEditEnabled : boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeTodoForm();
  }

  private initializeTodoForm(): void {
    this.todoForm = this.fb.group({
      taskName: new FormControl('', [Validators.required]),
      storyPoints: new FormControl('', [Validators.required, MinMaxValidator.rangeValidator])
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

  // public onEdit(item: Tasks, index: number): void {
  //   this.todoForm.controls['taskName'].setValue(item.description);
  //   this.todoForm.controls['storyPoints'].setValue(item.storyPoints);

  //   this.updateIndex = index;
  //   this.isEditEnabled = true;
  // }

  public updateTask(): void {
    this.tasks[this.updateIndex].description = this.todoForm.value.taskName;
    this.tasks[this.updateIndex].storyPoints = this.todoForm.value.storyPoints;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  public initiateEditTask(e: any): void {
    this.updateIndex = e.updateIndex,
    this.isEditEnabled = true
  }

}
