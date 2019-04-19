import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

const url = 'http://localhost:3000/photos/upload'

@Injectable()

export class UploadService {
  constructor(private http: HttpClient) { }

  public upload(files: Array<File>): any {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i], files[i]['name']);
    }
    this.http.post('http://localhost:3000/photos/upload', formData)
      .subscribe(files => { });
  }
}