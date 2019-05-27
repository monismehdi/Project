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

  // cVal:any = [];
  displayedColumns  :  string[] = ['Time', 'Side', 'OrderType', 'CcPair', 'Price', 'Ammount', 'Status'];
  // dataSource = [];
  dataSource : any;

  constructor(private blatterService : BlatterService) {}

  ngOnInit(){
    this.getData();
    this.blatterService.test();
    console.log("testing...")
    // this.fetchBlatterColumnValues();
  }
  //   fetchBlatterColumnValues(){
  //     this.cVal = [];
  //     this.blatterService.fetchBlatterColumnValues().subscribe((data: {}) => {
  //     this.cVal = data;
  //     console.log(data);
  //   })
  // }
  getData(){
    this.blatterService.getData().subscribe((data: Array<object>) => {
      this.dataSource = data;
      console.log(data);
      
    }, 
      error => console.log('Error fetching values')
    );
  }

}
