import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post('article')
    async createArticle(@Body() data: {author: string, title: string; content: string;}) {
        return this.boardService.createArticle(
            data.author,
            data.title,
            data.content
        )
    }

    @Get('articles')
    async getArticles() {
        return await this.boardService.getArticles()
    }

    @Patch('article/:id')
    async updateArticle(@Param('id') id: number, @Body() data: {title: string, content: string}) {
        return this.boardService.updateArticle(
            id,
            data.title,
            data.content
        )
    }

    @Delete('article/:id')
    async deleteArticle(@Param('id') id: number) {
        return this.boardService.deleteArticle(id)
    }
}
