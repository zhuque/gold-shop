import { defineStore } from 'pinia';
import { login } from "@/api/request";
import { getUserInfo } from "@/api/user";

export const userStore = defineStore('user', {
	state: () => {
		return {
			user: null,
			init: false,
			geo: null,
		}
	},
	getters: {
		isAuth() {
			return uni.getStorageSync("token") != null
		},
	},
	actions: {
		async login(_code) {
			const { data, code, msg } = await login(_code)
			if (code !== 0) {
				uni.showToast({
					title: msg,
					icon: 'error'
				})
				return
			}
			this.user = data.user
			uni.setStorageSync("token", data.token)
			return data.user
		},
		async doLogin() {
			const { code } = await new Promise((resolve, reject) => {
				uni.login({
					provider: "weixin",
					success(res) {
						resolve(res)
					},
					fail(e) {
						reject(e)
					}
				})
			})
			const { data } = await login(code)
			this.user = data.user
			uni.setStorageSync("token", data.token)
			return data.user
		},
		setGeo(g) {
			this.geo = g
		},
		async updateUser() {
			const { data } = await getUserInfo()
			if (data) {
				this.user = data
			}
		},
		setUser(user) {
			this.user = user
		},
		initializeStore() {
			const storedState = uni.getStorageSync('user')
			if (storedState) {
				this.$state = JSON.parse(storedState)
			}
		}
	},
	persist: true
});