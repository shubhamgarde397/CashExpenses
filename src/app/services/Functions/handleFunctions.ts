import { HttpHeaders } from '@angular/common/http';

export class handleFunction {
    private headerPost: HttpHeaders;
    public yearNames = [];
    public days = [];
    private date = new Date();
    private monthNames = [];
    genaratemonthNames() {
        return this.monthNames = ["January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    }

    generateYears() {
        for (let i = 0; i < 100; i++) {
            this.yearNames.push(this.date.getFullYear() + i)
        }
        return this.yearNames;
    }
    generateDays() {
        for (let i = 1; i < 32; i++) {
            this.days.push(i);
        }
        return this.days;
    }
    createHeader() {
        this.headerPost = new HttpHeaders();
        this.headerPost.append('Content-Type', 'application/x-www-form-urlencoded');
    }
}
