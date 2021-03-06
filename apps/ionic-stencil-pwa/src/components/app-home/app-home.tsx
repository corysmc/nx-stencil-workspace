import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
})
export class AppHome {
  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Home</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>
            Welcome to the PWA Toolkit. You can use this starter to build entire
            apps with web components using Stencil and ionic/core! Check out the
            README for everything that comes in this starter out of the box and
            check out our docs on{' '}
            <a href="https://stenciljs.com">stenciljs.com</a> to get started.
          </p>
          <my-component first="Cody" middle="middle" last="M" />
          <ion-button href="/profile/ionic" expand="block">
            Profile page
          </ion-button>
        </ion-content>
      </Host>
    );
  }
}
