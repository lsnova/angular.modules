import {NavbarComponent} from './navbar.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('NavbarComponent', () => {
    let fixture: ComponentFixture<NavbarComponent>;
    let component: NavbarComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(1).toEqual(1);
    });
});
