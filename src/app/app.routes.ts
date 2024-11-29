import { Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './auth.guard'
import { BlogsComponent } from './components/blogs/blogs.component'
import { InvalidPageComponent } from './components/invalid-page/invalid-page.component'
import { DataRenderingComponent } from './components/data-rendering/data-rendering.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'blogs', component: BlogsComponent, canActivate: [AuthGuard] },
  {
    path: 'data-rendering',
    component: DataRenderingComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: InvalidPageComponent },
]

// Lazy loading approch
// {path:'home', loadComponent:()=>import('./components/home/home.component').then(c=>c.HomeComponent)}
// {path:'login', loadComponent:()=>import('./components/login/login.component').then(c=>c.LoginComponent)}
// {path:'blogs', loadComponent:()=>import('./components/blogs/blogs.component').then(c=>c.BlogsComponent)}
