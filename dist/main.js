"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const fs = require('fs');
    const keyFile = fs.readFileSync(__dirname + '/../ssl/philosophism.org-key.pem');
    const certFile = fs.readFileSync(__dirname + '/../ssl/philosophism.org.pem');
    const httpsapp = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            key: keyFile,
            cert: certFile,
        }
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: false });
    app.use((0, body_parser_1.json)({ limit: '10mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    await app.listen(80);
}
bootstrap();
//# sourceMappingURL=main.js.map