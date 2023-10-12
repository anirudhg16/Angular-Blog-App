import * as firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: AngularFirestore) {}
  loadFeatured() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  loadLatest() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  loadCategoryPosts(categoryId) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOnePost(postId) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }
  loadSimilar(catId) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', catId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  countViews(postId) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };
    this.afs
      .doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => {});
  }
}
