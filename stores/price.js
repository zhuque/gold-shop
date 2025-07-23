import { defineStore } from 'pinia';
import { getPrice } from '@/api/shop';

export const priceStore = defineStore('price', {
    state: () => ({
        price: 0,
        interval: null,
    }),
    actions: {
        setPrice(price) {
            this.price = price
        }, 
        async getPrice() {
            const { data } = await getPrice()
            this.price = +data.Sell
        },
        startUpdateTask() {
            this.getPrice()
            this.interval = setInterval(() => {
                this.getPrice()
            }, 1000  *30)
        },
        stopUpdateTask() {
            clearInterval(this.interval)
        }
    },
    persist: true
})