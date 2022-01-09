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
		background: #d95d3d;
		padding: 6px;
		position: relative;
		border-radius: 6px;
	}
</style>
