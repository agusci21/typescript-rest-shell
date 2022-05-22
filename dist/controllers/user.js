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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const check_if_params_exists_1 = require("../helpers/check_if_params_exists");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        where: {
            state: 1
        }
    });
    res.json({
        users,
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    //Este error no es real
    const { state } = user;
    if (user && state) {
        res.json({
            user,
        });
    }
    else {
        res.status(404).json({
            msg: 'No existe un usuario con id: ' + id
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email } = body;
    try {
        const emailExists = yield (0, check_if_params_exists_1.checkIfEmailExists)(email);
        if (emailExists) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            });
        }
        const user = user_1.default.build(body);
        yield user.save();
        res.status(201).json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno del servidor, hable con el administrador'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { email } = body;
    try {
        const idExist = yield (0, check_if_params_exists_1.checkIfIdExists)(id);
        const emailExist = yield (0, check_if_params_exists_1.checkIfEmailExists)(email);
        if (!idExist) {
            return res.status(404).json({
                msg: "No existe usuario con el id: " + id
            });
        }
        if (emailExist) {
            return res.status(400).json({
                msg: 'El email: ' + email + ' ya esta en uso'
            });
        }
        const user = yield user_1.default.findByPk(id);
        user === null || user === void 0 ? void 0 : user.update(body);
        res.json({
            msg: "Usuario modificado",
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno del servidor, hable con el administrador'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existUser = yield (0, check_if_params_exists_1.checkIfIdExists)(id);
    if (!existUser) {
        return res.status(404).json({
            msg: "No existe usuario con el id: " + id
        });
    }
    const user = yield user_1.default.findByPk(id);
    yield (user === null || user === void 0 ? void 0 : user.update({ state: false }));
    // await user?.destroy() Esto elimina fisicamente el usuario
    res.json({
        msg: 'usuario eliminado',
        user
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map