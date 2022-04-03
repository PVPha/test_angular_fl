import { Component, HostListener } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test';
  nameFile: string = 'Jugement de placement';
  show: boolean = false;
  uploaded: string = '';
  constructor(public dialog: MatDialog) {}
  openDialogUpload(): void {
    const dialogRef = this.dialog.open(DialogUpload, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        console.log(result);
        this.nameFile = result;
        this.show = true;
        this.uploaded = 'uploaded';
      }
    });
  }
  delete() {
    this.nameFile = 'Jugement de placement';
    this.show = false;
    this.uploaded = '';
  }
}

@Component({
  selector: 'dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./app.component.css'],
})
export class DialogUpload {
  dragAreaClass!: string;
  constructor(public dialogRef: MatDialogRef<DialogUpload>) {}
  fileUpload(event: any) {
    let file: FileList = event.target.files;
    console.log(file.length);
    if (file.length > 0) {
      console.log(file[0].name);
      this.dialogRef.close(file[0].name);
    } else {
      this.dialogRef.close();
    }
  }
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'dropArea';
    console.log('over');

    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'dropArea';
    console.log('enter');
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    console.log('end');
    this.dragAreaClass = 'dragArea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragArea';
    console.log('leave');
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragArea';
    console.log('drop');
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let file: FileList = event.dataTransfer.files;
      // this.saveFiles(files);
      if (file.length > 0) {
        this.dialogRef.close(file[0].name);
      }
    }
  }
}
