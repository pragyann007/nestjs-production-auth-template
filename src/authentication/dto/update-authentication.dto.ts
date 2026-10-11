import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthenticationDto } from './register.dto';

export class UpdateAuthenticationDto extends PartialType(CreateAuthenticationDto) { }
