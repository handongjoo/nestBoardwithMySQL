import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
      ) {}

      async login(email: string, password: string) {
        const checkUser = await this.userRepository.findOne({
          where: {email, deletedAt: null}
        })

        if(!checkUser.email) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: '존재하지 않는 이메일 입니다.'
          }, HttpStatus.BAD_REQUEST);
        }

        if(password !== checkUser.password) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: '비밀번호가 틀렸습니다..'
          }, HttpStatus.BAD_REQUEST);
        }

        return {message: "로그인이 완료되었습니다."}
      }

      async register(email: string, name: string, password: string) {
        const checkEmail = await this.userRepository.findOne({
          where: {email}
        })
        const checkName = await this.userRepository.findOne({
          where: {name}
        })

        if(checkEmail) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: '이미 가입된 이메일 입니다.',
          }, HttpStatus.BAD_REQUEST);
        }
        if(checkName) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: '이미 존재하는 닉네임 입니다.',
          }, HttpStatus.BAD_REQUEST);
        }
        await this.userRepository.insert({
          email,
          name,
          password
        })
        return {message: "가입이 완료되었습니다."}
      }
}
