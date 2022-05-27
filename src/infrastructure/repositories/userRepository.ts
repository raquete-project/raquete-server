import IUserRepository from '@domain/user/IUserRepository';
import User from '@domain/user/User';
import { getRepository } from 'typeorm';
import { compare } from '@infrastructure/utils/bcrypt/crypt';

class UserRepository implements IUserRepository {
    async findAllUsers() {
        const repository = getRepository(User);

        return await repository.query(`SELECT * FROM users`);
    }

    async createUser(user: User) {
        const repository = getRepository(User);
        const existsUser = await repository.query(
            `SELECT "userId" FROM users WHERE email = '${user.email}'`
        );

        if (existsUser.length >= 1) {
            return {
                status: 'error',
                message: 'Duplicate user',
                payload: null,
            };
        }
        return await repository.query(
            `INSERT INTO users (name, email, password, "skillLevel", score, "locationId") VALUES ('${user.name}', '${user.email}', '${user.password}', '${user.skillLevel}', '${user.score}', '${user.locationId}') RETURNING *`
        );
    }

    async checkUserLogin({ email, password }) {
        const repository = getRepository(User);
        const user = await repository.query(
            `SELECT "userId", password FROM users WHERE email = '${email}'`
        );

        const { password: encryptedPassword } = user[0];
        delete user[0].password;

        if (compare(password, encryptedPassword)) {
            return user[0].userId;
        } else {
            return null;
        }
    }
}

export default new UserRepository();
