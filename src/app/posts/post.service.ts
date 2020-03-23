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
    const post = { title, content };
    this.http.post<Post>('http://localhost:3000/notes', post, { responseType: 'json' })
    .subscribe((data) => this.posts.push(data));
    this.postsUpdated.next([...this.posts]);
  }

  deletePost(noteId: string) {
    this.http.delete<Post>(`http://localhost:3000/notes/${noteId}`)
    .subscribe((data) => {
      console.log(data);
      // debugger;
      // this.posts.filter((p) => p._id !== noteId);
    });
    // console.log(this.posts);
    this.postsUpdated.next([...this.posts]);
  }
}
