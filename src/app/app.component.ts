import { Component } from '@angular/core';
import { BlatterService } from './blatter.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';

  dataColumn : any;
  dataSource : any;

  constructor(private blatterService : BlatterService) {}

  ngOnInit(){
    this.getColumn();
    this.getData();
  }

  getColumn(){
    this.blatterService.getColumn().subscribe((data: Array<object>) => {
      this.dataColumn = data;
      console.log(data);
    })
  }

  getData(){
    this.blatterService.getData().subscribe((data: Array<object>) => {
      this.dataSource = data;
      console.log(data);
      
    }, 
      error => console.log('Error fetching values')
    );
  }

}
