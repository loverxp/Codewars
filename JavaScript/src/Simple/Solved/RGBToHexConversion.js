function rgb(r, g, b) {
	return hex(r) + hex(g) + hex(b);
}

function hex(d) {
	d = d < 0 ? 0 : d;
	d = d > 255 ? 255 : d;
	s = d.toString(16).toUpperCase();
	if (s.length == 1) {
		s = "0" + s;
	}
	return s;
}

function print(s) {
	console.log(s);
}

print(rgb(0, 0, 0));
print(rgb(0, 0, -20));
print(rgb(300, 255, 255));
print(rgb(173, 255, 47));