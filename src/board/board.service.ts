import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>
      ) {}

      async createArticle(author:string, title:string, content:string) {
        try {

          if(!author || !title || !content) {
            throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              message: '모든 항목을 작성해 주세요.'
            }, HttpStatus.BAD_REQUEST);
          }

          await this.articleRepository.insert({author, title,content})

          return {message: "게시글이 작성되었습니다."}

        } catch (error) {
          console.log(error)
        }
      }

      async getArticles() {
        try {
          const articles = await this.articleRepository.find({
            where: {deletedAt:null},
            select: ["author", "title", "content", "createdAt"]
          })
          
          return articles;

        } catch (error) {
          console.log(error)
        }
      }

      async updateArticle(id:number, title: string, content: string) {
        try {
          const checkArticle = await this.articleRepository.findOne({
            where: {id}
          })

          if(!checkArticle) {
            throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              message: '존재하지 않는 게시글 입니다.'
            }, HttpStatus.BAD_REQUEST);
          }

          this.articleRepository.update(id, {
            title,
            content
          })
          return {message: "게시글 수정이 완료되었습니다."}

        } catch (error) {
         console.log(error) 
        }
      }

      async deleteArticle(id: number) {
        try {
          const checkArticle = await this.articleRepository.findOne({
            where: {id}
          })

          if(!checkArticle) {
            throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              message: '존재하지 않는 게시글 입니다.'
            }, HttpStatus.BAD_REQUEST);
          }

          await this.articleRepository.softDelete(id)
          
          return {message: "게시글이 삭제되었습니다."}

        } catch (error) {
          console.log(error)
        }
      }


}
