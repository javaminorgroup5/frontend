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
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    const id = this.activatedRoute.snapshot.paramMap.get('groupId');
    if (id && this.userId) {
      this.groupId = this.commonService.NumberConverter(id);
      this.loadGroup(this.groupId);
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
        image: {
          type: result.image.type,
          name: result.image.name,
          picByte: result.image.picByte
        }
      };
      this.group = group;
    }
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
            if (this.activeModal) {
              this.activeModal.close();
            }
            // alert(`You created ${formData.groupName}!`);
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
