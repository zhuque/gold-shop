import { request } from "./request"

export async function info() {
	// TODO:
}

export async function getPhone(code) {
	const res = await request({
		url: `server/user/getPhone`,
		method: 'POST',
		data: { code }
	})
	return res
}


export async function getUserInfo() {
	return request({
		url: `server/user/info`,
		method: 'GET'
	})
}