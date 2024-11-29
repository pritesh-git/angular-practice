import { NgClass, NgIf } from '@angular/common'
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { BlogService } from '../../../service/Blog/blog.service'

interface BlogData {
  title: string
  description: string
  blog_image: any
}

@Component({
  selector: 'app-blog-modal',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './blog-modal.component.html',
})
export class BlogModalComponent implements OnInit, OnDestroy {
  @Output() blogAdded = new EventEmitter<void>()
  @ViewChild('blogForm') blogForm!: NgForm

  isModalOpen = false
  blogData: BlogData = {
    title: '',
    description: '',
    blog_image: '',
  }

  private escKeySubscription: any

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.escKeySubscription = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal()
      }
    }
    window.addEventListener('keydown', this.escKeySubscription)
  }

  ngOnDestroy() {
    if (this.escKeySubscription) {
      window.removeEventListener('keydown', this.escKeySubscription)
    }
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    if (this.blogForm) {
      this.onResetForm(this.blogForm)
    }
  }

  onResetForm(form: NgForm) {
    form.resetForm()

    this.blogData = {
      title: '',
      description: '',
      blog_image: '',
    }

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }

    form.control.markAsUntouched()
    form.control.markAsPristine()
  }

  get isSubmitDisabled(): boolean {
    return (
      !this.blogData.title ||
      !this.blogData.description ||
      !this.blogData.blog_image
    )
  }

  onBlogSubmit(form: NgForm) {
    if (form.invalid || this.isSubmitDisabled) {
      form.control.markAllAsTouched()
      return
    }

    try {
      this.blogService.addBlog(this.blogData)
      this.blogAdded.emit()
      this.onResetForm(form)
      this.closeModal()
    } catch (error) {
      console.error('Error submitting blog:', error)
    }
  }

  onBlogImageSelect(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Please select an image file')
        input.value = ''
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        console.error('File size should not exceed 5MB')
        input.value = ''
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        this.blogData.blog_image = reader.result?.toString()
      }
      reader.onerror = error => {
        console.error('Error reading file:', error)
        input.value = ''
      }
      reader.readAsDataURL(file)
    }
  }
}
