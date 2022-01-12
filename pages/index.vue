<template>
	<section class="wrap">
		<Grid/>
	</section>
</template>

<script lang="ts">
import Vue from 'vue'
import Grid from '~/components/Grid.vue'

export default Vue.extend({
	components: {
		Grid
	},
	data: function () {
		return {

		}
	},
	methods: {
		init() {
			return;
		}
	},
	mounted() {
		this.init();
	}
})
</script>

<style>
	.wrap {
		height: 100%;
		background: #5b1d69;
		position: relative;
	}
</style>
