import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tasks } from '../model/interface';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todoForm !: FormGroup;
  @Input() tasks: Tasks[] = [];
  @Input() canEditTask: boolean = false;
  @Input() isTaskCompleted: boolean = false;

  @Output() initiateEditTask = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

  }

  public drop(event: CdkDragDrop<Tasks[]>) {
    debugger;
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

  public deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  public onEdit(item: Tasks, index: number): void {
    debugger
    this.todoForm.controls['taskName'].setValue(item.description);
    this.todoForm.controls['storyPoints'].setValue(item.storyPoints);

    const eventData = {
      updateIndex: index,
    };
    this.initiateEditTask.emit(eventData)
  }
}
