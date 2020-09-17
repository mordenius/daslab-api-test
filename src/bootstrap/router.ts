const winston = require('winston');
const fs = require('fs');

const Init = async (app, router, routes) => {
    const controllers = {};
    fs.readdirSync(__dirname.replace('bootstrap', 'controllers')).forEach((file) => {
        if (!~file.indexOf('.map')) { // no sourcemaps
            if (~file.indexOf('.ts') || ~file.indexOf('.js')) {
                const controller = require(`../controllers/${file}`); // eslint-disable-line
                const name = file.substring(0, file.length - 3);
                controllers[name] = controller;
            }
        }
    });
    let method;
    let path;
    let ctrl;
    let parsed;
    function parseRoute(routeStr) {
        let ctrl;
        let ctrls;
        const route = routeStr.split(' ');
        const method = route[0].toLowerCase();
        const path = route[1];

        ctrl = [];
        ctrls = route;
        ctrls.splice(0, 2);
        ctrls.forEach((fnStr) => {
            const fn = fnStr.split('.');
            try {
                ctrl.push(controllers[fn[0]][fn[1]]);
            } catch (e) {
                /* istanbul ignore next */
                winston.error('Missing controller', fn[0], fn[1]);
            }
        });

        return [method, path, ctrl];
    }
    routes.forEach((route) => {
        /* istanbul ignore next */
        if (typeof route !== 'object') {
            // String Route
            parsed = parseRoute(route);
            method = parsed[0];
            path = parsed[1];
            ctrl = parsed[2];
        }

        try {
            router[method](path, ctrl);
        } catch (e) {
            /* istanbul ignore next */
            winston.error('Missing route', method, path, parsed);
        }
    });
    app.use(router);
}

export const Router = Init;