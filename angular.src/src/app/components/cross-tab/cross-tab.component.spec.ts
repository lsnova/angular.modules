import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTabComponent } from './cross-tab.component';
import {LSN_COOKIE_CONFIG, LsnCookieConfig} from '@lsnova/angularmodules';

describe('CrossTabComponent', () => {
  let component: CrossTabComponent;
  let fixture: ComponentFixture<CrossTabComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ CrossTabComponent ],
      providers: [
        {
          provide: LSN_COOKIE_CONFIG,
          useValue: {
            secureCookies: false,
            domainCookies: false,
          } satisfies LsnCookieConfig
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
