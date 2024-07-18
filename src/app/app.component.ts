import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularspringfront';

  isClientLoggedIn:boolean = this.userStorageService.isClientLoggedIn();
  isCompanyLoggedIn:boolean = this.userStorageService.isCompanyLoggedIn();

  constructor(private router: Router, private userStorageService: UserStorageService){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isClientLoggedIn = this.userStorageService.isClientLoggedIn();
      this.isCompanyLoggedIn = this.userStorageService.isCompanyLoggedIn();
    })
  }

  logout(){
    this.userStorageService.signOut();
    this.router.navigateByUrl('login')
  }
}
