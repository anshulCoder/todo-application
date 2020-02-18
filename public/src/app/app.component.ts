import { Component } from '@angular/core';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  alertText = '';
  	alertType = '';
  	showAlert = false;
  	isLoading = false;

  	constructor(private sharingService: SharingService) {

  	}
  

  	ngOnInit() {

	    this.sharingService.loadingEmit.subscribe(
	      (data) => {
	        if (data.loading === true) {
	          this.isLoading = true;
	        } else {
	          this.isLoading = false;
	        }
	      }
	    );

	    this.sharingService.alertEmit.subscribe(
	      (data) => {
	        if (data.showAlert === true) {
	          this.showAlert = true;
	          this.alertType = data.aType;
	          this.alertText = data.aText;
	          this.fadeAlertAway();
	        }
	      }
	    );
  	}

  fadeAlertAway() {
    setTimeout(() => {
      this.showAlert = false;
    }, 10000);
  }
}
