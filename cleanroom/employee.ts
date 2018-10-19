import * as TypeOrm from '../src/';

import { BasePerson } from './basePerson';

@TypeOrm.Entity({ name: 'person' })
export class Employee extends BasePerson {
    @TypeOrm.Column()
    public employeeName: string;
}
