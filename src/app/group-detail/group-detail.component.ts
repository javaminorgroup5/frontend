import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group-list/group-list.component';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group?: Group;
  userId?: number;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router
  ) { }

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
          groupImage: {
            type: value.groupImage.type,
            name: value.groupImage.name,
            picByte: 'data:image/jpeg;base64,' + value.groupImage?.picByte
          }
        };
      });
    });
  }

  deleteGroup(): void {
    this.groupService.deleteGroup(this.group?.id).then(() => {
      alert(`${this.group?.groupName} verwijderd.`);
      this.router.navigate(['group-list']);
    });
  }

  editGroup(): void {

  }
}
