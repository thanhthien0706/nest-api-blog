import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleForm } from '../common/form/CreateRole.form';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() roleForm: CreateRoleForm, @Res() res: Response) {
    try {
      const roleData = await this.roleService.createRole(roleForm);

      return roleData;
      // return res.status(HttpStatus.OK).json({
      //   data: roleData,
      // });
    } catch (error) {
      if (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
