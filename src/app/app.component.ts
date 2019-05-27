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

  filteredData : any;

  colName : String;
  ccyPairFilter: String;
  statusFilter: String;

  constructor(private blatterService : BlatterService) {}

  ngOnInit(){
    this.getColumn();
    this.getData(); 
  }

  getColumn(){
    this.blatterService.getColumn().subscribe((data: Array<object>) => {
      this.dataColumn = data;
    })
  }



  filterGrid(){
    if(this.isEmpty(this.ccyPairFilter) && this.isEmpty(this.statusFilter)){
      this.resetGrid();
      return;
    }

    this.filteredData = this.dataSource;
    if(!this.isEmpty(this.ccyPairFilter)){
      this.filteredData = this.filterForCcyPair(this.filteredData);
    }    
    
    if(!this.isEmpty(this.statusFilter)){
      this.filteredData = this.filterForStatus(this.filteredData);
    }

  }
  
  resetGrid(){
    this.filteredData = this.dataSource;
  }
 

  filterForCcyPair(orders){
    let filteredOrders = [];
    for(let order of orders){
      if(order['CcyPair'].includes(this.ccyPairFilter)){
        filteredOrders.push(order);
      }
    }
    return filteredOrders;
  }

  filterForStatus(orders){
    let filteredOrders = [];
    for(let order of orders){
      if(order['Status'].includes(this.statusFilter) ){
        filteredOrders.push(order);
      }
    }
    return filteredOrders;
  }
  
  
  getData(){
    this.blatterService.getData().subscribe((data: Array<object>) => {
      this.dataSource = data;
      this.filteredData = data;
    }, 
      error => console.log('Error fetching values')
    );
  }

  isEmpty(value: any){
    return value == '' || value == undefined;
  }

}
