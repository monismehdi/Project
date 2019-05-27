import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { BlatterService } from './blatter.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';

  public searchText : String;
  
  
  public searchString: String;
  dataColumn : any;
  dataSource : any;

  colName : String;

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
