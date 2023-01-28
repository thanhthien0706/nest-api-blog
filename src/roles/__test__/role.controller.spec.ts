import { Test, TestingModule } from '@nestjs/testing';
import * as mocks from 'node-mocks-http';

import { RoleController } from '../role.controller';
import { RoleService } from '../role.service';

describe('Role Controller', () => {
  let roleController: RoleController;

  const mockRoleService = {
    createRole: jest.fn((roleForm) => {
      return {
        id: 1,
        ...roleForm,
      };
    }),
  };
  let mockRes;
  let mockReq;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService],
    })
      .overrideProvider(RoleService)
      .useValue(mockRoleService)
      .compile();

    roleController = module.get<RoleController>(RoleController);

    mockRes = mocks.createResponse();
    mockReq = mocks.createRequest();
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
  });

  it('should create a role', () => {
    const roleForm = {
      name: 'ROLE_ADMIN',
      description: 'any',
    };
    expect(roleController.createRole(roleForm, mockRes)).toEqual({
      id: 1,
      name: 'ROLE_ADMIN',
      description: 'any',
    });
  });
});
