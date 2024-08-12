import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsLetterUserGroupComponent } from './contacts-letter-user-group.component';

describe('ContactsLetterUserGroupComponent', () => {
  let component: ContactsLetterUserGroupComponent;
  let fixture: ComponentFixture<ContactsLetterUserGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsLetterUserGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsLetterUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
