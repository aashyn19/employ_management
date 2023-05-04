import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DBOperation } from '../_helpers/db-operation';
import { MustMatch } from '../_helpers/must-match.validators';
import { UserService } from '../_helpers/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  buttonText: string = 'submit';
  dbops: DBOperation;
  userId: number;

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(parama => {
      this.userId = parama['userId'];
    });
  }

  ngOnInit(): void {
    this.setFormState();

    if (this.userId && this.userId != null) {
      this.getUserById(this.userId);
    }
  }

  setFormState() {
    this.buttonText = 'Submit';
    this.dbops = DBOperation.create;

    // this.registerForm = this._fb.group({
    //   id: [0],
    //   title: ['', Validators.required],
    //   firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
    //   lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    //   dob: ['', Validators.compose([Validators.required, Validators.pattern((/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/))])],
    //   password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    //   confirmPassword: ['', Validators.required],
    //   acceptTerms: [false, Validators.requiredTrue]
    // }, {
    //   validators: MustMatch('password', 'confirmPassword')
    // });


    this.registerForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern((/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/))])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmPassword: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    },
      MustMatch('password', 'confirmPassword')
    );
  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    switch (this.dbops) {
      case DBOperation.create:
        this._userService.addUser(this.registerForm.value).subscribe(res => {
          this._toastr.success('User Added !!', 'User Registeration');
          this.onCancel();
        });
        break;

      case DBOperation.update:
        this._userService.updateUser(this.registerForm.value).subscribe(res => {
          this._toastr.success('User Updated !!', 'User Registeration');
          this.onCancel();
        });
        break;
    }
  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText = 'Submit';
    this.dbops = DBOperation.create;
    this.submitted = false;
    this.router.navigate(['/list-user'])
  }

  getUserById(id: number) {
    this._userService.getUser(id).subscribe(res => {
      this.buttonText = 'Update';
      this.dbops = DBOperation.update;

      this.registerForm.patchValue(res);

      this.registerForm.get('password').setValue('');
      this.registerForm.get('confirmPassword').setValue('');
      this.registerForm.get('acceptTerms').setValue(false);

    })
  }

}
