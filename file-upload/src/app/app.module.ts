import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FileUploadDirective } from './shared/file-upload/file-upload.directive';
import { UploadService } from '../app/upload/upload.service';

// import { ImagePreview } from './shared/image-preview.directive';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadDirective,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
