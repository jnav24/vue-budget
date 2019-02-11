import * as moment from 'moment';
import * as momentTz from 'moment-timezone';

class TimestampService {
    public getCurrentTimestamp(timezone: string = 'UTC', format: string = 'YYYY-MM-DD hh:mm A'): string {
        if (timezone.trim() === '') {
            timezone = 'UTC';
        }

        return momentTz.tz(moment(), timezone).format(format);
    }

    public convertTimestamp(timestamp: string, timezone: string, format: string = 'YYYY-MM-DD hh:mm A'): string {
        const utcTime = momentTz.tz(timestamp, 'UTC');
        return utcTime.clone().tz(timezone).format(format);
    }

    public format(value: string = '', format: string = 'YYYY-MM-DD hh:mm A'): string {
        if (value.trim() === '') {
            return moment().format(format);
        }

        return moment(value).format(format);
    }

    public unix(value: string = '') {
        if (value.trim() === '') {
            return moment().unix();
        }

        return moment(value).unix();
    }

    public generateUnixId(): number {
        return (this.unix() * Math.round(Math.random() * 100)) + 1;
    }

    public getAllTimeZones() {
        return momentTz.tz.names()
            .reduce((memo: Array<{ name: string; offset: number }>, tz: string) => {
                memo.push({
                    name: tz,
                    offset: momentTz.tz(tz).utcOffset(),
                });

                return memo;
            }, [])
            .sort((a: any, b: any) => {
                return a.offset - b.offset;
            })
            .map((tz: { name: string; offset: number; }): {  label: string; value: string } => {
                const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';
                return { label: `(GMT ${timezone}) ${tz.name}`, value: tz.name};
            });
    }

    public getUSATimeZones() {
        return [
            { label: '(GMT-4) Atlantic Time (US & Canada)', value: 'America/Puerto_Rico' },
            { label: '(GMT-5) Eastern Time (US & Canada)', value: 'America/New_York' },
            { label: '(GMT-6) Central Time (US & Canada)', value: 'America/Chicago' },
            { label: '(GMT-7) Mountain Time (US & Canada)', value: 'America/Phoenix' },
            { label: '(GMT-8) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
            { label: '(GMT-9) Alaska', value: 'America/Anchorage' },
            { label: '(GMT-10) Hawaii', value: 'Pacific/Honolulu' },
        ];
    }

    public getTimeDifference(from: string, to: string = ''): string {
        let end = moment();
        const start = moment(from);

        if (to.trim() !== '') {
            end = moment(to);
        }

        if (!start.isValid() || !end.isValid()) {
            return '00:00:00';
        }

        const diff = end.diff(start);
        const days = moment.duration(diff).days();
        const hours = this.setDoubleDigits((24 * days) + moment.duration(diff).hours());
        const minutes = this.setDoubleDigits(moment.duration(diff).minutes());
        const seconds = this.setDoubleDigits(moment.duration(diff).seconds());
        return `${hours}:${minutes}:${seconds}`;
    }

    public getTimeDiffWithTimezoneConversion(time: string, timezone: string): string {
        const to = this.getCurrentTimestamp(timezone, 'YYYY-MM-DD HH:mm:ss');
        const from = this.convertTimestamp(
            time,
            timezone,
            'YYYY-MM-DD HH:mm:ss',
        );

        return this.getTimeDifference(from, to);
    }

    public getMonth(val: number, timestamp: string = '') {
        if (timestamp.trim() === '') {
            return moment().add(val, 'months').format();
        }

        return moment(timestamp).add(val, 'months').format();
    }

    public getYear(val: number, timestamp: string = '') {
        if (timestamp.trim() === '') {
            return moment().add(val, 'years').format();
        }

        return moment(timestamp).add(val, 'years').format();
    }

    public setDoubleDigits(int: number): string {
        if (int < 10) {
            return '0' + int;
        }

        return int.toString();
    }
}

export default TimestampService;
