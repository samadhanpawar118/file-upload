
import {Component} from '@angular/core';
import { UploadService } from '../../upload/upload.service';
import {
  HttpClient
} from '@angular/common/http'

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.directive.html'
})
export class FileUploadDirective  {
  name = 'File Upload';
  urls = [];
  files :File[];
  gallary = true;
  gallaryArr : any;
  arr : any;
  constructor(public uploadService: UploadService,private http: HttpClient) {
    this.gallary = true;
    this.arr = [];
 }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        this.files = event.target.files
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (img : any) => {
                   this.urls.push(img.target.result); 
                }
                reader.readAsDataURL(event.target.files[i]);
        }
        this.uploadService.upload(event.target.files);
    }
  }

  delete(obj){
    let self = this;
    this.http.delete('http://localhost:3000/photos/'+obj.id)
    .subscribe(files => {
      location.reload();
    });
  }

  goToGallary(){
    let self = this;
    this.gallary = false;
    this.http.get('http://localhost:3000/photos')
    .subscribe(files => { 
      this.gallaryArr = files;
      this.gallaryArr.forEach(element => {
        self.arr.push({'url' : 'http://localhost:3000/'+element.filename, 'id' : element._id});
      });
    });
  }

}