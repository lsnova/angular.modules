import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LsnNumericModule} from './numeric.module';
import {NumericConfig, NumericConfigService} from './numeric-config.service';
import {By} from '@angular/platform-browser';
import {NumericDirective} from './numeric.directive';

describe('NumericDirective', () => {
    describe('TemplateDriven', () => {
      @Component({
        template: `<input [lsnNumeric]="config" [(ngModel)]='value'/>`
      })
      class TestComponent {
        value = 0;
        config: NumericConfig = {};

        constructor() {
        }
      }
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

    describe('Reactive', () => {
      @Component({
        template: `<input [lsnNumeric]="config" [formControl]="control"/>`
      })
      class TestReactiveComponent {
        control = new FormControl(null);
        config: NumericConfig = {};
      }

      let component: TestReactiveComponent;
      let fixture: ComponentFixture<TestReactiveComponent>;

      beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [
            TestReactiveComponent
          ],
          imports: [
            FormsModule,
            ReactiveFormsModule,
            LsnNumericModule.forRoot(),
          ]
        });

        fixture = TestBed.createComponent(TestReactiveComponent);
        component = fixture.componentInstance;
      });

      it('should properly check numeric config equality', () => {
        const configService = new NumericConfigService({});
        const directive = new NumericDirective(null, configService);
        expect(directive.isConfigEqual()).toBeTruthy();
        expect(directive.isConfigEqual({})).toBeFalsy();
        expect(directive.isConfigEqual(undefined, {})).toBeFalsy();
        expect(directive.isConfigEqual({min: 1}, {min: 2})).toBeFalsy();
        expect(directive.isConfigEqual({min: 1}, {min: 1})).toBeTruthy();
        expect(directive.isConfigEqual({min: 1, max: 3}, {min: 1})).toBeFalsy();
        expect(directive.isConfigEqual({min: 1}, {min: 1, max: 3})).toBeFalsy();
      });

      it('should properly react to config changes', fakeAsync(() => {
        const config1: NumericConfig = {
          min: 0,
          max: 10
        };
        const config2: NumericConfig = {
          min: 2,
          max: 5
        };
        component.config = config1;
        component.control.setValue(6);
        fixture.detectChanges();
        expect(queryInput().nativeElement.value).toEqual(`${component.control.value}`);
        component.config = config2;
        fixture.detectChanges();
        expect(queryInput().nativeElement.value).toEqual(`${config2.max}`);
      }));

      const queryInput = () => fixture.debugElement.query(By.css(`input`));
    });
});
