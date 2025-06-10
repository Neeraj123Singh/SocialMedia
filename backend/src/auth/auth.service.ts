import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: { address: string; signature: string }) {
    const user = await this.usersService.findOrCreate(loginDto.address);
    const token = this.jwtService.sign({ sub: user.id, address: user.wallet_address });
    return { token, user };
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.address);
      return { valid: true, user };
    } catch (error) {
      return { valid: false };
    }
  }

  async verifyWalletSignature(walletAddress: string, signature: string, message: string): Promise<boolean> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
      return false;
    }
  }

  async validateUser(walletAddress: string): Promise<any> {
    return this.usersService.findOrCreate(walletAddress);
  }
} 