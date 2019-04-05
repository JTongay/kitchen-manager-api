import { BaseRoute } from '@/routes/route';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';


export class InventoryRoutes extends BaseRoute {
  private static instance: InventoryRoutes;

  constructor() {
    super();
    // Initialize the routes
    this.init();
  }

  public static get router(): Router {
    if (!InventoryRoutes.instance) {
      InventoryRoutes.instance = new InventoryRoutes();
    }
    return InventoryRoutes.instance.router;
  }

  private init(): void {
    logger.info('Creating InventoryRoutes');

    // this.router.get('/', this.method);
    // Insert Route methods here
  }
}
