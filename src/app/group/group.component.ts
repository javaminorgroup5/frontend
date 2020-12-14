import { Component, OnInit } from '@angular/core';
import { GroupService} from "../group.service";
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

interface FormData {
  groupName: string,
  groupDescription: string,
  groupPicture: string
}

@Component({
  selector: 'app-login',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {

  userId: string;
  groupCreateForm;

  constructor(
      private groupService: GroupService,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.groupCreateForm = this.formBuilder.group({
      groupName: '',
      groupPicture: '',
      groupDescription: ''
    });
    this.userId = '';
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
  }

  async onSubmit(formData: FormData): Promise<void> {
    console.log(formData);
    try {
      const result = await this.groupService.create(
          formData.groupName,
          formData.groupDescription,
          formData.groupPicture
      );

      if (result) {
        alert(`You created ${formData.groupName}!`)
        console.log(result);
        //this.router.navigate(['group/' + result]);
      }
    } catch (error) {
      console.error(error);
    }
  }

}
