// tslint:disable
Error.stackTraceLimit = Infinity;

import 'reflect-metadata';
import * as TypeOrm from '../src/';
import { PostItNote } from './postItNote';
import { StickyNote } from './stickyNote';
import { BaseNote } from './baseNote';
import { BasePerson } from './basePerson';
import { Person } from './person';
import { Employee } from './employee';
import { Author } from './author';

declare const console: {
    log(...args: any[]): void
    error(...args: any[]): void
}

const connection = TypeOrm.createConnection({
    username: 'root',
    type: 'mysql',
    database: 'foobar',
    entities: [
        BasePerson,
        Person,
        Employee,
        Author,

        BaseNote,
        PostItNote,
        StickyNote,
    ],
    logging: [
        // 'query',
        'error',
    ],
    synchronize: true,
    dropSchema: true,
});

connection.then(async (connection) => {
    try {
        const em = await TypeOrm.getManager(connection.name);
        const repoPerson = connection.getRepository(Person);
        const repoEmployee = connection.getRepository(Employee);
        const repoAuthor = connection.getRepository(Author);
        const repoBaseNote = connection.getRepository(BaseNote);
        const repoPostItNote = connection.getRepository(PostItNote);
        const repoStickyNote = connection.getRepository(StickyNote);

        const employee  = await repoEmployee.create({ name: '1', employeeName: 'a' } as Employee);
        const author    = await repoAuthor.create({ name: '2', authorName: 'b' } as Author);

        await em.save([
            employee,
            author,
        ])

        await repoPostItNote.insert({ postItNoteLabel: '1', owner: employee } as PostItNote);
        await repoStickyNote.insert({ stickyNoteLabel: '2', owner: author } as StickyNote);

        {
            console.log('--- employee - preload notes');
            const res = await repoEmployee.findOne({ relations: [ 'notes' ] });
            console.log(res);
        }

        {
            console.log('--- sticky note - preload owner');
            const res = await repoStickyNote.findOne({ relations: [ 'owner' ] });
            console.log(res);
            console.log(res && await res.owner);
        }

        {
            console.log('--- post it note');
            const note = await repoPostItNote.findOne();
            if (!note) {
                throw new Error('no note');
            }
            console.log(note);
            const empoloyee = await note.owner;
            console.log(empoloyee);
            console.log((await empoloyee.notes)[0]);
        }

        {
            console.log('--- base notes - preload owner');
            const res = await repoBaseNote.find({ relations: [ 'owner' ] });
            console.log(res);
            console.log(await res[0].owner);
            console.log(await res[1].owner);
        }

        {
            console.log('--- persons preload notes');
            const res = await repoPerson.find({ relations: [ 'notes' ] });
            console.log(JSON.stringify(res, null, 2));
            console.log(await res[0].notes);
            console.log(await res[1].notes);
        }

    } finally {
        await connection.close();
    }
}).catch(console.error)
