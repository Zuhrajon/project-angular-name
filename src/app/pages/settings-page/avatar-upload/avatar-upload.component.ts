import { Component, signal } from '@angular/core';
import { DerectivesDirective } from '../../../common-ui/derectives/derectives.directive';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [DerectivesDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/img.jpg')

  avatar: File | null = null 

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file)
  }

  OnFileDroped(file: File){
    this.processFile(file)
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return

    const reader = new FileReader()
  
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')

    }

    reader.readAsDataURL(file)
    this.avatar = file
  }


}
