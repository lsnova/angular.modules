import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsnModulesComponent } from './lsn-modules.component';

describe('LsnModulesComponent', () => {
  let component: LsnModulesComponent;
  let fixture: ComponentFixture<LsnModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsnModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsnModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
