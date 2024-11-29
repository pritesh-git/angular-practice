import { Component, OnInit } from '@angular/core'
interface Users {
  id: string
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: { name: string; catchPhrase: string; bs: string }
}
@Component({
  selector: 'app-data-rendering',
  standalone: true,
  imports: [],
  templateUrl: './data-rendering.component.html',
  styleUrl: './data-rendering.component.scss',
})
export class DataRenderingComponent implements OnInit {
  userList: Users[] = []
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users'

  ngOnInit(): void {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        this.userList = data
      })
  }
}
