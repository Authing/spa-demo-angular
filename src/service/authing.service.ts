import { Injectable } from '@angular/core';
import { AuthenticationClient } from 'authing-js-sdk';
@Injectable({
	providedIn: 'root'
})
export class AuthingSDK {
	authing: AuthenticationClient;
	constructor() {
		this.authing = new AuthenticationClient({
			appId: 'APP_ID',
			appHost: 'https://{你的域名}.authing.cn',
			redirectUri: 'http://localhost:4000/callback'
		});
	}
}
