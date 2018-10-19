import * as TypeOrm from '../src/';

import { BaseNote } from './baseNote';
import { Employee } from './employee';

@TypeOrm.ChildEntity()
export class PostItNote extends BaseNote {
    @TypeOrm.Column()
    public postItNoteLabel: string;

    @TypeOrm.ManyToOne(type => Employee, person => person.notes, { lazy: true })
    public owner: Promise<Employee> | Employee;
}
