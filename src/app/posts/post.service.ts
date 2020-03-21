import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  public posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
     this.http.get<Post[]>('http://localhost:3000', {responseType: 'json'})
     .subscribe((posts) => {posts.forEach(post => this.posts.push(post)); });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
