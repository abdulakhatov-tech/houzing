import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Header } from './header';
import { menuItems } from '@shared/constants';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('Header', () => {
  let router: Router;
  let component: Header;
  let authService: AuthService;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  /* ---------- Basic creation ---------- */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* ---------- Static structure ---------- */

  it('it should render a header tag with expected classes', () => {
    const headerEl = fixture.debugElement.query(By.css('header'));

    expect(headerEl).toBeTruthy();
    expect(headerEl.nativeElement.className).toContain('bg-primary-blue');
  });

  it('should contain the logo image and text', () => {
    const img = fixture.debugElement.query(By.css('img[alt="Houzing"]'));
    const text = fixture.debugElement.query(By.css('h4'));

    expect(img).toBeTruthy();
    expect(text.nativeElement.textContent).toContain('Houzing');
  });

  /* ---------- Navigation links ---------- */

  it('should render one <li> for each menu item', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));

    expect(listItems.length).toBe(menuItems.length);
    menuItems.forEach((item, idx) => {
      expect(listItems[idx].nativeElement.textContent).toContain(item.label);
    });
  });

  /* ---------- Auth state ---------- */

  it('should show the user icon when user is authenticated', () => {
    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(true);
    fixture.detectChanges();

    const userIcon = fixture.debugElement.query(By.css('img[alt="User"]'));
    expect(userIcon).toBeTruthy();

    const loginBtn = fixture.debugElement.query(By.css('button[textContent="Login"]'));
    expect(loginBtn).toBeNull();
  });

  /* ---------- Router interaction ---------- */

  it('should navigate to / when logo is clicked', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const logoLink = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    logoLink.nativeElement.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalled();
    const arg = navigateSpy.calls.mostRecent().args[0];

    // Accept either string or UrlTree
    if (typeof arg === 'string') {
      expect(arg).toBe('/');
    } else {
      // UrlTree: compare its string representation
      expect(arg.toString()).toBe('/');
    }
  });

  /* ---------- Responsive bits ---------- */

  it('should render the hamburger menu button for mobile view', () => {
    const menuButton = fixture.debugElement.query(By.css('app-menu-modal-button'));
    expect(menuButton).toBeTruthy();
  });
});
