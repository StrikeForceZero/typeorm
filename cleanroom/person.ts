import * as TypeOrm from '../src/';

import { BasePerson } from './basePerson';

@TypeOrm.Entity({ name: 'person' })
export class Person extends BasePerson {
    @TypeOrm.Column()
    public name: string;
}
