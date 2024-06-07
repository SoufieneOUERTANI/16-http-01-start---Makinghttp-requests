import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private httpClient : HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: Post) {
    console.log(postData);
    this.httpClient.post('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
    // The post request is sent only when you subscribe
    .subscribe(responseData => console.log(responseData)) 
    // You don't need to manage the unsubscription as it finishs as soon as the request finishs, 
    // and the observable is provided by Angular, so the unsubscription is handled by Angular
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.httpClient.get('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    .pipe(map((responseData :{[key :string]:any}) => { 
      const postArray : Post[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postArray.push({...responseData[key], id :key})
        }
      }
      return postArray
    } ))
    .subscribe(responseData => console.log(responseData))
  }
}
