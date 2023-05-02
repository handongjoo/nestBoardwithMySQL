import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Get('articles')
    async getArticles() {
        return await this.boardService.getArticles()
    }

    @Post('article')
    async createArticle(@Body() data: {title: string; content: string;}) {
        return this.boardService.createArticle(
            data.title,
            data.content
        )
    }
}
