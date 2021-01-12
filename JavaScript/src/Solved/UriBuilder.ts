// https://www.codewars.com/kata/51eead3461ccf7db04000017/solutions/javascript
class UriBuilder {
    params: any = {};

    constructor(private uri: string) {
        this.parse();
    }

    build() {
        const params = [];
        for (const key in this.params) {
            params.push(key + '=' + escape(this.params[key]));
        }
        if (params.length > 0) {
            return `${this.uri}?${params.join('&')}`;
        }
        else{
            return this.uri;
        }
    }

    private parse() {
        const uri = this.uri.split('?');
        this.uri = uri[0];
        if (uri.length > 0) {
            const params = uri[1];
            params.split('&').forEach(param => {
                const [key, value] = param.split('=');
                this.params[key] = value;
            });
        }
    }
}

var root = 'http://www.codewars.com'
// var builder = new UriBuilder(root + '?a=1')
var builder = new UriBuilder(root + '?a=1&b=2 3')
builder.params.a = 7;
// builder.params.b = 88;
console.log(builder);
console.log(builder.build());

