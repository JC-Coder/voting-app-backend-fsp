import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Model } from 'mongoose';

export class PaginationParams {
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  skip: number;

  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  totalItems: number;
}

export class PaginationService {
  private model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model;
  }

  async queryDatabase(
    limit?: number,
    query?: any,
    skip?: number,
    populateOptions?: string[],
  ) {
    const queryCondition = query ? query : {};

    if (!limit) {
      return await this.model
        .find(queryCondition)
        .populate(populateOptions)
        .skip(skip);
    } else {
      return await this.model
        .find(queryCondition)
        .populate(populateOptions)
        .limit(limit)
        .skip(skip);
    }
  }

  async paginate(
    query: any,
    paginationParams: PaginationParams,
    populateOptions?: string[],
  ) {
    let { skip, limit } = paginationParams;

    if (!skip) {
      skip = 0;
    }

    if (!limit) {
      limit = 10;
    }

    limit = limit > 100 ? 100 : limit;

    const itemsCount = query
      ? await this.model.count(query)
      : await this.model.count();

    const items = await this.queryDatabase(limit, query, skip, populateOptions);

    const paginationOptions: PaginationOptions = {
      page: Number(skip) + 1,
      limit: Number(limit),
      totalItems: itemsCount,
    };

    return { items, ...paginationOptions };
  }
}
