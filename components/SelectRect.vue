<template>
	<section class="selectContainer"
		@mouseenter		= "grid_onMouseEnter"
		@mousedown.left	= "grid_onMouseDown"
		@mouseup.left	= "grid_onMouseUp"
		@mousemove		= "grid_onMouseMove"
		@wheel			= "grid_onMouseWheel"
	>
		<div class="selectRect"
			v-if="mouse.isPressed.left"
			:style="rectStyleData"
		>
			<div class="selectRect_debug" v-if="isDev">
				<div class="roll">
					<div class="cell lt" v-text="'X:'+mouse.start.x+' Y:'+mouse.start.y"/>
					<div class="cell ct" v-text="''"/>
					<div class="cell rt" v-text="''"/>
				</div>
				<div class="roll">
					<div class="cell lc" v-text="''"/>
					<div class="cell cc" v-text="''"/>
					<div class="cell rc" v-text="`W:${rectStyleData.width}`"/>
				</div>
				<div class="roll">
					<div class="cell lb" v-text="''"/>
					<div class="cell cb" v-text="`H:${rectStyleData.height}`"/>
					<div class="cell rb" v-text="'X:'+mouse.end.x+' Y:'+mouse.end.y"/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    export default {
        name: "SelectRect",
		props:{

		},
		data: function () {
			return {
				mouse: {
					start:	{x:100,y:100},
					end:	{x:100,y:100},
					cur:	{x:100,y:100},

					isPressed: {
						left: false,
					}
				},
				rectStyleData: {
					top: '100px',
					left: '100px',
					width: '100px',
					height: '100px'
				}
			}
		},
		computed: {
			isDev() { return false; },
		},
		methods: {
			grid_onMouseDown(mouse) {
				this.mouse.start.x	= mouse.x;
				this.mouse.start.y	= mouse.y;
				this.mouse.end.x	= mouse.x;
				this.mouse.end.y	= mouse.y;
				this.mouse.isPressed.left = true;
				this.redraw();
			},
			grid_onMouseMove(mouse) {
				if(this.mouse.isPressed.left) {
					this.mouse.end.x = mouse.x;
					this.mouse.end.y = mouse.y;
					this.redraw();
				}
			},
			grid_onMouseUp(mouse) {
				this.mouse.isPressed.left = false;
			},
			grid_onMouseEnter(mouse) {
				if(mouse.buttons===1) {
					//...
				} else {
					this.mouse.isPressed.left = false;
				}
			},
			grid_onMouseWheel(wheel) {
				//...
			},
			redraw() {
				this.rectStyleData.left	 	= this.mouse.start.x<this.mouse.end.x ? `${this.mouse.start.x}px` : `${this.mouse.end.x}px`;
				this.rectStyleData.top	 	= this.mouse.start.y<this.mouse.end.y ? `${this.mouse.start.y}px` : `${this.mouse.end.y}px`;
				this.rectStyleData.width	= this.mouse.start.x<this.mouse.end.x ? `${this.mouse.end.x-this.mouse.start.x}px` : `${this.mouse.start.x-this.mouse.end.x}px`;
				this.rectStyleData.height 	= this.mouse.start.y<this.mouse.end.y ? `${this.mouse.end.y-this.mouse.start.y}px` : `${this.mouse.start.y-this.mouse.end.y}px`;
			}
		},
		mounted() {
        	console.log(this.x1)
		}
    }
</script>

<style scoped lang="scss">
	.selectContainer {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		user-select: none;
		border: 1px #1d1d1d solid;
		.selectRect {
			position: fixed;
			border: 1px rgba(255,255,255,.3) dashed;
			background: rgba(0,0,0,.1);
			pointer-events: none;
			overflow: hidden;
			&_debug {
				height: 100%;
				color: white;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.roll {
					height: 100%;
					display: flex;
					justify-content: space-between;
					.cell {
						width: 100%;
						margin: 2px;
						background: #000000;
					}
				}
			}
		}
	}
</style>
