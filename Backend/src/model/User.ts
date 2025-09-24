import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;


    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ length: 255, type: 'varchar' })
    password: string;

    private previousPassword?: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(this.password && this.password != this.previousPassword){
            const salt      = await bcrypt.genSalt(10);

            this.password   = await bcrypt.hash(this.password, salt);
        }
    }

    @AfterLoad()
    setPreviousPassword(){
        this.previousPassword = this.password;
    }


    constructor(email: string, password: string){
        this.email      = email;
        this.password   = password;
    }
}