<template>
	<section class="wrap">
<!--		<Grid id="0"/>-->
		<Grid id="1"/>
	</section>
</template>

<script lang="ts">
import Vue from 'vue'
import Grid from '~/components/Grid.vue'

export default Vue.extend({
	components: { Grid },
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
		display: flex;
		justify-content: space-between;
		padding: 12px;
	}
</style>
