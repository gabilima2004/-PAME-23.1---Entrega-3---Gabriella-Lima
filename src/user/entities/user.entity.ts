import { Prod } from 'src/prod/entities/prod.entity'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string

    /*Se for funcionário é true, se for cliente é false*/
    @Column()
    isfuncionario:boolean

    @Column()
    createdAt:Date

    @OneToMany(() => Prod, prod => prod.user)
    prod: Prod[]

    /*VER SE TEM MAIS ALGUM LEGAL PRA FAZER */
}
