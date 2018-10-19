import * as TypeOrm from '../src/';

import { BasePerson } from './basePerson';

@TypeOrm.Entity({ name: 'person' })
export class Author extends BasePerson {
    @TypeOrm.Column()
    public authorName: string;
}
