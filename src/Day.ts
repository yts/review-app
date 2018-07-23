export default class Day {
  public static fromNow(): Day {
    const now = new Date();
    return Day.fromDate(now);
  }

  public static fromDate(date: Date): Day {
    return Day.fromDateNumbers(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  public static fromDateNumbers(year: number, month: number, day: number): Day {
    const UTCTimestamp = Date.UTC(year, month, day);
    return new Day({ UTCTimestamp });
  }

  private UTCTimestamp: number;

  constructor({ UTCTimestamp }: { UTCTimestamp: number }) {
    this.UTCTimestamp = UTCTimestamp;
  }

  public value(): number {
    return this.UTCTimestamp;
  }

  public toDate(): Date {
    const UTCDate = new Date(this.UTCTimestamp);
    return new Date(
      UTCDate.getUTCFullYear(),
      UTCDate.getUTCMonth(),
      UTCDate.getUTCDate()
    );
  }

  public addDays(days: number): Day {
    const date = this.toDate();
    date.setDate(date.getDate() + days);
    return Day.fromDate(date);
  }

  public toString() {
    return this.toDate().toLocaleDateString();
  }
}
