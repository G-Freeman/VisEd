<template>
	<section class="grid" id="main-grid">
		<div class="grid_debug">
			<label v-text="`Small Lines: ${hSmallGridLineCount} x ${vSmallGridLineCount}`"></label>
			<label v-text="`Big: ${hBigGridLineCount} x ${vBigGridLineCount}`"></label>
			<label v-text="`Lines: ${gridLinesSumm}, Quads: ${gridLinesMulti}`"></label>
		</div>
		<svg class="grid_svg" height="100%" width="100%">
			<!-- Back -->
			<rect width="100%" height="100%" fill="#2a2a2a"/>
			<!-- Small -->
			<template v-if="isInited">
				<line v-for="(i,num) in hSmallGridLineCount" :key="`hs${num}`" v-if="defer(1)"
					x1="0" :y1="(num * smallGridSpacing)+1"
					x2="100%" :y2="(num * smallGridSpacing)+1"
					:style="`stroke:${smallGridColor}`"
				/>
				<line v-for="(i,num) in vSmallGridLineCount" :key="`vs${num}`" v-if="defer(2)"
					:x1="(num * smallGridSpacing)+1" y1="0"
					:x2="(num * smallGridSpacing)+1" y2="100%"
					:style="`stroke:${smallGridColor}`"
				/>
				<!-- Big -->
				<line v-for="(i,num) in hBigGridLineCount" :key="`hb${num}`" v-if="defer(3)"
					x1="0" :y1="(num * bigGridSpacing)+1"
					x2="100%" :y2="(num * bigGridSpacing)+1"
					:style="`stroke:${bigGridColor}`"
				/>
				<line v-for="(i,num) in vBigGridLineCount" :key="`vb${num}`" v-if="defer(4)"
					:x1="(num * bigGridSpacing)+1" y1="0"
					:x2="(num * bigGridSpacing)+1" y2="100%"
					:style="`stroke:${bigGridColor}`"
				/>
			</template>
		</svg>
	</section>
</template>

<script>

import Defer from '@/mixins/defer'
import resizeDetector from 'element-resize-detector';

export default {
	name: "Grid",
	mixins: [
		Defer()
	],
	props:{
		smallGridColor: {default:'#353535'},
		bigGridColor:	{default:'#151515'},
	},
	data: function () {
		return {
			isInited: false,

			bigGridSpacing: 200,
			smallGridSpacing: 25,

			hSmallGridLineCount: 0,
			vSmallGridLineCount: 0,
			hBigGridLineCount: 0,
			vBigGridLineCount: 0,

			gridObj: null,
			gridWrapWidth: 0,
			gridWrapHeight: 0,

			isResizing: false,
			resizingTimer: null,
		}
	},
	computed: {
		gridLinesSumm()	 { return this.hSmallGridLineCount+this.vSmallGridLineCount+this.hBigGridLineCount+this.vBigGridLineCount },
		gridLinesMulti() { return this.hSmallGridLineCount*this.vSmallGridLineCount },
	},
	methods: {
		init() {
			setTimeout(()=>{
				//let erd = resizeDetector();
				let erdUltraFast = resizeDetector({
					strategy: "scroll"
				});
				erdUltraFast.listenTo(document.getElementById("main-grid"), this.onResize);
			},100)

			this.isInited = true;
		},
		onResize(element) {
			this.vSmallGridLineCount = Math.ceil(element.offsetWidth/this.smallGridSpacing);
			this.hSmallGridLineCount = Math.ceil(element.offsetHeight/this.smallGridSpacing);

			this.vBigGridLineCount = Math.ceil(element.offsetWidth/this.bigGridSpacing);
			this.hBigGridLineCount = Math.ceil(element.offsetHeight/this.bigGridSpacing);
		}
	},
	mounted() {
		this.init();
	}
}
</script>

<style scoped lang="scss">
	.grid {
		height: 100%;
		&_debug {
			position: absolute;
			top: 12px;
			left: 12px;
			background: #00000040;
			color: gray;
			padding: 4px;
			display: flex;
			flex-direction: column;
			border-radius: 4px;
			z-index: 999;
		}
		&_svg {

		}
	}
</style>
