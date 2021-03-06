import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   value => console.log(value);
    // );
    this.signupForm.statusChanges.subscribe(
      value => console.log(value);
    );

    this.defaultValues = {
      'userData': {
        'username': 'John Doe',
        'email': 'jd@example.com'
      },
      'gender': 'female',
      'hobbies': []
    };
    this.signupForm.setValue(this.defaultValues);

    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna Doe',
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);

    // Don't want to clear radio buttons?
    // Keep in mind: You can pass an object to reset() to reset to specific values!
    this.signupForm.reset(this.defaultValues);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden': true
      };

      return null; // pass nothing if validation is successful
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
          return;
        }
        resolve(null);
      }, 1500);
    });

    return promise;
  }
}
