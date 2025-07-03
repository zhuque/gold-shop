import { request } from './request';

export const getShopList = () => {
    return request({
        url: 'server/shop/list',
        method: 'GET',
    })
}

export const getPrice = () => {
    return request({
        url: 'server/price',
        method: 'GET',
    })
}
