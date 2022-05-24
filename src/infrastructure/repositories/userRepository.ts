import IUserRepository from '@domain/user/IUserRepository';
import User from '@domain/user/User';
import { getRepository } from 'typeorm';
import { compare } from '@infrastructure/utils/bcrypt/crypt';

class UserRepository implements IUserRepository {
    async findAllUsers() {
        const repository = getRepository(User);

        return await repository.find();
    }

    async createUser(user: User) {
        const repository = getRepository(User);
        const existsUser = await repository.findOne({
            where: { email: user.email },
        });

        if (existsUser) {
            return {
                status: 'error',
                message: 'Duplicate user',
                payload: null,
            };
        }

        const newUser = repository.create(user);

        return await repository.save(newUser);
    }

    async checkUserLogin({ email, password }) {
        const repository = getRepository(User);
        const user = await repository.findOne({
            where: { email },
        });

        const { password: encryptedPassword } = user;
        delete user.password;

        if (compare(password, encryptedPassword)) {
            return user;
        } else {
            return null;
        }
    }
}

export default new UserRepository();
