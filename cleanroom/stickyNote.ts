import * as TypeOrm from '../src/';

import { BaseNote } from './baseNote';
import { Author } from './author';

@TypeOrm.ChildEntity()
export class StickyNote extends BaseNote {
    @TypeOrm.Column()
    public stickyNoteLabel: string;

    @TypeOrm.ManyToOne(type => Author, author => author.notes, { lazy: true })
    public owner: Promise<Author> | Author;
}
