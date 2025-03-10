import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InvalidPageComponent } from './invalid-page.component'

describe('InvalidPageComponent', () => {
  let component: InvalidPageComponent
  let fixture: ComponentFixture<InvalidPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidPageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InvalidPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
