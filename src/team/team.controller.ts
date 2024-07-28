import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return await this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamService.findOne(id);

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return await this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.teamService.remove(id);
  }
}