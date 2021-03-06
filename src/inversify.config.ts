import { UsersController } from '@/controllers';
import { IUsersController } from '@/controllers/types';

import { AuthService } from '@/services';
import { IAuthService } from '@/services/types';

import { UserRoleService } from '@/services';
import { IUserRoleService } from '@/services/types';

import { UserProfileService } from '@/services';
import { IUserProfileService } from '@/services/types';

import { RecipesController } from '@/controllers';
import { IRecipesController } from '@/controllers/types';

import { InventoryController } from '@/controllers';
import { IInventoryController } from '@/controllers/types';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

const container: Container = new Container();
container.bind<IInventoryController>(TYPES.IInventoryController).to(InventoryController);
container.bind<IRecipesController>(TYPES.IRecipesController).to(RecipesController);
container.bind<IUserProfileService>(TYPES.IUserProfileService).to(UserProfileService);
container.bind<IUserRoleService>(TYPES.IUserRoleService).to(UserRoleService);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IUsersController>(TYPES.IUserController).to(UsersController);

// container.bind<IAuthService>(TYPES.IAuthService).toConstructor(UsersController);

export { container };
