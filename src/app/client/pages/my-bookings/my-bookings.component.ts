import { Component } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';
import { ClientService } from '../../services/client-service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  bookedServices: any;

  constructor(private userStorageService: UserStorageService,
    private clientService: ClientService
  ){}

  ngOnInit(){
    this.getMyBookings();
  }
  
  getMyBookings(){
    const userId = this.userStorageService.getUserId();
    this.clientService.getMyBookings().subscribe(res=>{
      this.bookedServices = res;
    })
  }

}
