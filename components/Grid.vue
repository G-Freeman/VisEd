<template>
	<section class="grid">
		<svg class="grid_svg" id="main-grid" height="100%" width="100%">
			<!-- Back -->
			<rect width="100%" height="100%" fill="#2a2a2a"/>
			<!-- Small -->
			<line v-for="(i,num) in hSmallGridLineCount"
				  x1="0" :y1="(num * smallGridSpacing)+1"
				  x2="100%" :y2="(num * smallGridSpacing)+1"
				  :style="'stroke:'+smallGridColor+'; stroke-width:1px'"
			/>
			<line v-for="(i,num) in vSmallGridLineCount"
				  :x1="(num * smallGridSpacing)+1" y1="0"
				  :x2="(num * smallGridSpacing)+1" y2="100%"
				  :style="'stroke:'+smallGridColor+'; stroke-width:1px'"
			/>
			<!-- Big -->
			<line v-for="(i,num) in hBigGridLineCount"
				  x1="0" :y1="(num * bigGridSpacing)+1"
				  x2="100%" :y2="(num * bigGridSpacing)+1"
				  :style="'stroke:'+bigGridColor+'; stroke-width:1px'"
			/>
			<line v-for="(i,num) in vBigGridLineCount"
				  :x1="(num * bigGridSpacing)+1" y1="0"
				  :x2="(num * bigGridSpacing)+1" y2="100%"
				  :style="'stroke:'+bigGridColor+'; stroke-width:1px'"
			/>
		</svg>
	</section>
</template>

<script>

export default {
	name: "Grid",
	data: function () {
		return {
			bigGridSpacing: 200,
			smallGridSpacing: 25,

			hSmallGridLineCount: 0,
			vSmallGridLineCount: 0,
			hBigGridLineCount: 0,
			vBigGridLineCount: 0,

			gridObj: null,
			gridWrapWidth: 0,
			gridWrapHeight: 0
		}
	},
	props:{
		smallGridColor: {default:'#353535'},
		bigGridColor:	{default:'#151515'},
	},
	methods: {
		init() {
			this.gridObj = document.getElementById('main-grid');
			this.gridWrapWidth	= this.gridObj.clientWidth;
			this.gridWrapHeight = this.gridObj.clientHeight;

			this.vSmallGridLineCount = Math.ceil(this.gridWrapWidth/this.smallGridSpacing);
			this.hSmallGridLineCount = Math.ceil(this.gridWrapHeight/this.smallGridSpacing);

			this.vBigGridLineCount = Math.ceil(this.gridWrapWidth/this.bigGridSpacing);
			this.hBigGridLineCount = Math.ceil(this.gridWrapHeight/this.bigGridSpacing);
		}
	},
	mounted() {
		this.init();
	}
}
</script>

<style scoped lang="scss">
	.grid {
		height: 400px;
		background: black;
		padding: 6px;
		border-radius: 4px;
		&_svg {
			height: 100%;
			border-radius: 2px;
		}
	}
</style>
