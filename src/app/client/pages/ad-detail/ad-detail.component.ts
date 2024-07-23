import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent {
  
  adId: number = this.activatedRoute.snapshot.params['adId'];
  avtarUrl: any;
  ad:any;
  reviews: any;
  validateForm!: FormGroup;
  
  constructor(private clientService: ClientService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private userStorageService: UserStorageService,
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      bookingDate: [null, [Validators.required]]
    })
    this.getAdDetailsByAdId();
  }

  getAdDetailsByAdId(){
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res=>{
      this.avtarUrl = "data:image/jpeg;base64," + res.adDto.returnedImg;
      this.ad = res.adDto;
      this.reviews = res.reviewDtoList;
    })
  }

  bookService(){
    const bookServiceDto = {
      bookingDate: this.validateForm.get(['bookingDate']).value,
      adId: this.adId,
      userId: this.userStorageService.getUserId()
    }

    this.clientService.bookService(bookServiceDto).subscribe(res=>{
      this.notification.success(
        'SUCCESS',
        `Request posted successfully`,
        {nzDuration: 5000}
      );
      this.router.navigateByUrl('client/bookings');
    })
  }
}
