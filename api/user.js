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

export async function addSellOrder(data) {
	return request({
		url: `server/recycles`,
		method: 'POST',
		data
	})
}

export async function getSellOrder(id) {
	return request({
		url: `server/recycles/${id}`,
		method: 'GET'
	})
}

export async function getSellOrderList() {
	return request({
		url: `server/recycles`,
		method: 'GET'
	})
}

export async function getUserOrders(status, page, pageSize) {
	return request({
		url: `server/recycles?status=${status}&page=${page}&pageSize=${pageSize}`,
		method: 'GET'
	})
}

export async function cancelSellOrder(id) {
	return request({
		url: `server/recycles/${id}/cancel`,
		method: 'PUT'
	})
}

export async function confirmSellOrder(id) {
	return request({
		url: `server/recycles/${id}/confirm`,
		method: 'PUT'
	})
}
