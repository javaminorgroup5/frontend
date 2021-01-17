import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../service/group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupComponent } from '../group/group.component';
import {CommonService} from '../service/common.service';
import {Group} from '../model/group';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group | undefined;
  userId?: number;
  alert?: Alert;
  groupId = -1;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router,
    private modalService: NgbModal,
    private commonService: CommonService
  ) { }

  close(): void {
    this.alert = undefined;
  }

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId') || '', undefined);
    this.route.paramMap.subscribe(params => {
      this.groupService.getGroup(parseInt(params.get('groupId') || '', undefined)).then((value) => {
        this.group = {
          id: value.id,
          userId: value.userId,
          groupName: value.groupName,
          description: value.description,
          profiles: value.profiles,
          image: {
            type: value.image.type,
            name: value.image.name,
            picByte: 'data:image/jpeg;base64,' + value.image?.picByte
          }
        };
        this.route.queryParamMap.subscribe(queryParams => {
          const inviteToken = queryParams.get('inviteToken');
          if (inviteToken && this.group) {
            this.groupService.joinGroup(this.group.id, inviteToken)
              .then(() => {
                this.alert = {
                  type: 'success',
                  message: 'Je bent nu lid van deze groep!',
                };
              });
          }
        });
      });
    });
    this.route.paramMap.subscribe(params => {
      this.groupId = this.commonService.NumberConverter(params.get('groupId') || '');
    });
    this.startFeed(this.groupId).then(r => console.log(r));
  }

  async startFeed(groupId: number): Promise<void> {
    const group: Group = await this.groupService.getGroup(groupId);
    this.commonService.sendGroup(group);
  }

  generateGroupInvite(): void {
    if (!confirm('Weet je zeker dat je een invite wil genereren?')) {
      return;
    }
    if (this.group) {
      const groupId = this.group.id;
      this.groupService.generateGroupInvite(groupId).then(({ token }) => {
        this.alert = {
          type: 'success',
          message: `Uitnodigingslink gegenereerd: http://localhost:4200/group/${groupId}?inviteToken=${token}`,
        };
      });
    }
  }

  deleteGroup(): void {
    this.groupService.deleteGroup(this.group?.id).then(() => {
      this.router.navigate(['group-list']);
    });
  }

  handleEditing(): void {
    const modalRef = this.modalService.open(GroupComponent, { centered: true });
    modalRef.componentInstance.groupId = this.groupId;
  }

  editGroup(id: any): void {
    this.groupId = id;
    this.handleEditing();
  }
}
