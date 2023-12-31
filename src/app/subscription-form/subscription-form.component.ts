import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;
  constructor(
    private afs: AngularFirestore,
    private subService: SubscribersService
  ) {}
  ngOnInit(): void {}
  onSubmit(formVal) {
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email,
    };

    this.subService.checkSubs(subData.email).subscribe((val) => {
      console.log(val);
      if (val.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      } else {
        this.isEmailError = true;
      }
    });
  }
}
