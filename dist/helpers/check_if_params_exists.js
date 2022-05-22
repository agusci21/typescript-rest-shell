"use strict";
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
exports.checkIfIdExists = exports.checkIfEmailExists = void 0;
const user_1 = __importDefault(require("../models/user"));
const checkIfEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        return false;
    const emailExist = yield user_1.default.findOne({
        where: {
            email: email
        }
    });
    return emailExist ? true : false;
});
exports.checkIfEmailExists = checkIfEmailExists;
const checkIfIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        return false;
    const idExist = yield user_1.default.findByPk(id);
    return idExist ? true : false;
});
exports.checkIfIdExists = checkIfIdExists;
//# sourceMappingURL=check_if_params_exists.js.map