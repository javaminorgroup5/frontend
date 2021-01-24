import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import {Router} from '@angular/router';

interface UpdateProfileFormData {
  profileName: string;
}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm;
  selectedFile: any;
  imageURL = '';

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateProfileForm = this.formBuilder.group({
      profileName: ''
    });
  }

  async ngOnInit(): Promise<void> {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      const id = parseInt(userId, 0);
      const profile: UpdateProfileFormData = await this.profileService.getProfile(id);
      this.updateProfileForm = this.formBuilder.group({
        profileName: profile.profileName
      });
    }
  }

  async onSubmit(updateProfileFormData: UpdateProfileFormData): Promise<void> {
    let profile = {};
    if (updateProfileFormData.profileName) {
      profile = {
          profileName: updateProfileFormData.profileName
      };
    }
    const uploadImageData = new FormData();
    if (this.selectedFile) {
      uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    }
    const profileObjectString = JSON.stringify(profile);
    const profileBlob = new Blob([profileObjectString], { type: 'application/json'});
    uploadImageData.append('profile', profileBlob);
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      const id = parseInt(userId, 0);
      try {
        await this.profileService.updateProfile(id, uploadImageData);
        await this.router.navigate(['me']);
      } catch (error) {
        console.error(error);
      }
      location.reload();
    }
  }

  public cancelUpdate(): void {
    window.location.reload();
  }

  public onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
