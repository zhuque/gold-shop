
export async function request({ url, method, data }) {
	const res = await uni.request({ url, method, data, dataType: "json" })
	if (res.statusCode == 200) {
		return res.data
	}
	uni.showToast({
		title: "网络错误",
		duration: 2000,
		icon: "none"
	})
}

export const baseUrl = process.env.NODE_ENV === 'development' ? '' : '';

export async function login(code) {
	const res = await request({
		url: `/server/user/login`,
		method: 'POST',
		data: { code }
	})
	return res
}

uni.addInterceptor('request', {
	invoke(args) {
		args.url = baseUrl + args.url;
		if (!args.header) {
			args.header = {}
		}
		args.header["token"] = uni.getStorageSync("token")
	},
	success(args) {
		const { data, statusCode } = args
		if (statusCode == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	},
	fail(err) {},
	complete(res) {}
})

export async function checkToken() {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: "token",
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			}
		})
	})
}

export async function uploadFiles(files) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `/staff/upload`,
			files: files,
			header: {
				'Authorization': 'Bearer ' + uni.getStorageSync("token")
			},
			success: (res) => {
				resolve(JSON.parse(res.data))
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}