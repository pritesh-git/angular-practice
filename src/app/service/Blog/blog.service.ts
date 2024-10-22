import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface BlogData {
  title: string;
  description: string;
  blog_image: any;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private storageKey = 'blogsList';
  private storageSubject = new Subject<void>();

  storageChange$ = this.storageSubject.asObservable();

  constructor() {
    window.addEventListener('storage', () => this.storageSubject.next());
  }

  addBlog(newBlog: BlogData) {
    const existingBlogs = this.getBlogs();
    existingBlogs.push(newBlog);
    localStorage.setItem(this.storageKey, JSON.stringify(existingBlogs));
    this.storageSubject.next();
  }

  getBlogs(): BlogData[] {
    const blogs = localStorage.getItem(this.storageKey);
    return blogs ? JSON.parse(blogs) : [];
  }
}
