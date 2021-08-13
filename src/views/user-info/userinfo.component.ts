import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthingSDK } from '../../service/authing.service';
@Component({
	selector: 'app-user-info',
	templateUrl: './userinfo.component.html'
})
export class UserInfoComponent implements OnInit {
	loading: boolean;
	userInfo: string;
	constructor(private AuthingSDK: AuthingSDK, private activateInfo: ActivatedRoute, private router: Router) {
		this.userInfo = '';
		this.loading = false;
	}
	ngOnInit() {
		this.activateInfo.queryParams.subscribe((params: Params) => {
			if (Object.keys(params).length > 0) {
				this.handleCallback(params);
			}
		});
	}
	async handleCallback(params: Params) {
		this.setLoading(true);
		try {
			const accessToken = localStorage.getItem('accessToken');
			if (accessToken) {
				this.setUserInfo();
				this.setLoading(false);
			} else {
				const { authing } = this.AuthingSDK;
				const { code } = params;
				const codeChallenge = localStorage.getItem('codeChallenge');
				const tokenSet = await authing.getAccessTokenByCode(code, { codeVerifier: codeChallenge as string });
				const { access_token, id_token } = tokenSet;
				const userInfo = await authing.getUserInfoByAccessToken(tokenSet.access_token);
				localStorage.setItem('accessToken', access_token);
				localStorage.setItem('idToken', id_token);
				localStorage.setItem('userInfo', JSON.stringify(userInfo));
				this.setUserInfo();
				this.setLoading(false);
			}
		} catch (error) {
			console.log('error', JSON.stringify(error));
			this.router.navigate(['/login']);
		}
	}
	setUserInfo() {
		const userInfo = localStorage.getItem('userInfo');
		this.userInfo = userInfo ? userInfo : 'not logged in';
	}
	setLoading(status: boolean) {
		this.loading = status;
	}
	handleLogout() {
		const { authing } = this.AuthingSDK;
		localStorage.clear();
		window.location.href = authing.buildLogoutUrl({redirectUri: 'http://localhost:4000'});
	}
}
