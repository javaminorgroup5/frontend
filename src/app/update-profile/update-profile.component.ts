import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

interface UpdateProfileFormData {
  profileName: string;
  profilePicture: string;
}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm;

  constructor(
      private profileService: ProfileService,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.updateProfileForm = this.formBuilder.group({
      profileName: '',
      profilePicture: ''
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(updateProfileFormData: UpdateProfileFormData): Promise<void> {
    try {
   await this.profileService.updateProfile(
       updateProfileFormData.profileName,
       updateProfileFormData.profilePicture,
       );
    }
    catch (error) {
      console.error(error);
    }
  }
}
