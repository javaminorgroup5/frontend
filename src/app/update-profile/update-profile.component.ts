import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  selectedFile: any;
  imageURL = '';

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
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
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
