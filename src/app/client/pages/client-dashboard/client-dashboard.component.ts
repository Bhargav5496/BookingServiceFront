import { Component } from '@angular/core';
import { ClientService } from '../../services/client-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {
  ads:any = [];
  validateForms!: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder){}

  getAllAds(){
    this.clientService.getAllAds().subscribe(res => {
      this.ads = res;
    })
  }

  ngOnInit(){
    this.validateForms = this.fb.group({
      service: [null, [Validators.required]]
    })
    this.getAllAds();
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }

  searchAdByName(){
    this.clientService.searchAllAdsByServiceName(this.validateForms.get('service')?.value).subscribe(res=>{
      this.ads = res;
    })
  }
}
