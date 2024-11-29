import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-invalid-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './invalid-page.component.html',
  styleUrl: './invalid-page.component.scss',
})
export class InvalidPageComponent {}
