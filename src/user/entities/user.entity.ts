import { Prod } from 'src/prod/entities/prod.entity'
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'user'})
export class User {

    //Método para gerar o id
    @PrimaryGeneratedColumn()
    id:number

    //Adicionar um username
    @Column()
    username:string

    //Adicionar uma senha
    @Column()
    password:string

    //Determinar o tipo: se for administrador é true, se for cliente é false
    @Column()
    isAdmin:boolean

    //Saber a data que o username foi criado
    @Column()
    createdAt:Date

    //Relacionar os produtos e o usuario
    @OneToMany(() => Prod, prod => prod.user)
    prod: Prod[]

    //Armazenar as associações entre os registros de usuários e produtos
    @ManyToMany(() => Prod)
    @JoinTable()
    produtos: Prod[];

}
