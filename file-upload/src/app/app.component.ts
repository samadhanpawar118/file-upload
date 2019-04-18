import { Component } from '@angular/core';
import { FileUploadDirective } from './shared/file-upload/file-upload.directive';

@Component({
  providers:[FileUploadDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exceptionaire Technologies';

  constructor(private fileupload: FileUploadDirective ) { }
  test(){
    console.log("-=-=this.fileupload.getFiles();-=-=",this.fileupload.files)
  }
}
