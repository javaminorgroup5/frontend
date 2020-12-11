import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: any[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getGroups().then((value) => {
      this.groups = value;
    });
  }
}
