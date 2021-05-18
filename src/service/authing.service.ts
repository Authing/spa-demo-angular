import { Injectable } from '@angular/core';
import { AuthenticationClient } from 'authing-js-sdk';
@Injectable({
	providedIn: 'root'
})
export class AuthingSDK {
	authing: AuthenticationClient;
	constructor() {
		this.authing = new AuthenticationClient({
			appId: '60a25996bf994ab22e1ac5a4',
			appHost: 'https://spa-demo-angular.authing.cn',
			redirectUri: 'http://localhost:4200/user-info',
			tokenEndPointAuthMethod: 'none'
		});
	}
}
