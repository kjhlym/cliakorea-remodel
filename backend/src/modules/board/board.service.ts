import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardCategory } from '../../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  // 게시글 목록 조회
  async findAll(
    category?: BoardCategory,
    page: number = 1,
    limit: number = 10,
  ) {
    const queryBuilder = this.boardRepository.createQueryBuilder('board');

    if (category) {
      queryBuilder.where('board.category = :category', { category });
    }

    const [items, total] = await queryBuilder
      .orderBy('board.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // 게시글 상세 조회
  async findOne(id: string) {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 조회수 증가
    board.viewCount += 1;
    await this.boardRepository.save(board);

    return board;
  }

  // 게시글 생성
  async create(createBoardDto: {
    title: string;
    content: string;
    category: BoardCategory;
    authorId?: string;
    authorName?: string;
    attachments?: { name: string; url: string }[];
  }) {
    const board = this.boardRepository.create(createBoardDto);
    return await this.boardRepository.save(board);
  }

  // 게시글 수정
  async update(id: string, updateBoardDto: Partial<Board>) {
    const board = await this.findOne(id);
    Object.assign(board, updateBoardDto);
    return await this.boardRepository.save(board);
  }

  // 게시글 삭제
  async remove(id: string) {
    const board = await this.findOne(id);
    await this.boardRepository.remove(board);
    return { message: '게시글이 삭제되었습니다.' };
  }
}

