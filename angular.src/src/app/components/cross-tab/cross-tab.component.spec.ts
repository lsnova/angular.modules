import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTabComponent } from './cross-tab.component';

describe('CrossTabComponent', () => {
  let component: CrossTabComponent;
  let fixture: ComponentFixture<CrossTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
