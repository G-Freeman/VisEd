<template>
	<section class="grid"
		:id="`grid-${id}`"
		@wheel = "grid_onMouseWheel"
	>
		<div class="grid_debug" v-if="isDev">
			<label v-text="`Small Lines: ${hSmallGridLineCount} x ${vSmallGridLineCount}`"></label>
			<label v-text="`Big: ${hBigGridLineCount} x ${vBigGridLineCount}`"></label>
			<label v-text="`Lines: ${gridLinesSumm}, Quads: ${gridLinesMulti}`"></label>
			<label v-text="`Zoom: ${zoom.value.toFixed(1)}`"></label>
		</div>
		<svg class="grid_svg" height="100%" width="100%">
			<!-- Back -->
			<rect width="100%" height="100%" fill="#2a2a2a"/>
			<!-- Small -->
			<template v-if="isInited">
				<line v-for="(i,num) in hSmallGridLineCount" :key="`hs${num}`" v-if="defer(1)"
					x1="0" :y1="(num * (smallGridSpacing*zoom.value))+1"
					x2="100%" :y2="(num * (smallGridSpacing*zoom.value))+1"
					:style="`stroke:${smallGridColor}`"
				/>
				<line v-for="(i,num) in vSmallGridLineCount" :key="`vs${num}`" v-if="defer(2)"
					:x1="(num * (smallGridSpacing*zoom.value))+1" y1="0"
					:x2="(num * (smallGridSpacing*zoom.value))+1" y2="100%"
					:style="`stroke:${smallGridColor}`"
				/>
				<!-- Big -->
				<line v-for="(i,num) in hBigGridLineCount" :key="`hb${num}`" v-if="defer(3)"
					x1="0" :y1="(num * (bigGridSpacing*zoom.value))+1"
					x2="100%" :y2="(num * (bigGridSpacing*zoom.value))+1"
					:style="`stroke:${bigGridColor}`"
				/>
				<line v-for="(i,num) in vBigGridLineCount" :key="`vb${num}`" v-if="defer(4)"
					:x1="(num * (bigGridSpacing*zoom.value))+1" y1="0"
					:x2="(num * (bigGridSpacing*zoom.value))+1" y2="100%"
					:style="`stroke:${bigGridColor}`"
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
		id:				{default: (()=>{ return 0 })()	},
		smallGridColor: {default:'#353535'	},
		bigGridColor:	{default:'#151515'	},
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

			zoom: {
				value: 1,
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
			this.vSmallGridLineCount = Math.ceil(this.gridObj.offsetWidth/(this.smallGridSpacing*this.zoom.value));
			this.hSmallGridLineCount = Math.ceil(this.gridObj.offsetHeight/(this.smallGridSpacing*this.zoom.value));

			this.vBigGridLineCount = Math.ceil(this.gridObj.offsetWidth/(this.bigGridSpacing*this.zoom.value));
			this.hBigGridLineCount = Math.ceil(this.gridObj.offsetHeight/(this.bigGridSpacing*this.zoom.value));
		},
		grid_onMouseWheel(wheel) {
			if(this.zoom.value>=.2 && wheel.deltaY<0) {
				this.zoom.value += .1
			}
			if(this.zoom.value<=3 && wheel.deltaY>0) {
				this.zoom.value -= .1;
			}
			if(this.zoom.value<.2) this.zoom.value=.2;
			if(this.zoom.value>3)  this.zoom.value=3;

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
		&_debug {
			position: absolute;
			top: 12px;
			left: 12px;
			background: #00000040;
			color: gray;
			//padding: 4px;
			display: flex;
			flex-direction: column;
			border-radius: 4px;
			z-index: 999;
			user-select: none;
			pointer-events: none;
		}
		&_svg {

		}
	}
</style>
