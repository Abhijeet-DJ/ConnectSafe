import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService{
    private readonly saltRounds = 12;
    
    async hashPass(pass : string) : Promise<string> {
        const hashPass = await bcrypt.hash(pass,this.saltRounds)
        return hashPass;
    }
    
    async comparePass(pass : string , hashPass : string) : Promise<boolean> {
        const isMatch = await bcrypt.compare(pass , hashPass)
        return isMatch
    }
}