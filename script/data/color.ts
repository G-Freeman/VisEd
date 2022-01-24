export default class Color {

	static hexToRgb(hex:any) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	static rgbToHex = (r:any, g:any, b:any) =>
		"#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

	static rgbToLightness = (r:number,g:number,b:number) =>
		1/2 * (Math.max(r,g,b) + Math.min(r,g,b));

	static rgbToSaturation = (r:number,g:number,b:number) => {
		const L = Color.rgbToLightness(r,g,b);
		const max = Math.max(r,g,b);
		const min = Math.min(r,g,b);
		return (L === 0 || L === 1)
			? 0
			: (max - min)/(1 - Math.abs(2 * L - 1));
	};

	static rgbToHue = (r:number,g:number,b:number) => Math.round(
		Math.atan2(
			Math.sqrt(3) * (g - b),
			2 * r - g - b,
		) * 180 / Math.PI
	);

	static rgbToHsl = (r:number,g:number,b:number) => {
		const lightness = Color.rgbToLightness(r,g,b);
		const saturation = Color.rgbToSaturation(r,g,b);
		const hue = Color.rgbToHue(r,g,b);
		return [hue, saturation, lightness];
	}

	static hslToRgb = (h:number,s:number,l:number) => {
		const C = (1 - Math.abs(2 * l - 1)) * s;
		const hPrime = h / 60;
		const X = C * (1 - Math.abs(hPrime % 2 - 1));
		const m = l - C/2;
		const withLight = (r:number,g:number,b:number) => [r+m, g+m, b+m];
		if (hPrime <= 1) { return withLight(C,X,0); } else
		if (hPrime <= 2) { return withLight(X,C,0); } else
		if (hPrime <= 3) { return withLight(0,C,X); } else
		if (hPrime <= 4) { return withLight(0,X,C); } else
		if (hPrime <= 5) { return withLight(X,0,C); } else
		if (hPrime <= 6) { return withLight(C,0,X); }
	}

	static rgbToObject = (r:number,g:number,b:number) => {
		const [hue, saturation, lightness] = Color.rgbToHsl(r,g,b);
		return {r, g, b, hue, saturation, lightness};
	}
}
