import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IiifTestComponent } from './iiif-test.component';

describe('IiifTestComponent', () => {
  let component: IiifTestComponent;
  let fixture: ComponentFixture<IiifTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IiifTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IiifTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
