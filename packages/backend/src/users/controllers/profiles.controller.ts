import { Controller } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  find() {
    return this.profilesService.find();
  }

  @Get(':id')
  findById() {
    return this.profilesService.findById();
  }

  @Get('count')
  count() {
    return this.profilesService.count();
  }

  @Post()
  create() {
    return this.profilesService.create();
  }

  @Put(':id')
  update() {
    return this.profilesService.update();
  }

  @Patch(':id')
  updateProperty() {
    return this.profilesService.updateProperty();
  }

  @Delete(':id')
  remove() {
    this.profilesService.remove();
  }
}
