import { IsMongoId, IsString, IsUrl } from "class-validator";

export class CreateMessageDto {
    @IsString()
    content : string

    @IsUrl()
    mulMedUri : string

    @IsMongoId()
    sender : string

    @IsMongoId()
    reciever : string
}
