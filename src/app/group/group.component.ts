import { Component, OnInit } from '@angular/core';
import { GroupService} from '../group.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

interface FormData {
  groupName: string;
  groupDescription: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {

  userId: string;
  groupCreateForm;
  imageURL = '';
  selectedFile: any;

  constructor(
      private groupService: GroupService,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.groupCreateForm = this.formBuilder.group({
      groupName: '',
      groupDescription: ''
    });
    this.userId = '';
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
  }

  async onSubmit(formData: FormData): Promise<void> {
      const group = {
        name: formData.groupName,
        description: formData.groupDescription
      };
      const uploadGroupData = new FormData();
      uploadGroupData.append('file', this.selectedFile, this.selectedFile.name);
      const groupObjectString = JSON.stringify(group);
      const groupBlob = new Blob([groupObjectString], { type: 'application/json'});
      uploadGroupData.append('group', groupBlob);
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const id = parseInt(userId, 0);
        try {
          const result = await this.groupService.create(id, uploadGroupData);
          if (result) {
            alert(`You created ${formData.groupName}!`);
            console.log(result);
            await this.router.navigate(['group/' + result]);
          }
        } catch (error) {
          console.error(error);
        }
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
