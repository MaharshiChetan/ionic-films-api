import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-film-details',
  templateUrl: 'film-details.html',
})
export class FilmDetailsPage {
  film = null;
  isFavorite = false;

  constructor(
    private navParams: NavParams,
    private emailComposer: EmailComposer,
    private favoriteProvider: FavoriteProvider
  ) {
    this.film = this.navParams.get('film');
    this.favoriteProvider.isFavorite(this.film.episode_id).then(isFav => {
      this.isFavorite = isFav;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmDetailsPage');
  }

  favoriteFilm() {
    this.favoriteProvider.favoriteFilm(this.film.episode_id).then(() => {
      this.isFavorite = true;
    });
  }

  unfavoriteFilm() {
    this.favoriteProvider.unfavoriteFilm(this.film.episode_id).then(() => {
      this.isFavorite = false;
    });
  }

  shareFilm() {
    let email = {
      to: 'chetanmaharshi5678@gmail.com',
      subject: 'I love this one: ' + this.film.title,
      body:
        'Can you remember the opening?<br><br>"' +
        this.film.opening_crawl +
        '"',
      isHtml: true,
    };

    this.emailComposer.open(email);
  }
}
