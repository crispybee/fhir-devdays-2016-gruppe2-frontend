export class DateToAge {
    year: string;
    month: string;
    day: string;

    constructor(private inputDate: string) {
        let splitDate = inputDate.split('-');
        this.year = splitDate[0];
        this.month = splitDate[1];
        this.day = splitDate[2];        
    }

    getAge(): number {
        // calculate the milliseconds since birth date (ms since 1970 to today minus ms between 1970 and birth date)
        let dateMilliseconds: number = Date.now() - new Date(parseInt(this.year), parseInt(this.month), parseInt(this.day)).getTime();

        // remove numbers after floating point
        let age = Math.trunc(dateMilliseconds/31536000000);
        
        return age;
    }

    getReadableDate(): string {
        return this.day + '.' + this.month + '.' + this.year;
    }

    getReadableDateUS(): string {
        return this.month + '.' + this.day + '.' + this.year;
    }
}