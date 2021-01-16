import { Component, OnInit } from '@angular/core';
import {FeedService} from '../service/feed.service';
import {Message} from '../model/message';
import {ProfileService} from '../service/profile.service';
import {LikeService} from '../service/like.service';
import {Like} from '../model/Like';
import {CommonService} from '../service/common.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed: Message[] = [];

  constructor(private feedService: FeedService,
              private profileService: ProfileService,
              private likeService: LikeService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.loadFeed().then(async result => {
      for (const r of result) {
        r.image.picByte = 'data:image/jpeg;base64,' + r.image.picByte;
        this.getLikes(r.id).then(likes => {
          r.likes = likes;
          console.log(likes);
        });
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

  async submitLike(messageId: number, recipeId: number): Promise<any> {
    const userIdString = sessionStorage.getItem('userId');
    if (userIdString) {
      const userId = this.commonService.NumberConverter(userIdString);
      const like: Like = {
        messageId,
        userId,
        recipeId,
      };
      this.likeService.toggleLike(like).then(r => console.log(r));
    }
  }

  async getLikes(messageId: number): Promise<Like[]> {
    return this.likeService.getLikeByMessageId(messageId);
  }
}
