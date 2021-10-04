import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {LsnNumericModule} from './numeric.module';
import {NumericConfig} from './numeric-config.service';
import {By} from '@angular/platform-browser';

@Component({
  template: `<input [lsnNumeric]="config" [(ngModel)]='value'/>`
})
class TestComponent {
  value = 0;
  config: NumericConfig = {};

  constructor() {
  }
}


describe('NumericDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
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
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should properly handle always display decimals', () => {
    component.config = {
      decimals: ',',
      precision: 3,
      alwaysDisplayDecimals: true
    };
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css(`input`));
    inputElement.nativeElement.value = '1';
    inputElement.triggerEventHandler('input', {
      target: inputElement.nativeElement
    });
    fixture.detectChanges();
    inputElement.triggerEventHandler('blur', new Event('blur'));
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toEqual('1,000');
  });
});
