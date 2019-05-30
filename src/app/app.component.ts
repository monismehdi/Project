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

  sortedDate: any;
  unSortedDate: any;
  formatDate: any;
  utcDate: any;
  localDate : any;
  asc = 1;

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
// Sorting
  //  Date.UTC(x.getUTCFullYear(),x.getUTCMonth(), x.getUTCDate(), x.getUTCHours(), x.getUTCMinutes(), x.getUTCSeconds());
  //  
  

  // sort desc
  sortDesc(){
    // this.extractDateCol(this.filteredData)
    console.log(this.filteredData[1]);
    this.asc =0;
    let arr : any;
    let sm : any;
    let next : any;
    let i = 0, j=0;
    let a : any;
    let b : any;
    let item1, item2, swapItem: any;

    let c, d, e, f : any;
    arr = this.filteredData[1];
    // console.log(arr['Time']);

    for(let data of this.filteredData){
      console.log('inside i');
      // debugger;
      
      console.log(data['Time']);
      console.log(i);
 
      a = data['Time'];
      b = new Date(a);
      sm =this.getUTC(b);
      console.log(sm);
      console.log(data);  // gives you full 1 row of data from filteredData 
      j=i+1;
      for(let col in this.filteredData){
        console.log("inside j");
        // debugger;
        // j = parseInt(col);
        
        console.log(j);
        console.log(`coverting filterData data at $[j]`);
        if(j <= 9){
          c = this.filteredData[j];
          d = c['Time'];
          e = new Date(d);
          f = this.getUTC(e);
          console.log("Value of f that is compared to sm")
          console.log(f)
          if(sm < f){
            console.log("condition sm > f is true inside inner if");
            // debugger;
            sm = f;
            item1 = this.filteredData[i];
            item2 = this.filteredData[j];
            swapItem = item1;
            this.filteredData[i] = item2;
            this.filteredData[j] = swapItem;
          } 
        }
        j++;
      }
      i++;
    }
    console.log(i);
    let test1 = this.filteredData[2];
    let test2 = this.filteredData[3];
    console.log("Before swap");
    console.log(test1);
    console.log(test2);

    let swap = test1;
    test1 = test2;
    test2 = swap;
    console.log("Before swap");
    console.log(test1);
    console.log(test2);
    
    // code for sorting  
  }



// Sort Asc
sortAsc(){
  // this.extractDateCol(this.filteredData)
  console.log(this.filteredData[1]);
  this.asc = 1;
  let arr : any;
  let sm : any;
  let next : any;
  let i = 0, j=0;
  let a : any;
  let b : any;
  let item1, item2, swapItem: any;

  let c, d, e, f : any;
  arr = this.filteredData[1];
  // console.log(arr['Time']);

  for(let data of this.filteredData){
    console.log('inside i');
    // debugger;
    
    console.log(data['Time']);
    console.log(i);

    a = data['Time'];
    b = new Date(a);
    sm =this.getUTC(b);
    console.log(sm);
    console.log(data);  // gives you full 1 row of data from filteredData 
    j=i+1;
    for(let col in this.filteredData){
      console.log("inside j");
      // debugger;
      // j = parseInt(col);
      
      console.log(j);
      console.log(`coverting filterData data at $[j]`);
      if(j <= 9){
        c = this.filteredData[j];
        d = c['Time'];
        e = new Date(d);
        f = this.getUTC(e);
        console.log("Value of f that is compared to sm")
        console.log(f)
        if(sm > f){
          console.log("condition sm > f is true inside inner if");
          // debugger;
          sm = f;
          item1 = this.filteredData[i];
          item2 = this.filteredData[j];
          swapItem = item1;
          this.filteredData[i] = item2;
          this.filteredData[j] = swapItem;
        } 
      }
      j++;
    }
    i++;
  }
  console.log(i);
  let test1 = this.filteredData[2];
  let test2 = this.filteredData[3];
  console.log("Before swap");
  console.log(test1);
  console.log(test2);

  let swap = test1;
  test1 = test2;
  test2 = swap;
  console.log("Before swap");
  console.log(test1);
  console.log(test2);
  
  // code for sorting  
}



  extractDateCol(date){
    for(let dt of date){
      this.unSortedDate = dt['Time'];
      console.log(dt['Time']);
    }
    this.makeDateFormat(this.unSortedDate);
    this.getUTC(this.formatDate);
    // use sort date function here 
    this.sortUTC(this.utcDate);

  }
  makeDateFormat(date){
    for(let dt of date){
      this.formatDate = new Date(dt);
    }
    return this.formatDate;
  }

  
  getUTC(dt){
    this.utcDate = Date.UTC(dt.getUTCFullYear(),dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds());
    return this.utcDate;
  }

  getLocal(dt){
    this.localDate = new Date(dt).toLocaleString();
    return this.localDate;
  }

  sortUTC(date){
    date.sort();
  }

}


// sorting tech    we have data in form of Time(12/09/2018 11:35), Side(Buy), OrderType(LMT), .... ---> 
// take whole data -> sort time only -> 1st convert to UTC and then compare it after that -> convert to local and push back the whole data.