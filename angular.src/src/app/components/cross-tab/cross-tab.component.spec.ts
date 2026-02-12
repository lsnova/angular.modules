import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTabComponent } from './cross-tab.component';
import {LSN_COOKIE_CONFIG, LsnCookieConfig, LsnCookieModule} from 'lsn-libs';

describe.skip('CrossTabComponent', () => {
  let component: CrossTabComponent;
  let fixture: ComponentFixture<CrossTabComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossTabComponent ],
      imports: [LsnCookieModule],
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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
