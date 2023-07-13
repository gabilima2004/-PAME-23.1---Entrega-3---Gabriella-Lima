import { User } from 'src/user/entities/user.entity'
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity({name: 'prod'})
export class Prod{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    type:string

    @Column()
    price:number

    @Column()
    size: string

    @Column()
    quantity:number

    @ManyToOne(() => User, user => user.prod)
    user: User

}

