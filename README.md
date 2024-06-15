# FirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## links :
    https://academind.com/tutorials/hide-javascript-code
    https://academind.com/tutorials/building-a-restful-api-with-nodejs
    https://firebase.google.com/

## To start the project  

### FireBase RealTime DatBase

    Account : soufiene.ouertani@gmail.com
    Database : ng-complete-guide
    url : https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/

    
    Compte FireBase :
    https://firebase.google.com/
    
    Console FireBase :
    https://console.firebase.google.com/

    Overview de la base de données ng-complete-guide-e9292 :
    https://console.firebase.google.com/project/ng-complete-guide-e9292/
    
    lien d'accès aux données de la base de données :
    https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/
    
    lien d'accès aux APIs de la base de données :
    https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/post.json

    To avoid the 401 http error, rules for the database have to be :
    {
        "rules": {
            ".read": "true",
            ".write": "true"
        }
    }


## 342. Sending a POST Request : HttpClientModule, HttpClient, httpClient.post(..).subscribe(..)

    this.httpClient.post('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData).subscribe(responseData => console.log(responseData))

## 343. Getting data : HttpClientModule, HttpClient, httpClient.get(..).subscribe(..)

    this.httpClient.get('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    .subscribe(responseData => console.log(responseData))

## 344. Using RxJS Operators to Transform Response : pipe, map

    .pipe(map(responseData => {
      const postArray = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postArray.push({...responseData[key], id :key})
        }
      }
      return postArray
    } ))

## 345. Using Types with the HttpClient :

    export interface Post {
        title: string; 
        content: string; 
        id? : string;
    }

    onCreatePost(postData: Post) {

    const postArray : Post[] = [];

1ere facon de faire :

    .pipe(map((responseData :{[key :string]:any}) => {

2eme facon de faire :

    // {name : string} : is the return type
    this.httpClient.post<{name : string}>('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)

    // {[key : string ]: Post} : is the return type
    this.httpClient.get<{[key : string ]: Post}>('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json')

    .pipe(map((responseData) => { 

## 346. Outputting Posts

    loadedPosts : Post[]= [];

    ngOnInit() {this.fetchPosts()}

    .subscribe(responseData => {
      console.log(responseData);
      this.loadedPosts = responseData;
    })

    <p *ngIf="loadedPosts.length <1">{{loadedPosts.length}}>No posts available!</p>
    <ul class="list-group" *ngIf="loadedPosts.length >0">
    <li class="list-group-item" *ngFor="let post of loadedPosts">
        <h3>{{post.title}}</h3>
        <p>{{post.content}}</p>
    </li>
    </ul>

    Petite erreur ici corrigée dans la section suivante :
        <p *ngIf="loadedPosts.length <1">{{loadedPosts.length}}>No posts available!</p>
        <p *ngIf="loadedPosts.length <1 && !isFetching">No posts available!</p>

## 347. Showing a Loading Indicator

    <p *ngIf="loadedPosts.length <1 && !isFetching">{{loadedPosts.length}}>No posts available!</p>
    <ul class="list-group" *ngIf="loadedPosts.length >0 && !isFetching">

    <p *ngIf="isFetching">Loading...</p>

    isFetching = false;

    this.isFetching = true;

    .subscribe(responseData => {
      console.log(responseData);
      this.loadedPosts = responseData;
      this.isFetching = false;

    Petite erreur dans la section précédente corrigée dans cette section :
        <p *ngIf="loadedPosts.length <1">{{loadedPosts.length}}>No posts available!</p>
        <p *ngIf="loadedPosts.length <1 && !isFetching">No posts available!</p>

## 348. Using a Service for Http Requests - ## 349. Services & Components Working Together
    We may also use different alternatives :
    1 - Using a subject in the PostService and we subsucribe to it in the AppComponent, suitable in case of mutiple components using the subject
    2- Returning the Observable from the PostService, and subsribe to it in the AppComponent, suitable in case of one component using the subject

    We will use the 2nd alternative  

    constructor(private httpClient : HttpClient, private postService : PostService ) {}

    ngOnInit() {
        this.isFetching = true;
        this.postService.fetchPosts().subscribe(responseData => {
            console.log(responseData);
            this.loadedPosts = responseData;
            this.isFetching = false;
        })
    }

    this.postService.createAndStorePoste(postData.title, postData.content);

    this.postService.fetchPosts().subscribe(responseData => {

## 350. Sending a DELETE Request : httpClient.delete, postService.deletePosts()

    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts=[]
      }
    );

    deletePosts(){
      return this.httpClient.delete('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
    }

## 351. Handling Errors :

    firebase  :  Modifier => ".read": "false",

    {
        "rules": {
            ".read": "false",
            ".write": "true"
        }
    }

    error = null;

      }, error => {
        this.error = error.message;
        console.log(error);
      }
    )

    <p *ngIf="isFetching && !error">Loading...</p>
    <div class="alert alert-danger" *ngIf="error">
        <h1>An error occured</h1>
        <p>{{error}}</p>
    </div>  

## 352. Using Subjects for Error Handling : 

    private errorSub : Subscription;

    this.errorSub = this.postService.error.subscribe(errorMesssage => this.error= errorMesssage);

    ngOnDestroy(): void {
        this.errorSub.unsubscribe();
    }

    error => {
        this.error.next(error.message)
    }

## 353. Using the catchError Operator : catchError, throwError

          }),
        catchError(errorRes => {
            return throwError(errorRes);

## 354. Error Handling & UX :

## 355. Setting Headers :

    firebase  :  Modifier => ".read": "true",

    {
        "rules": {
            ".read": "true",
            ".write": "true"
        }
    }

    return this.httpClient.get<{[key : string ]: Post}>('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
        ,{
        headers: new HttpHeaders({"Custom-header" : "Hello", "Soufiene-header" : "Soufiene Hello"})
        }

## 356 : Adding Query Params : HttpParams(append), params(set),..

      let searchParams = new HttpParams();
      searchParams = searchParams.append("print2" , "pretty2");
      searchParams = searchParams.append("custom2" , "key2");
      return this.httpClient.get<{[key : string ]: Post}>('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json/?print0=pretty0&custom0=key0'
          ,{
            headers: new HttpHeaders({"Custom-header" : "Hello", "Soufiene-header" : "Soufiene Hello"}),
            // params: new HttpParams().set("print1" , "pretty1")
            params: searchParams
          }

## 357. Observing Different Types of Responses : observe : 'body', observe : 'response', HttpEventType, event.type

    // observe : 'body'
    observe : 'response'

    .subscribe(responseData => console.log(responseData.body),

    return this.httpClient.delete('https://ng-complete-guide-e9292-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
        ,{
        observe : 'events'
        }
    ).pipe(tap(event => {
        console.log("event.type : HttpEventType["+event.type+"] : "+HttpEventType[event.type]);
        console.log(event);
    }))
    ;

