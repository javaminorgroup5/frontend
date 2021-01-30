import {Component, OnInit} from '@angular/core';
import {FeedService} from '../service/feed.service';
import {Message} from '../model/message';
import {ProfileService} from '../service/profile.service';
import {LikeService} from '../service/like.service';
import {CommonService} from '../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-feed-profile',
  templateUrl: './feed-profile.component.html',
  styleUrls: ['./feed-profile.component.css']
})
export class FeedProfileComponent implements OnInit {

  feed: Message[] = [];
  userId: any;
  timer: any;

  constructor(private feedService: FeedService,
              private profileService: ProfileService,
              private likeService: LikeService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    this.feedService.getFeedByUser(this.userId).then((value) => {
      this.feed = value;
    });
  }

  async loadFeed(userId: number): Promise<Message[]> {
    return this.feedService.getFeedByUser(userId);
  }

  recheckFeed(): any {
    this.router.navigate([this.router.url]);
  }
}
