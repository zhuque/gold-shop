import { defineStore } from 'pinia'

export const useRecycleStore = defineStore('recycle', {
    state: () => ({
        statusLabels: {
            'all': '全部',
            'draft': '待回收',
            'pending': '待支付',
            'paid': '已支付',
            'completed': '已完成',
            'cancelled': '已取消'
        }
    }),
    actions: {
        getStatusLabels() {
            return this.statusLabels 
        },
        getStatusLabel(status) {
            return this.statusLabels[status] ?? '处理中'
        }
    }
})