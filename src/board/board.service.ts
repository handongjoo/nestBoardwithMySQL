import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>
      ) {}

      async getArticles() {
        try {
          const articles = await this.articleRepository.find({
            where: {deletedAt:null},
            select: ["author", "title", "content", "createdAt"]
          })
        } catch (error) {
          console.log(error)
        }
      }

      async createArticle(title:string, content:string) {
        try {
          return await this.articleRepository.insert({title,content})
        } catch (error) {
          console.log(error)
        }
      }
}
