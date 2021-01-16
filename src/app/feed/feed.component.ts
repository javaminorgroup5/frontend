import { Component, OnInit } from '@angular/core';
import {FeedService} from '../service/feed.service';
import {Message} from '../model/message';
import {ProfileService} from '../service/profile.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed: Message[] = [];

  constructor(private feedService: FeedService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadFeed().then(async result => {
      for (const r of result) {
        r.image.picByte = 'data:image/jpeg;base64,' + r.image.picByte;
        this.loadProfileImage(r.userId).then(profile => {
          r.profileImage = {
            picByte: 'data:image/jpeg;base64,' + profile.image.picByte,
            type: profile.image.type,
            name: profile.image.name
          };
        });
      }
      this.feed = result;
    });

  }

  async loadFeed(): Promise<Message[]> {
    return this.feedService.getFeedByGroup(6);
  }

  async loadProfileImage(id: number): Promise<any> {
    return this.profileService.getProfile(id);
  }
}
