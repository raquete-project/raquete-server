import User from '@domain/user/User';
import IUserRepository from '@domain/user/IUserRepository';
import { SkillLevel } from '@domain/@types/SkillLevel';

export default (
    userRepository: IUserRepository,
    name: string,
    email: string,
    password: string,
    skillLevel: SkillLevel,
    userId?: string
) => {
    const user = new User(
        name,
        email,
        password,
        skillLevel,
        userId
    );
    return userRepository.createUser(user);
};
