import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataRenderingComponent } from './data-rendering.component'

describe('DataRenderingComponent', () => {
  let component: DataRenderingComponent
  let fixture: ComponentFixture<DataRenderingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataRenderingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DataRenderingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
