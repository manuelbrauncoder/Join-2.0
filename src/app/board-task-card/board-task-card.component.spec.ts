import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskCardComponent } from './board-task-card.component';

describe('BoardTaskCardComponent', () => {
  let component: BoardTaskCardComponent;
  let fixture: ComponentFixture<BoardTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTaskCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
