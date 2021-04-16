/**
 * 计算天
 * 其它说明：
 *      p-表示上一个月的日期，n-表示当前月的日期，f-表示下一个月的日期
 */
import CountNowDate from './CountNowDate';

class CountDay {
    /**
     * 日期
     * @param date String 2019.10.31
     */
    constructor(date) {
        if (date) {
            const [year, month, day] = date.split('.');
            this.Y = year;
            this.M = month;
            this.D = day;
        } else {
            this.countNowDate();
        }

        this.daysArray = []; // 当前月的天 一维数组
    }

    /**
     * 计算当前日期
     * @returns {{month: *, year: *, day: *}}
     */
    countNowDate() {
        const [year, month, day] = CountNowDate();
        this.Y = year;
        this.M = month;
        this.D = day;

        return [year, month, day];
    }

    // 改变日期
    changeDay(date) {
        const [year, month, day] = date.split('.');
        this.Y = year;
        this.M = month;
        this.D = day;
        return this.getDaysArray();
    }

    /**
     * 计算天数组
     * @param M 月
     * @param F 标识符 n-表示正常显示，p-表示上月遗留的天或下月在当前月的天
     * @returns {Array}
     */
    dayCode(M, F) {
        // 遍历一个月的数字
        const num = new Date(this.Y, M, 0).getDate(), // 获取某月总天数
            y = this.Y,
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
                flag: F, selected: '', multiple: '', year: yy, month: mm, day: i < 10 ? `0${i}` : `${i}`
            });
        }
        return arr;
    }

    // 计算本月第一天是周几，得到上月遗留天数 PY-上一年
    countPrevWeek(M) {
        const mds = this.dayCode(M - 1, 'p'); // 得到上月的天数组
        // 本月第一天是周一，上月余下1天，以次类推 (0:0 - 表示周几比剩余天数, 0:6-表示周日:6天)
        const prevMLeft = {
            0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5
        };

        // 真实月为8，则计算机中月为7，所以月需要减1
        const firstDW = new Date(this.Y, M - 1, 1).getDay(); // 本月第一天是星期几，返回0-6，对应周日-周六
        const co = prevMLeft[firstDW]; // Carryover 上个月遗留的天数

        return co ? mds.slice(-co) : [];
    }

    getDaysArray() {
        const m = Number(this.M);
        const da = [...this.countPrevWeek(m), ...this.dayCode(m, 'n')];
        const na = this.dayCode(m + 1, 'f');

        const arr = [...da, ...na.slice(0, 42 - da.length)];

        this.daysArray = arr;
        return arr;
    }

    /**
     * 年改变计算日
     * @param Y
     * @param M
     */
    yearChangeCountDay(Y, M) {
        this.Y = Y;
        this.M = M;
        return this.getDaysArray();
    }
}

export default CountDay;
