import * as TypeOrm from '../src/';

import { BasePerson } from './basePerson';

@TypeOrm.Entity({ name: 'person' })
export class Employee extends BasePerson {
    @TypeOrm.Column({
        nullable: true,
    })
    public employeeName: string;
}
