interface Name {
    name: string;
}

interface  PersonWithBirth extends Name {
    placeOfBirth: string;
    dateOfBirth: Date;
}

type Person = Name | PersonWithBirth;

function eulogize (p: Person) {
    if ('placeOfBirth' in p) {
        p;
        const {dateOfBirth} = p;
    }
}

// function pluck(records: any[], key: string): any[] {
//     return records.map(r => r[key]);
// }

interface Album {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: 'live' | 'recording';
}
type K = keyof Album;

function pluck<T, K extends keyof T>(records: T[], key: K): T[K][]{
    return records.map(r => r[key]);
}

const albums:Album[] = [{ artist: 'sh', title: '1 to 3', releaseDate: new Date(), recordingType: 'live'}]
const releaseDates = pluck(albums, 'releaseDate'); // (string | Date) []; -> Date[]
const recordingTypes = pluck(albums, 'recordingType');
const artists = pluck(albums, 'artist');