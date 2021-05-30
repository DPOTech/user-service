import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class UserConsumerController {
  constructor() { }

  @EventPattern('user-signup')
  async getNotifications(data: Record<string, unknown>) {
    
  }
}
