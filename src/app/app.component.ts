import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts : Post[]= [];
  isFetching = false;
  error = null;
  private errorSub : Subscription;

  constructor(private httpClient : HttpClient, private postService : PostService ) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMesssage => this.error= errorMesssage);
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(responseData => {
        console.log(responseData);
        this.loadedPosts = responseData;
        this.isFetching = false;
      }, error => {
        this.error = error.message;
        console.log(error);
      }
    )
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
        }, error => {
          this.error = error.message;
          console.log(error);
        }
      )
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts=[]
      }
    );
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
