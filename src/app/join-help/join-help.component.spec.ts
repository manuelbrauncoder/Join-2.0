import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHelpComponent } from './join-help.component';

describe('JoinHelpComponent', () => {
  let component: JoinHelpComponent;
  let fixture: ComponentFixture<JoinHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
