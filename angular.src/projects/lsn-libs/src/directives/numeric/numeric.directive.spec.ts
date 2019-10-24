import { LsnNumericModule } from '@lsnova/angularmodules';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

@Component({
  template: '<input lsnNumeric [(ngModel)]="value"/>'
})
class TestComponent {
  value = 0;

  constructor() { }
}


describe('NumericDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
      ],
      imports: [
        FormsModule,
        LsnNumericModule.forRoot(),
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
