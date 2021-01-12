// https://www.codewars.com/kata/563fbac924106b8bf7000046/solutions/javascript
function generateBC(url, separator) {
	console.log(url);
	url = url
		.replace(/https?:\/\//, "")
		.replace(/#.*/, "")
		.replace(/\?.*/, "")
		.replace(/index.*/, "")
		.replace(/\/$/, "");

	const omits = ["the", "of", "in", "from", "by", "with", "and", "or", "for", "to", "at", "a"];
	const parts = url.split('/');
	if (parts.length == 1) {
		return '<span class="active">HOME</span>';
	}
	else {
		const bc = [];
		parts.shift();
		bc.push('<a href="/">HOME</a>');
		let span = parts.pop();
		if (span == undefined) {
			span = "";
		}
		if (span.startsWith('index')) {
			span = parts.pop();
			if (span == undefined) {
				span = "";
			}
		}
		else {
			span = span.split('.')[0];
		}
		span = `<span class="active">${transform(span)}</span>`;
		for (let index = 0; index < parts.length; index++) {
			const href = parts.slice(0, index + 1).join('/');
			bc.push(`<a href="/${href}/">${transform(parts[index])}</a>`);
		}

		if (span != undefined && span.length > 0) {
			bc.push(span);
		}
		return bc.join(separator);
	}

	function transform(str) {
		const length = str.length;
		if (length > 30) {
			const array = str.split('-');
			return array.filter(s => omits.every(w => w != s)).reduce((a, b) => a + b[0].toUpperCase(), "");
		}
		else {
			return str.replace(/-/g, ' ').toUpperCase();
		}
	}
}

function test(url) {
	console.log(generateBC(url, ' * '));
}

function testPrint(...args) {
	console.log(...args);
}

const input1 = "mysite.com/pictures/holidays.html";
const input2 = "www.codewars.com/users/GiacomoSorbi";
const input3 = "www.microsoft.com/important/confidential/docs/index.htm#top";
const input4 = "mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp";
const input5 = "www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi";


const inputE0 = "www.agcpartners.co.uk/index.html";
const inputE1 = "www.agcpartners.co.uk/";
const inputE2 = "www.agcpartners.co.uk";
const inputE3 = "http://google.ca/meningitis-at-diplomatic-by-bladder-from-to-at-to-skin-bioengineering";
const inputE4 = "github.com#info?referral=CodeWars";
const inputE5 = "agcpartners.co.uk/and-research-in-and-surfer-bladder/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/diplomatic-biotechnology/issues/giacomo-sorbi.php#info?hack=off";
const inputE6 = "https://www.google.ca";
const inputE7 = "www.codewars.com/users/GiacomoSorbi?ref=CodeWars";
const inputE8 = "https://www.linkedin.com/in/giacomosorbi";

const inputE9 = "facebook.fr/with-a-immunity-transmutation-bed-pippi-meningitis";

const inputE10 = "https://www.agcpartners.co.uk/from-uber-from-by-research-for/test.html";

// test(input1);
// test(input2);
// test(input3);
// test(input4);
// test(input5);
// test(input6);
// test(input7);

// test(inputE0);
// test(inputE1);
// test(inputE2);
// test(inputE3);
// test(inputE4);
// test(inputE5);
// test(inputE6);
// test(inputE7);
// test(inputE8);
// test(inputE9);
test(inputE10);
