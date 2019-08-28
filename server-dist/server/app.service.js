"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Does it now?';
    }
    getNew() {
        return {
            message: 'What happens if I return an obj?'
        };
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map