import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private groupService: GroupService
  ) {
    this.userId;
  }

  ngOnInit() {
    this.userId = parseInt(sessionStorage.getItem('userId') || '');
    this.route.paramMap.subscribe(params => {
      this.groupService.getGroup(parseInt(params.get('groupId') || '')).then((value) => {
        this.group = value;
      });
    });
  }

}
