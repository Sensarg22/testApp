import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  image: any;
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
	  this.image = this.image.slice(this.image.indexOf(',')+1)
      console.log(this.image);
    };
    myReader.readAsDataURL(file);
  }
  testImage() {
    this.http.post('https://app1.idware.net/DriverLicenseParserRest.svc/ParseImage',
      JSON.stringify({authKey: '4498d969-aeb3-44c2-86bd-bb3ee8622db1', data: this.image}),
      {headers: {'Content-Type': 'text/json', Cache: 'no-cache', Access: '*'}})
      .subscribe((response) => {
      console.log(response);
      }
    );
  }
}
