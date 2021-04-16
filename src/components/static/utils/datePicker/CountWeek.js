/**
 * 计算周
 * date 时间-年 '2019.11'
 * sort 排序规则【year-按照年排序（默认），month-按照月排序】
 */
import CountNowDate from './CountNowDate';

class CountWeek {
    constructor({ date = '', sort = 'year' }) {
        if (date) {
            if (date.includes('-')) {
                const reg = /[.]/g;
                const [sd, ed] = date.split('-');
                if (ed.replace(reg, '') - sd.replace(reg, '') < 6) {
                    // 一周时间必须等于七天
                    console.error('Date error, there must be seven days in a week.');
                    return;
                }
                const [year, month] = sd.split('.');
                this.Y = year;
                this.M = month;
            } else {
                const [year, month] = date.split('.');
                this.Y = year;
                this.M = month;
            }
        } else {
            this.countNowDate();
        }
        this.date = date;
        this.sort = sort;

        this.weeksArray = [];
    }

    /**
     * 判断平年 闰年
     * @param year
     * @returns {boolean} true - 闰年， false - 平年
     */
    static leapYear(year) {
        return (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0));
    }

    /**
     * 计算当前年月
     * @return {*[]}
     */
    countNowDate() {
        const [YY, MM] = CountNowDate();
        this.Y = YY;
        this.M = MM;
        return [YY, MM];
    }

    /**
     * 上个月遗留的天数
     * @param Y
     * @param M
     * @return {Number}
     */
    static legacyLastMonthDay(Y, M) {
    // 本月第一天是周一，上月余下1天，以次类推 (0:0 - 表示周几比剩余天数, 0:6-表示周日:6天)
        const prevMLeft = {
            0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5
        };

        // 真实月为8，则计算机中月为7，所以月需要减1
        const firstDW = new Date(Y, M - 1, 1).getDay(); // 本月第一天是星期几，返回0-6，对应周日-周六
        return prevMLeft[firstDW]; // 上个月遗留的天数
    }

    /**
     * 计算一年一共有几周
     * @param Y
     * @param M
     * @return {number}
     */
    static weekTotalByYear(Y, M) {
        const days = CountWeek.leapYear(Y) ? 366 : 365;
        const lDays = CountWeek.legacyLastMonthDay(Y, M); // 上一月剩余的天数

        return Math.ceil((days - lDays) / 7);
    }

    /**
     * 计算一个月一共有几周
     * @param Y
     * @param M
     * @param D
     * @return {number}
     */
    static weekNumByMonth(Y, M, D) {
        const nowDate = new Date(Y, Number(M) - 1, D); // 当前日期
        const firstDay = new Date(Y, Number(M) - 1, 1); // 当月第一天
        const dayOfWeek = firstDay.getDay(); // 当月第一天是星期几
        let spendDay; // 第一周第一天是几号
        if (dayOfWeek > 1) spendDay = 7 - dayOfWeek + 1 + 1;
        else if (dayOfWeek === 1) spendDay = 1;
        else spendDay = 2;
        const startDay = new Date(Y, Number(M) - 1, spendDay);
        const d = Math.ceil((nowDate.valueOf() - startDay.valueOf()) / 86400000);
        const result = Math.ceil(d / 7);
        return result + 1;
    }

    /**
     * 获取当前是第几周-周一为每周的第一天
     * @param Y
     * @param M
     * @param D
     * @returns {number}
     */
    static getWeekByYear(Y, M, D) {
        const nowDate = new Date(Y, Number(M) - 1, D); // 当前日期
        const firstDay = new Date(Y, 0, 1); // 当年第一天
        const dayOfWeek = firstDay.getDay(); // 当前年第一天是星期几
        let spendDay; // 第一周第一天是几号
        if (dayOfWeek) {
            if (dayOfWeek > 1) spendDay = 7 - dayOfWeek + 1 + 1;
            else spendDay = 1;
        } else {
            spendDay = 2;
        }
        const startDay = new Date(Y, 0, spendDay);
        const d = Math.ceil((nowDate.valueOf() - startDay.valueOf()) / 86400000);
        const result = Math.ceil(d / 7);
        return result + 1;
    }

    /**
     * 把数组拆分成7个一组
     * @param ls 周数据列表-按照年排序
     */
    sliceArrayForYear(ls) {
        const len = 7; const { Y } = this; const
            { M } = this; // 长度
        const result = [];
        for (let i = 0, lsLen = ls.length; i < lsLen; i += len) {
            const weeks = ls.slice(i, i + len);
            const {
                year, month, day, flag
            } = weeks[0];
            const ind = CountWeek.getWeekByYear(year, month, day);
            let th = null;

            if (Y === year) {
                th = ind;
            } else if (Y > year) {
                th = CountWeek.weekTotalByYear(Y, M); // 上一年最后一周
            } else {
                th = 1;
            }

            result.push({
                weeks,
                selected: '',
                multiple: '',
                year,
                month,
                th,
                thText: `${year}第${th < 10 ? `0${th}` : th}周`,
                flag // 是否是其他月的周 p-其他月的周，n-当前月的周
            });
        }

        return result;
    }

    /**
     * 把数组拆分成7个一组
     * @param ls 周数据列表-按照月排序
     */
    static sliceArrayForMonth(ls) {
        const len = 7; // 长度
        const result = [];
        for (let i = 0, lsLen = ls.length; i < lsLen; i += len) {
            const weeks = ls.slice(i, i + len);
            const {
                year, month, day, flag
            } = weeks[0];
            const th = CountWeek.weekNumByMonth(year, month, day);

            result.push({
                weeks,
                selected: '',
                multiple: '',
                year,
                month,
                th,
                thText: `${year}.${month}第${th < 10 ? `0${th}` : th}周`,
                flag // 是否是其他月的周 p-其他月的周，n-当前月的周
            });
        }
        return result;
    }

    /**
     * 计算天数组
     * @param M 月
     * @param F 标识符 n-表示正常显示，p-表示上月遗留的天或下月在当前月的天
     * @returns {Array}
     */
    dayCode(M, F) {
    // 遍历一个月的数字
        const num = new Date(this.Y, M, 0).getDate(); // 获取某月总天数
        const y = this.Y,
            m = M;
        let yy = y,
            mm = m < 10 ? `0${m}` : `${m}`;
        if (m === 0) {
            // 上一年12月
            yy = `${y - 1}`;
            mm = '12';
        }
        if (m === 13) {
            // 下一年1月
            yy = `${Number(y) + 1}`;
            mm = '01';
        }
        const arr = [];
        for (let i = 1; i <= num; i++) {
            // n表示正常显示
            arr.push({
                flag: F, year: yy, month: mm, day: i < 10 ? `0${i}` : `${i}`
            });
        }
        return arr;
    }

    // 计算本月第一天是周几，得到上月遗留天数 PY-上一年
    countPrevWeek(M, F) {
        const mds = this.dayCode(M - 1, F); // 得到上月的天数组
        // 本月第一天是周一，上月余下1天，以次类推 (0:0 - 表示周几比剩余天数, 0:6-表示周日:6天)
        const prevMLeft = {
            0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5
        };

        // 真实月为8，则计算机中月为7，所以月需要减1
        const firstDW = new Date(this.Y, M - 1, 1).getDay(); // 本月第一天是星期几，返回0-6，对应周日-周六
        const co = prevMLeft[firstDW]; // Carryover 上个月遗留的天数

        return co ? mds.slice(-co) : [];
    }

    // 多维数组转一维数组
    flatten(arr) {
        return [].concat(...arr.map((d) => (Array.isArray(d) ? this.flatten(d) : d)));
    }

    // 计算周
    getWeeksArray() {
        const m = Number(this.M);
        const da = [...this.countPrevWeek(m, 'p'), ...this.dayCode(m, 'n')];
        const na = this.dayCode(m + 1, 'f');

        const res = this.flatten([...da, ...na.slice(0, 42 - da.length)]);

        const arr = this.sort === 'year'
            ? this.sliceArrayForYear(res)
            : CountWeek.sliceArrayForMonth(res);

        this.weeksArray = arr;
        return arr;
    }

    /**
     * 设置年月
     * @param Y
     * @param M
     */
    setYearMonth(Y, M) {
        this.Y = Y;
        this.M = M;
    }

    /**
     * 年改变计算周
     * @param Y
     * @param M
     * @param sort 排序方式
     */
    yearChangeCountWeek(Y, M, sort) {
        this.Y = Y;
        this.M = M;
        this.sort = sort;
        return this.getWeeksArray();
    }
}

export default CountWeek;
