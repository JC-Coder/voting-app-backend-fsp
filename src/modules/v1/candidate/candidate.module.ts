import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './schema/candidate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Candidate.name, schema: CandidateSchema}])
  ],
  controllers: [CandidateController],
  providers: [CandidateService]
})
export class CandidateModule {}
