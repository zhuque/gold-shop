import { defineStore } from 'pinia'
import { getShopList } from '@/api/shop'
import { userStore } from './user'


function _calcDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径，单位为公里
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 距离，单位为公里
    return distance;
}

const user = userStore()
export const useShopStore = defineStore('shop', {
    state: () => ({
        shops: [],
    }),
    getters: {
        nearestShop: (state) => {
            if (user.geo) {
                const { latitude, longitude } = user.geo
                const nearestShop = state.shops.sort((a, b) => {
                    return Math.sqrt(Math.pow(a.latitude - latitude, 2) + Math.pow(a.longitude - longitude, 2)) - Math.sqrt(Math.pow(b.latitude - latitude, 2) + Math.pow(b.longitude - longitude, 2))
                })[0]
                return nearestShop
            }
            if (state.shops.length !== 0) {
                return state.shops[0]
            }
            return null
        },
    },
    actions: {
        async loadShops() {
            const { data } = await getShopList()
            this.shops = data
            this.calcDistance()
        },
        async calcDistance() {
            if (!user.geo) {
                return
            }
            this.shops.forEach(item => {
                item.distance = _calcDistance(user.geo.latitude, user.geo.longitude, item.lat, item.lng).toFixed(2)
            })
            this.shops.sort((a, b) => {
                return a.distance - b.distance
            })
        }
    }
})