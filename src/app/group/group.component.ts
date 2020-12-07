import { Component, OnInit } from '@angular/core';
import { GroupService} from "../group.service";

interface FormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {

  group: any;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    const groupId = "1";

    if (groupId) {
      this.groupService.getGroup(parseInt(groupId, 2)).then((value) => {
        this.group = value;
      });
    }
  }

}
