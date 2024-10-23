import { Component, OnDestroy, OnInit } from '@angular/core'
import { BlogModalComponent } from './blog-modal/blog-modal.component'
import { CommonModule } from '@angular/common'
import { BlogData, BlogService } from '../../service/Blog/blog.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogModalComponent, CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit, OnDestroy {
  blogsList: BlogData[] = []
  private storageSubscription: Subscription | undefined

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs()
    this.storageSubscription = this.blogService.storageChange$.subscribe(() => {
      this.loadBlogs()
    })
  }

  ngOnDestroy() {
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe()
    }
  }

  loadBlogs() {
    this.blogsList = this.blogService.getBlogs()
  }

  onBlogAdded() {
    this.loadBlogs()
  }
}
