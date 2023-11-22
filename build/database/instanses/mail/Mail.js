"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = void 0;
const nodemailer = __importStar(require("nodemailer"));
const fs = __importStar(require("fs"));
const index_interface_1 = __importDefault(require("../../../config/index.interface"));
class Mail {
    sendRegistrationEmail() {
        throw new Error('Method not implemented.');
    }
    sendInviteUserEmail(email, firstName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sub = 'Welcome to PhillysBestPizza';
            try {
                let html = fs.readFileSync(`${process.env.NODE_PATH}/resources/templates/InviteUserTemplate.html`, 'utf-8');
                html = html.replace('{{ name }}', firstName);
                html = html.replace('{{ Setup Link }}', `${index_interface_1.default.app.frontend.baseUrl}${index_interface_1.default.app.frontend.accountSetup}?email=${email}&token=${token}`);
                yield Mail.sendMail(email, sub, html);
            }
            catch (error) {
                console.log(error, 'error');
                throw new Error(`Fail to send mail`);
            }
        });
    }
    static sendMail(to, sub, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer.createTransport({
                host: index_interface_1.default.email.host,
                port: index_interface_1.default.email.port,
                secure: index_interface_1.default.email.secure,
                auth: {
                    user: index_interface_1.default.email.auth.user,
                    pass: index_interface_1.default.email.auth.pass,
                },
            });
            // send mail with defined transport object
            yield transporter.sendMail({
                from: index_interface_1.default.email.fromEmail,
                to: to,
                subject: sub,
                html: html,
            });
        });
    }
}
exports.Mail = Mail;
//# sourceMappingURL=Mail.js.map