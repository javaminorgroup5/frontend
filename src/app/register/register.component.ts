import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../recipe/model/user';


interface FormData {
  email: string;
  password: string;
  profileName: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  selectedFile: any;
  registerForm;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      profileName: '',
    });
  }

  ngOnInit(): void {}

  async onSubmit(formData: FormData): Promise<void> {

    const user: User = {
      username : formData.email,
      password : formData.password,
      role: 'COMMUNITY_MANAGER',
      profile: {
        profileName : formData.profileName
      }
    };

    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    const userObjectString = JSON.stringify(user);
    const userBlob = new Blob([userObjectString], { type: 'application/json'});
    uploadImageData.append('user', userBlob);
    try {
      await this.authService.register(uploadImageData);
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
      }
  }

  public onFileChanged(event: any): void {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
  }

}
