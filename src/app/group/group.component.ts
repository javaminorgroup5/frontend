import { Component, OnInit } from '@angular/core';
import { GroupService} from '../group.service';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../common.service';
import {Group} from '../group-list/group-list.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

interface FormData {
  groupName: string;
  groupDescription: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {

  userId: string;
  groupCreateForm;
  imageURL = '';
  selectedFile: any;
  groupId = -1;
  group: Group | undefined;
  titleAlert = false;
  descriptionAlert = false;
  imageAlert = false;

  constructor(
      private groupService: GroupService,
      private formBuilder: FormBuilder,
      private router: Router,
      private commonService: CommonService,
      private activatedRoute: ActivatedRoute,
      public activeModal: NgbActiveModal
  ) {
    this.groupCreateForm = this.formBuilder.group({
      groupName: '',
      groupDescription: ''
    });
    this.userId = '';
    this.activeModal = activeModal;

    this.group = {
      id: 0,
      groupName: '',
      description: '',
      profiles: [],
      userId: 0,
      groupImage: {
        name: '',
        type: '',
        picByte: ''
      },
    };

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    if (this.group && this.userId && this.groupId > 0) {
      this.loadGroup(this.groupId);
      console.log(this.group);
      console.log(this.groupId);
    }
  }

  async loadGroup(groupId: number): Promise<any> {
    const result: Group = await this.groupService.getGroup(groupId);
    if (result) {
      const group: Group = {
        id: result.id,
        groupName: result.groupName,
        description: result.description,
        profiles: result.profiles,
        userId: result.userId,
        groupImage: result.groupImage,
      };
      this.group = group;
    }
  }

  checkGroupValues(formData: FormData): boolean {
    this.titleAlert = false;
    this.descriptionAlert = false;
    this.imageAlert = false;
    if (!formData.groupName) {
      this.titleAlert = true;
      return false;
    }
    if (!formData.groupDescription) {
      this.descriptionAlert = true;
      return false;
    }
    if (!this.selectedFile) {
      this.imageAlert = true;
      return false;
    }
    return true;
  }

  async onSubmit(formData: FormData): Promise<void> {

    if (this.groupId < 0 && !this.checkGroupValues(formData)) {
      return;
    }

    try {
      const group = {
        groupName: formData.groupName,
        description: formData.groupDescription
      };

      const uploadImageData = new FormData();
      if (this.selectedFile) {
        uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
      }

      const groupObjectString = JSON.stringify(group);

      const groupBlob = new Blob([groupObjectString], {type: 'application/json'});
      uploadImageData.append('group', groupBlob);
      const userId = sessionStorage.getItem('userId');

      if (userId) {
        let result: string;
        const id = parseInt(userId, 0);
        if (this.groupId >= 0) {
          result = await this.groupService.updateGroup(this.groupId, id, uploadImageData);
        } else {
          result = await this.groupService.create(id, uploadImageData);
        }
        if (result) {
          console.log(result);
          if (typeof(result) === 'number') {
            await this.router.navigate(['group/' + result]);
          }
          location.reload();
        }
      }
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
