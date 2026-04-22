import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSelection } from './shopping-selection';

describe('ShoppingSelection', () => {
  let component: ShoppingSelection;
  let fixture: ComponentFixture<ShoppingSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
