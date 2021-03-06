import {Component, OnInit } from '@angular/core';
import { GroupService} from '../../service/group.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { Group } from '../../model/group';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupCategory, GroupPrivacy } from '../../model/group';
import { CategoryService } from 'src/app/service/category.service';

interface FormData {
  groupCategoryId: string;
  groupPrivacy: GroupPrivacy;
  groupName: string;
  groupDescription: string;
}

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css'],
})
export class GroupComponent implements OnInit {

  categories: GroupCategory[] = [];
  userId: string;
  groupCreateForm;
  imageURL = '';
  selectedFile: any;
  groupId = -1;
  group: Group | undefined;
  titleAlert = false;
  privacyAlert = false;
  categoryAlert = false;
  descriptionAlert = false;
  imageAlert = false;

  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    public activeModal: NgbActiveModal
  ) {
    this.groupCreateForm = this.formBuilder.group({
      groupCategoryId: '',
      groupPrivacy: '',
      groupName: '',
      groupDescription: ''
    });
    this.userId = '';
    this.activeModal = activeModal;
    this.group = {
      id: 0,
      groupCategory: { categoryName: '', id: 0 },
      groupPrivacy: GroupPrivacy.OPEN,
      groupName: '',
      description: '',
      profiles: [],
      userId: 0,
      image: {
        name: '',
        type: '',
        picByte: ''
      },
      isEnrolled: true
    };

  }

  ngOnInit(): void {
    this.categoryService.getCategories().then((categories) => {
      categories.forEach( (category: GroupCategory) => {
        if (category.active) {
          this.categories.push(category);
        }
      });
    });
    this.userId = sessionStorage.getItem('userId') || '';
    if (this.group && this.userId && this.groupId > 0) {
      this.loadGroup(this.groupId);
    }
  }

  async loadGroup(groupId: number): Promise<any> {
    const result: Group = await this.groupService.getGroup(groupId);
    if (result) {
      const group: Group = {
        id: result.id,
        groupCategory: result.groupCategory,
        groupPrivacy: result.groupPrivacy,
        groupName: result.groupName,
        description: result.description,
        profiles: result.profiles,
        userId: result.userId,
        image: result.image,
        isEnrolled: true
      };
      this.group = group;
    }
  }

  checkGroupValues(formData: FormData): boolean {
    this.privacyAlert = false;
    this.titleAlert = false;
    this.descriptionAlert = false;
    this.imageAlert = false;
    if (!formData.groupPrivacy) {
      this.privacyAlert = true;
      return false;
    }
    if (!formData.groupCategoryId) {
      this.categoryAlert = true;
      return false;
    }
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
        groupPrivacy: formData.groupPrivacy,
        groupName: formData.groupName,
        description: formData.groupDescription
      };
      const uploadImageData = new FormData();

      if (this.selectedFile) {
        uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
      }
      const groupObjectString = JSON.stringify(group);

      const groupBlob = new Blob([groupObjectString], { type: 'application/json' });
      uploadImageData.append('group', groupBlob);
      uploadImageData.append('groupCategoryId', new Blob([formData.groupCategoryId], { type: 'application/json' }));
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
          if (typeof (result) === 'number') {
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
