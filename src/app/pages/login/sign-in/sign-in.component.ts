import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  title = 'SIGN IN';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public dialog: MatDialog,
              private authService: AuthService
    ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSignIn(entryUser: User) {
    this.authService.login(entryUser).subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      const user = this.authService.user;
      this.router.navigate(['/home']);
      Swal.fire('Login', `Hello ${user.username}, you have successfully logged in!`, 'success');
    }, err => {
      if (err.status == 400) {
        Swal.fire('Error Login', 'Incorrect username or password!', 'error');
      }
    })
  }

}
