import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = this.postsService.posts;
private postsSub: Subscription;

 constructor(public postsService: PostService) {}

 onDeletePost(id: string) {
  this.postsService.deletePost(id);
}

 ngOnInit() {
   this.postsService.getPosts();
 }

 ngOnDestroy() {
   this.postsSub.unsubscribe();
 }
}
