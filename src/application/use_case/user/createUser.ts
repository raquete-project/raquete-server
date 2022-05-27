import User from '@domain/user/User';
import IUserRepository from '@domain/user/IUserRepository';
import { SkillLevel } from '@domain/@types/SkillLevel';
import { encrypt } from '@infrastructure/utils/bcrypt/crypt';

export default (
    userRepository: IUserRepository,
    name: string,
    email: string,
    password: string,
    skillLevel: SkillLevel,
    score: number,
    locationId: string,
    userId?: string
) => {
    const user = new User(
        name,
        email,
        encrypt(password),
        skillLevel,
        score,
        locationId,
        userId
    );
    return userRepository.createUser(user);
};
