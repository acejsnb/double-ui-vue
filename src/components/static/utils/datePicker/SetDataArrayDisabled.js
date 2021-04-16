/**
 * 设置日期数据禁用
 * @param scope 开始结束时间
 * @param arr 日期数据
 * @return {*}
 * @constructor
 */

// 设置日数据禁用
const SetDaysArrayDisabled = (scope, arr) => {
    if (scope) {
        const reg = /[.]/g;
        const [s, e] = scope.split('-'),
            scopeS = s.replace(reg, ''),
            scopeE = e.replace(reg, '');
        return arr.map(d => {
            const cur = d.year + d.month + d.day;
            if (cur < scopeS || cur > scopeE) d.disabled = 'disabled';
            return d;
        });
    }
    return arr;
};

// 设置周数据禁用
const SetWeeksArrayDisabled = (scope, arr) => {
    if (scope) {
        const reg = /[.]/g;
        const [s, e] = scope.split('-'),
            scopeS = s.replace(reg, ''),
            scopeE = e.replace(reg, '');
        return arr.map((d) => {
            const ws = d.weeks;
            if (ws && ws.length) {
                const status = ws.some(d => {
                    const cur = d.year + d.month + d.day;
                    return cur < scopeS || cur > scopeE;
                });
                if (status) d.disabled = 'disabled';
            }
            return d;
        });
    }
    return arr;
};

// 设置月数据禁用
const SetMonthsArrayDisabled = (scope, arr) => {
    if (scope) {
        const reg = /[.]/g;
        const [s, e] = scope.split('-'),
            scopeS = s.replace(reg, '').substr(0, 6),
            scopeE = e.replace(reg, '').substr(0, 6);
        return arr.map(d => {
            const cur = d.year + d.month;
            if (cur < scopeS || cur > scopeE) d.disabled = 'disabled';
            return d;
        });
    }
    return arr;
};

// 设置年数据禁用
const SetYearsArrayDisabled = (scope, arr) => {
    if (scope) {
        const [s, e] = scope.split('-'),
            scopeS = s.substr(0, 4),
            scopeE = e.substr(0, 4);
        return arr.map(d => {
            const cur = d.year;
            if (cur < scopeS || cur > scopeE) d.disabled = 'disabled';
            return d;
        });
    }
    return arr;
};

export {
    SetDaysArrayDisabled, SetWeeksArrayDisabled, SetMonthsArrayDisabled, SetYearsArrayDisabled
};
