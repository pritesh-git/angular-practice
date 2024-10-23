import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export interface LoginResult {
  success: boolean
  emailError?: boolean
  passwordError?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>

  constructor() {
    const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true'
    this.isLoggedInSubject = new BehaviorSubject<boolean>(initialLoggedInState)
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable()
  }

  login(email: string, password: string): LoginResult {
    const validEmail = 'admin@gmail.com'
    const validPassword = 'admin1234'

    const result: LoginResult = {
      success: false,
      emailError: email !== validEmail,
      passwordError: password !== validPassword,
    }

    if (!result.emailError && !result.passwordError) {
      result.success = true
      this.setLoggedIn(true)
    }

    return result
  }

  logout(): void {
    this.setLoggedIn(false)
  }

  private setLoggedIn(value: boolean): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(value))
    this.isLoggedInSubject.next(value)
  }
}
