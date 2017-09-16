const app = {
    selector: 'app',
    template: '<navigation></navigation><view></view>'
};

const nav = {
    selector: 'navigation',
    template: '<a href="/#/"> Main</a> <a href="/#/second"> Second</a>'
};

const mainPage = {
    route: '/',
    selector: 'main-page',
    template: '<h1>Main Page</h1> <pre>{{ test }}</pre>',
    script: function () {
        // x(this.selector).html(x(this.selector).html().replace('{{ test }}', 'test'));
        x(this.selector).html(this.template.replace('{{ test }}', 'lolo'))
    }
};

const secondPage = {
    route: '/second',
    selector: 'second-page',
    template: '<h1>Second Page</h1>'
};

new Yavir({
    el: 'app',
    components: [app, nav, mainPage, secondPage]
}).run();