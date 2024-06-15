import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, map, throwError } from "rxjs";
import { Post } from "src/app/post.model";

@Injectable({providedIn:'root'})
export class PostService {
    error = new Subject<string>;

    constructor(private httpClient : HttpClient){}

    createAndStorePoste(title : string, content : string){
        const postData : Post = {title : title, content : content}
        console.log(postData);
        this.httpClient.post<{name : string}>('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
        // The post request is sent only when you subscribe
        .subscribe(responseData => console.log(responseData), 
        error => {
          this.error.next(error.message)
        }
      ) 
        // You don't need to manage the unsubscription as it finishs as soon as the request finishs, 
        // and the observable is provided by Angular, so the unsubscription is handled by Angular
    }

    fetchPosts(){
      let searchParams = new HttpParams();
      searchParams = searchParams.append("print2" , "pretty2");
      searchParams = searchParams.append("custom2" , "key2");
      return this.httpClient.get<{[key : string ]: Post}>('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json/?print0=pretty0&custom0=key0'
          ,{
            headers: new HttpHeaders({"Custom-header" : "Hello", "Soufiene-header" : "Soufiene Hello"}),
            // params: new HttpParams().set("print1" , "pretty1")
            params: searchParams
          }

        )
        .pipe(map((responseData) => { 
          const postArray : Post[] = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postArray.push({...responseData[key], id :key})
            }
          }
          return postArray
          }),
        catchError(errorRes => {
            return throwError(errorRes);
          } ))
      // .subscribe(responseData => {
        //   console.log(responseData);
        // //   this.loadedPosts = responseData;
        // })
    }

    deletePosts(){
      return this.httpClient.delete('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
    }
}