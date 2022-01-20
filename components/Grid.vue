<template>
	<section class="grid"
		:id="`grid-${id}`"
		@wheel = "grid_onMouseWheel"
	>
		<div class="grid_tools">
			<div class="zoom">
				<div class="zoom_preset" v-for="i in 3" v-text="i"/>
			</div>
			<div class="grid_debug" v-if="isDev">
				<label v-text="`Small Lines: ${hSmallGridLineCount} x ${vSmallGridLineCount}`"></label>
				<label v-text="`Big: ${hBigGridLineCount} x ${vBigGridLineCount}`"></label>
				<label v-text="`Lines: ${gridLinesSumm}, Quads: ${gridLinesMulti}`"></label>
				<label v-text="`Zoom: ${zoom.value.toFixed(1)}`"></label>
			</div>
		</div>
		<svg class="grid_svg" height="100%" width="100%">
			<!-- Back -->
			<rect width="100%" height="100%" fill="#2a2a2a"/>
			<!-- Small -->
			<template v-if="isInited">
				<line v-for="(i,num) in hSmallGridLineCount" :key="`hs${num}`" v-if="defer(1)"
					x1="0"		:y1="(num * ((smallGridSpacing / (2**Math.floor(zoom.value)||1)) * (2**zoom.value) ))+1"
					x2="100%"	:y2="(num * ((smallGridSpacing / (2**Math.floor(zoom.value)||1)) * (2**zoom.value) ))+1"
					:style="`
						stroke:${num%8 ? smallGridColor : bigGridColor}
					`"
				/>
				<line v-for="(i,num) in vSmallGridLineCount" :key="`vs${num}`" v-if="defer(2)"
					:x1="(num * ((smallGridSpacing / (2**Math.floor(zoom.value)||1)) * (2**zoom.value) ))+1" y1="0"
					:x2="(num * ((smallGridSpacing / (2**Math.floor(zoom.value)||1)) * (2**zoom.value) ))+1" y2="100%"
					:style="`
						stroke:${num%8 ? smallGridColor : bigGridColor};
					`"
				/>

			</template>
		</svg>
		<selectRect/>
	</section>
</template>

<script>

import Defer from '@/mixins/defer'
import resizeDetector from 'element-resize-detector';
import selectRect from '@/components/SelectRect.vue';



export default {
	name: "Grid",
	components: { selectRect },
	mixins: [
		Defer()
	],
	props:{
		id:				{default: '0'		},
		smallGridColor: {default: '#353535'	},
		bigGridColor:	{default: '#151515'	},
	},
	data: function () {
		return {
			isInited: false,

			bigGridSpacing: 400,
			smallGridSpacing: 25,

			hSmallGridLineCount: 0,
			vSmallGridLineCount: 0,
			hBigGridLineCount: 0,
			vBigGridLineCount: 0,

			zoom: {
				value: 1,
				step: .1,
				min: 1,
				max: 32
			},

			gridObj: null,
			gridWrapWidth: 0,
			gridWrapHeight: 0,

			isResizing: false,
			resizingTimer: null,
		}
	},
	setup() {
		console.log('SETUP')
	},
	computed: {
		isDev()			 { return true; },
		gridLinesSumm()	 { return this.hSmallGridLineCount+this.vSmallGridLineCount+this.hBigGridLineCount+this.vBigGridLineCount },
		gridLinesMulti() { return this.hSmallGridLineCount*this.vSmallGridLineCount },
	},
	methods: {
		init() {
			setTimeout(()=>{
				this.gridObj = document.getElementById(`grid-${this.id}`);
				let erdUltraFast = resizeDetector({
					strategy: "scroll"
				});
				erdUltraFast.listenTo(this.gridObj, this.onResize);
			},100)

			this.isInited = true;
		},
		onResize(element) {
			this.redraw();
		},
		redraw() {
			this.vSmallGridLineCount = Math.ceil(this.gridObj.offsetWidth /(this.smallGridSpacing * (Math.floor(this.zoom.value)||1) )) * ((Math.floor(this.zoom.value)||1));
			this.hSmallGridLineCount = Math.ceil(this.gridObj.offsetHeight/(this.smallGridSpacing * (Math.floor(this.zoom.value)||1) )) * ((Math.floor(this.zoom.value)||1));
			this.vBigGridLineCount	 = Math.ceil(this.gridObj.offsetWidth /(this.bigGridSpacing	 * (Math.floor(this.zoom.value)||1) )) * ((Math.floor(this.zoom.value)||1));
			this.hBigGridLineCount	 = Math.ceil(this.gridObj.offsetHeight/(this.bigGridSpacing	 * (Math.floor(this.zoom.value)||1) )) * ((Math.floor(this.zoom.value)||1));
		},
		grid_onMouseWheel(wheel) {
			if(this.zoom.value >= this.zoom.min && wheel.deltaY < 0) { this.zoom.value += this.zoom.step; }
			if(this.zoom.value <= this.zoom.max && wheel.deltaY > 0) { this.zoom.value -= this.zoom.step; }
			if(this.zoom.value <  this.zoom.min) this.zoom.value = this.zoom.min;
			if(this.zoom.value >  this.zoom.max) this.zoom.value = this.zoom.max;

			this.redraw();
		},
	},
	mounted() {
		this.init();
	}
}
</script>

<style scoped lang="scss">
	.grid {
		width: 100%;
		//height: 100%;
		overflow: hidden;
		//border: 8px crimson solid;
		margin: 12px;
		&_tools {
			position: absolute;
			top: 0;
			pointer-events: all;
			.zoom {
				display: flex;
				border-radius: 4px;
				background: #00000040;
				padding: 2px;
				margin: 12px;
				border: 1px solid rgba(0, 0, 0, 0.25);
				&_preset {
					width: 12px;
					padding: 4px;
					color: #c48922;
					background: rgba(0, 0, 0, 0.25);
					margin: 2px;
					text-align: center;
					border: 1px solid rgba(0, 0, 0, 0.25);
					&:hover {
						background: rgba(40, 39, 39, 0.25);
						cursor: pointer;
					}
				}
			}

		}
		&_debug {
			margin: 12px;
			background: rgba(0, 0, 0, 0.25);
			color: #9ca181;
			display: flex;
			padding: 4px;
			flex-direction: column;
			border-radius: 4px;
			z-index: 999;
			user-select: none;
			pointer-events: none;
			border: 1px solid rgba(0, 0, 0, 0.25);
		}
		&_svg {

		}
	}
</style>
