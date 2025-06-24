import { request} from './request'

export async function getPrices(){
	return request({
		url: `/staff/price`,
		method: "GET",
		data: {}
	})
}

export async function getOrders(params) {
	return request({
		url: `/staff/recycle-orders`,
		method: "GET",
		data: params
	})
}

export async function cancelOrder(id, reason) {
	return request({
		url: `/staff/recycle-orders/${id}/cancel`,
		method: "PUT",
		data: {
			reason: reason,
		}
	})
}

export async function getOrderDetail(id) {
	return request({
		url: `/staff/recycle-orders/${id}`,
		method: "GET",
	})
}

export async function updatePayment(id, data) {
	return request({
		url: `/staff/recycle-orders/${id}/payment`,
		method: "PUT",
		data: data,
	})
}

export async function updateCheck(id, data) {
	return request({
		url: `/staff/recycle-orders/${id}/inspection`,
		method: "POST",
		data: data,
	})
}

export const ORDER_STATUS = {
	CHECK_PENDING: 'check_pending',
	CHECK_SUCCESS: 'check_success',
	CHECK_FAILED: 'check_failed',
	CHECKED: 'checked',
	DRAFT: 'draft',
	PAYING: 'paying',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
}

export const ORDER_STATUS_LABELS = {
	[ORDER_STATUS.CHECK_PENDING]: '待检测',
	[ORDER_STATUS.CHECK_SUCCESS]: '待确认',
	[ORDER_STATUS.CHECK_FAILED]: '检测失败',
	[ORDER_STATUS.CHECKED]: '已检测',
	[ORDER_STATUS.DRAFT]: '待确认',
	[ORDER_STATUS.PAYING]: '待打款',
	[ORDER_STATUS.COMPLETED]: '已完成',
	[ORDER_STATUS.CANCELLED]: '已取消',
}

export async function getItems(id) {
	return request({
		url: `/staff/recycle-orders/${id}/items`,
		method: "GET",
	})
}

export async function updateItems(id, data) {
	return request({
		url: `/staff/recycle-orders/${id}/items`,
		method: "PUT",
		data: data,
	})
}