import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  bookingId: number = this.activatedRoute.snapshot.params['id'];
  validateForm!: FormGroup;

  constructor(private router:Router, 
    private clientService: ClientService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userStorageService: UserStorageService,
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      rating: [null, Validators.required],
      review: [null, Validators.required],
    })
  }

  postReview(){
    const reviewDto = {
      rating: this.validateForm.get('rating').value,
      review: this.validateForm.get('review').value,
      userId: this.userStorageService.getUserId(),
      bookingId: this.bookingId,
    }

    this.clientService.postReview(reviewDto).subscribe(res=>{
      this.notification.success(
        'SUCCESS',
        `Review posted successfully`,
        { nzDuration: 5000}
      )
      this.router.navigateByUrl('/client/bookings');
    }, error => {
      this.notification.error(
        'FAILURE',
        `${error.message }`,
        { nzDuration: 5000}
      )
    })
  }
}
