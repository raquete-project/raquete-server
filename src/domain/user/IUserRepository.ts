import User from './User';

export default interface IUserRepository {
    findAllUsers(): Promise<any>;
    createUser(user: User): Promise<any>;
    checkUserLogin({ email, password }): Promise<any>;
}
