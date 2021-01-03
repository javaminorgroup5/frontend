import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group-list/group-list.component';
import { GroupService } from '../group.service';

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
  group?: Group;
  userId?: number;
  alert?: Alert;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router
  ) { }
  
  close() {
    this.alert = undefined;
  }

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId') || '', undefined);
    this.route.paramMap.subscribe(params => {
      this.groupService.getGroup(parseInt(params.get('groupId') || '', undefined)).then((value) => {
        this.group = value;
        this.route.queryParamMap.subscribe(queryParams => {
          const inviteToken = queryParams.get('inviteToken');
    
          if (inviteToken && this.group) {
            this.groupService.joinGroup(this.group.id, inviteToken)
            .then((huts) => {
              console.log(huts);
            })
          }
        });
      });
    });
  }

  generateGroupInvite(): void {
    if (this.group) {
      const groupId = this.group.id;
      this.groupService.generateGroupInvite(groupId).then((result) => {
        this.alert = {
          type: 'success',
          message: `Uitnodigingslink gegenereerd: http://localhost:4200/group/${groupId}?inviteToken=${result}`,
        };
      });
    }
  }

  deleteGroup(): void {
    this.groupService.deleteGroup(this.group?.id).then(() => {
      alert(`${this.group?.name} verwijderd.`);
      this.router.navigate(['group-list']);
    });
  }
}
