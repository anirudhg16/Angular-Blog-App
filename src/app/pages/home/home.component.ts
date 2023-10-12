import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredPostsArray: Array<object>;
  latestPostArray: Array<object>;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe((val) => {
      this.featuredPostsArray = val;
    });
    this.postService.loadLatest().subscribe((val) => {
      this.latestPostArray = val;
    });
  }
}
