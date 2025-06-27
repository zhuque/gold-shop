import { request } from './request';

export const getShopList = () => {
    return request({
        url: 'server/shop/list',
        method: 'GET',
    })
}