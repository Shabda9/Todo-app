import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempTodoComponent } from './temp-todo.component';

describe('TempTodoComponent', () => {
  let component: TempTodoComponent;
  let fixture: ComponentFixture<TempTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
