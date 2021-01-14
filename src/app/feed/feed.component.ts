import { Component, OnInit } from '@angular/core';
import {FeedService} from './service/feed.service';
import {Message} from './modal/message';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed: Message[] = [];

  constructor(private feesService: FeedService) { }

  ngOnInit(): void {
    this.loadFeed().then(result => {
      for (const r of result) {
        r.image.picByte = 'data:image/jpeg;base64,' + r.image.picByte;
      }
      this.feed = result;
      console.log(result);
    });
  }

  async loadFeed(): Promise<Message[]> {
    return this.feesService.getFeedByGroup(6);
  }

}
