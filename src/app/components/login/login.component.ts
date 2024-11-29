import { NgIf } from '@angular/common'
import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService } from '../../service/Auth/auth.service'

type loginType = {
  email: string
  password: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  login: loginType = { email: '', password: '' }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form is Invalid')
      form.control.markAllAsTouched()
      return
    }

    const { email, password } = this.login

    const loginResult = this.authService.login(email, password)

    if (loginResult.success) {
      this.router.navigate(['/'])
    } else {
      if (loginResult.emailError) {
        form.controls['email'].setErrors({ invalidEmail: true })
      }
      if (loginResult.passwordError) {
        form.controls['password'].setErrors({ invalidPassword: true })
      }
    }
  }
}
