import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskDetailCardComponent } from './board-task-detail-card.component';

describe('BoardTaskDetailCardComponent', () => {
  let component: BoardTaskDetailCardComponent;
  let fixture: ComponentFixture<BoardTaskDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTaskDetailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardTaskDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
