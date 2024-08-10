import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskCardEmptyComponent } from './board-task-card-empty.component';

describe('BoardTaskCardEmptyComponent', () => {
  let component: BoardTaskCardEmptyComponent;
  let fixture: ComponentFixture<BoardTaskCardEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTaskCardEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTaskCardEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
