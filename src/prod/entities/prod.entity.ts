import { User } from 'src/user/entities/user.entity'
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity({name: 'prod'})
export class Prod{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    type:string

    @Column()
    price:number

    /*FAZER O SIZE*/
    @Column()
    size 

    @Column()
    quantity:number

    @ManyToOne(() => User, user => user.prod)
    user: User

    /*VER SE TEM MAIS ALGUM LEGAL PRA FAZER */
}

