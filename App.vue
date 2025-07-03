<script>
import { priceStore } from '@/stores/price';
export default {
	onLaunch: function () {
		const price = priceStore()
		price.startUpdateTask()
	},
	onShow: function () {
	},
	onHide: function () {
	}
}
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
