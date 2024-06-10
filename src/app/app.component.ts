import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Post[]= [];
  isFetching = false;

  constructor(private httpClient : HttpClient, private postService : PostService ) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(responseData => {
        console.log(responseData);
        this.loadedPosts = responseData;
        this.isFetching = false;
      })
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePoste(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(responseData => {
          console.log(responseData);
          this.loadedPosts = responseData;
          this.isFetching = false;
        })
  }

  onClearPosts() {
    // Send Http request
  }
}
