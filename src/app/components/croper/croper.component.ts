import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-croper',
  templateUrl: './croper.component.html',
  styleUrls: ['./croper.component.scss']
})
export class CroperComponent implements OnInit {
  cropedFile;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: any, aspectRatio: any, toHeight, toWidth }, public dialogRef: MatDialogRef<CroperComponent>) { }
  width = 400;
  height = 200;
  scale = 1;
  imageTransform: ImageTransform = { scale: 1 };
  canvasRotation = 0;
  rotation = 0;
  ngOnInit(): void {
    this.imageTransform.scale = 1.2;
    console.log(this.data.image);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.cropedFile = event.base64;
  }
  closeDialog() {
    this.dialogRef.close(this.cropedFile);
  }
  zoomUp() {
    this.scale += .1;
    this.imageTransform = {
      ...this.imageTransform,
      scale: this.scale
    };
  }
  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.imageTransform.flipH;
    const flippedV = this.imageTransform.flipV;
    this.imageTransform = {
      ...this.imageTransform,
      flipH: flippedV,
      flipV: flippedH
    };
  }
  flipHorizontal() {
    this.imageTransform = {
      ...this.imageTransform,
      flipH: !this.imageTransform.flipH
    };
  }

  flipVertical() {
    this.imageTransform = {
      ...this.imageTransform,
      flipV: !this.imageTransform.flipV
    };
  }
  resetImage() {
    this.scale = 1;
    // this.rotation = 0;
    // this.canvasRotation = 0;
    this.imageTransform = {};
  }
  zoomOut() {
    this.scale -= .1;
    this.imageTransform = {
      ...this.imageTransform,
      scale: this.scale
    };
  }
  cancel() {
    this.dialogRef.close();
  }
}
