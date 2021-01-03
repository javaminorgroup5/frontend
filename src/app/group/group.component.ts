import { Component, OnInit } from '@angular/core';
import { GroupService} from '../group.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Group} from "../group-list/group-list.component";

interface FormData {
  groupName: string;
  groupDescription: string;
}

interface GroupImage {
  type: any;
  name: any;
  picByte: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {

  group?: Group;

  userId: any;
  groupCreateForm;
  imageURL = '';
  selectedFile: any;

  constructor(
      private groupService: GroupService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
  ) {
    this.group = {
      id: 0,
      userId: 0,
      name: '',
      description: '',
      profiles: []
    };
    this.groupCreateForm = this.formBuilder.group({
      groupName: '',
      groupDescription: ''
    });
    this.userId = '';
  }

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId') || '', undefined);
    this.route.paramMap.subscribe(params => {
      if(params.get('groupId')) {
        this.groupService.getGroup(parseInt(params.get('groupId') || '', undefined)).then((value) => {
          this.group = value;
          console.log(this.group);
        });
      }
    });
  }

  async onSubmit(formData: FormData): Promise<void> {


    if(this.group?.id != 0 && this.group?.id) {
      if (formData.groupName != '' && this.group?.name) {
        this.group.name = formData.groupName;
      }

      if (formData.groupDescription != '' && this.group?.description) {
        this.group.description = formData.groupDescription;
      }

      try {
        const result = await this.groupService.editGroup(
            this.group.id,
            this.userId,
            this.group,
        );
      } catch {

      }
    } else {
      try {
        const result = await this.groupService.create(
            formData.groupName,
            formData.groupDescription
        );

        if (result) {
          alert(`You created ${formData.groupName}!`);
          console.log(result);
          this.router.navigate(['group/' + result]);
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
