const mongoose = require('mongoose');

const User = require('../models/users');

const user = {
	async getAll() { // ✔️
		let error = { error: 'Usuários não encontrados.' };
		return await User.find() || error;
	},

	async get({ _id }) { // ✔️
		let error = { error: 'Usuário não encontrado.' };
		if (!_id) return error;
		try { return await User.findOne({ _id }); } catch { return error; };
	},
	
	async login({ email, password }) { // ✔️
		let error = { error: 'E-mail ou senha inválidos.' };
		if (!email || !password) return error;
		let user = await User.findOne({ email, password }) || error;
		if (user.error) return error;
		return { authorization: user._id };
	},

	async create({ name, email, password }) { // ✔️
		let error = { error: 'Dados inválidos para criar novo usuário.' };
		if (!name || !email || !password) return error;
		try { return await User.create({ name, email, password }); } catch { return error; };
	},

	async update({ _id, name, email, password }) { // ✔️
		let error = { error: 'Dados inválidos para atualizar esse usuário.' };
		if (!_id || !name || !email || !password) return error;
		try {
			let updated_user = await User.updateOne({ _id }, { $set: { name, email, password } });
			return updated_user.matchedCount ? user.get({ _id }) : error;
		} catch { return error; };
	},

	async delete({ _id }) { // ✔️
		let error = { error: 'Dados inválidos para deletar esse usuário.' };
		if (!_id) return error;
		try {
			let deleted_user = await User.deleteOne({ _id });
			return deleted_user.deletedCount ? 'Usuário deletado com sucesso!' : error;
		} catch { return error; };
	},

	middlewares: { // ✔️
    	authenticated(req, res, next) { // ✔️
			let error = { error: 'Não autorizado. Utilize authorization: helloworld nos headers da requisição para poder ter acesso.' };
			if (req.headers.authorization == 'helloworld') {
				return next();
			} else {
				return res.status(401).send(error);
			};
	    }
    }
};

module.exports = user;