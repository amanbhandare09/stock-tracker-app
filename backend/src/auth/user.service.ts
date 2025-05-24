import { Injectable, UnauthorizedException } from '@nestjs/common';
import {User} from './entities/auth.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
 
    
    
    // async createUser(createUserDto: CreateUserDto): Promise<User> {
    //     const { email, password, role } = createUserDto;
    
    //     // Hash the password
    //     const hashedPassword = await bcrypt.hash(password, 10);
    
    //     // Create a new user instance
    //     const user = this.userRepository.create({
    //         email,
    //       password: hashedPassword,
    //       role,
    //     });
    
    //     // Save the user to the database
    //     return this.userRepository.save(user);
    //   }
    private readonly admin = {
        email: 'admin123@gmail.com',
        password: 'admin', // Ideally, this should be hashed
        role: 'admin',
    };

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
   
   
    ) {}
    
         
    
    
async validateAdmin(email: string, password: string): Promise<any> {
    // Find user by username
    const user = await this.findUser(email);

    if (user) {
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = (password===this.admin.password)

        if (isPasswordValid) {
            if (user.role === 'admin') {
                return { ...user, role: 'admin' };
            } else if (user.role === 'user') {
                return { ...user, role: 'user' };
            }
        }
    }
    throw new UnauthorizedException('Invalid credentials');
}

async findUser(email: string): Promise<User | undefined> {
    console.log('Searching for email:', email);

    // Check if the email matches the hardcoded admin
    if (email === this.admin.email) {
        console.log('Admin user found:', this.admin);
        // Simulate returning a User entity
        return {
            email: this.admin.email,
            password: this.admin.password,
            role: this.admin.role,
        } as User;
    }

    // If not found, return undefined
    console.log('User not found for email:', email);
    return undefined;
}
}