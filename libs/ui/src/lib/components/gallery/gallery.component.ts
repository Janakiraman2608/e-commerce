import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent implements OnInit {
  selectedImage = ' ';
  @Input() images: string[] = [];

  ngOnInit(): void {
    this.selectedImage = this.images[0];
  }

  onChange(image: string){
    this.selectedImage = image
  }
}
