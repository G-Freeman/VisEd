<template>
	<section class="selectContainer"
		@mousedown	= "grid_onMouseDown"
		@mouseup	= "grid_onMouseUp"
		@mousemove	= "grid_onMouseMove"
	>
		<div class="selectRect"
			v-if="mouse.isPressed.left"
			:style="rectStyleData"
		>
			<div v-if="isDev">

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
			isDev() { return true; },
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
				// this.mouseData.x2 = mouse.x;
				// this.mouseData.y2 = mouse.y;
				this.mouse.isPressed.left = false;
				// this.redraw();
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
		.selectRect {
			position: absolute;
			border: 1px #ffffff dashed;
			background: #2b2b2c;
			opacity: .4;
			pointer-events: none;
		}
	}
</style>
