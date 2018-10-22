import * as TypeOrm from '../src/';
import { BaseNote } from './baseNote';


export class BasePerson {
    @TypeOrm.PrimaryGeneratedColumn()
    public id: number;

    @TypeOrm.Column({
        nullable: true,
    })
    public name: string;

    @TypeOrm.OneToMany(type => BaseNote, note => note.owner, { lazy: true })
    public notes: Promise<BaseNote[]> | BaseNote[];
}
