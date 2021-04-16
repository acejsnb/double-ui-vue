class CountMonth {
    constructor(date) {
        if (date) {
            const [year, month] = date.split('.');
            this.Y = year;
            this.M = month || '';
        } else {
            this.countNowMonth();
        }

        this.monthsArray = []; // 当前年数组
    }

    /**
     * 获取当前年、月
     * @return {array}
     */
    countNowMonth() {
        const date = new Date();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const month = m < 10 ? `0${m}` : `${m}`;
        const year = y.toString();
        this.M = month;
        this.Y = year;
        return [year, month];
    }

    getMonthsArray() {
        const arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push({
                year: this.Y, month: i < 10 ? `0${i}` : `${i}`, monthText: `${i}月`, selected: '', multiple: '', disabled: ''
            });
        }
        this.monthsArray = arr;
        return arr;
    }
}

export default CountMonth;
