"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.AuthStatus = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
var AuthStatus;
(function (AuthStatus) {
    AuthStatus[AuthStatus["MissingUser"] = 0] = "MissingUser";
    AuthStatus[AuthStatus["BadPassword"] = 1] = "BadPassword";
    AuthStatus[AuthStatus["Succeeded"] = 2] = "Succeeded";
})(AuthStatus = exports.AuthStatus || (exports.AuthStatus = {}));
let AuthService = class AuthService {
    constructor(client) {
        this.client = client;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return await this.validateRequest(request);
    }
    async validateRequest(request) {
        if (request == undefined || request.headers == undefined) {
            console.log("authentication request failed because of missing value");
            return false;
        }
        let email = request.headers["email"];
        let participant_id = request.headers["id"];
        if (email == null || participant_id == null) {
            return false;
        }
        let id = request.headers;
        console.log("headers: " + JSON.stringify(request.headers));
        let authres = await this.verify_user({ email: email, participant_id: participant_id });
        if (authres.user != null) {
            console.log("authentication request succeeded");
            return true;
        }
        return false;
    }
    async verify_user(userRequest) {
        try {
            console.log("user with email: " + userRequest.email + " attempting to authenticate");
            const user = await this.client.participants.findFirst({
                where: {
                    email: userRequest.email
                },
            });
            if (userRequest.participant_id == user.id) {
                return {
                    status: AuthStatus.Succeeded,
                    message: "Ok",
                    user: user,
                };
            }
            else {
                return {
                    status: AuthStatus.BadPassword,
                    message: "incorrect participant id",
                    user: null,
                };
            }
        }
        catch (reason) {
            console.log('reason: ' + JSON.stringify(reason));
            return {
                status: AuthStatus.MissingUser,
                message: "missing user",
                user: null,
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map