import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';

export type Group = {
  id: number
  userId: number
  name: string
  description: string
  profiles: any[]
};

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  userId: string;

  constructor(private groupService: GroupService) {
    this.userId = '';
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    this.groupService.getGroups().then((value) => {
      this.groups = value;
    });
  }

  joinGroup(group: Group): void {
    this.groupService.joinGroup(group.id).then(() => {
      const groups = this.groups;
      const indexGroup = groups.findIndex((value) => value.id === group.id);

      if (groups[indexGroup].profiles) {
        groups[indexGroup].profiles.push({ id: this.userId });
      } else {
        groups[indexGroup].profiles = [{ id: this.userId }];
      }

      alert(`You joined ${group.name}!`);
      this.groups = groups;
    });
  }
}
