import { Component } from '@angular/core';
import { AuthingSDK } from '../../service/authing.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	constructor(private AuthingSDK: AuthingSDK) {}
	async handleLogin() {
		const { authing } = this.AuthingSDK;
		// PKCE 场景使用示例
		// 生成一个 code_verifier
		let codeChallenge = authing.generateCodeChallenge();
		localStorage.setItem('codeChallenge', codeChallenge);
		// 计算 code_verifier 的 SHA256 摘要
		let codeChallengeDigest = authing.getCodeChallengeDigest({ codeChallenge, method: 'S256' });
		// 构造 OIDC 授权码 + PKCE 模式登录 URL
		let url = authing.buildAuthorizeUrl({ codeChallenge: codeChallengeDigest, codeChallengeMethod: 'S256' });
		window.location.href = url;
	}
}
