<template>
    <div class="b-date-picker">
        <div class="date-title">
            {{ year }}-{{ month }}
        </div>

        <div class="date-day-type-wrap">
            <span class="date-day-type" v-for="dayType in DayTypeList">{{ dayType }}</span>
        </div>

        <div class="date-row-wrap">
            <div class="date-row" v-for="dateRow in dateRowList">
                <span class="date-btn-wrap" v-for="dateItem in dateRow">
                    <button class="date-btn"
                            :class="{
                                'selected-month': dateItem.selectedMonthFlag,
                                'selected-date': dateItem.selectedDateFlag,
                                'current-date': dateItem.currentDateFlag
                            }"
                            @click="choose(dateItem)">{{ dateItem.date }}</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {
        DailyMillisecond,

        getTimeComponent
    } from '../../util/time';

    const DayTypeList = ['日', '一', '二', '三', '四', '五', '六'];
    const MonthDatesNum = 6 * 7; // Default 6 rows to cover all cases of date distribution in one month
    const {year: curYear, month: curMonth, date: curDate} = getTimeComponent(Date.now());

    export default {
        name: 'b-date-picker',

        model: {
            prop: 'timeStamp',
            event: 'choose'
        },

        props: {
            timeStamp: {}
        },

        data() {
            const vm = this;
            const {timeStamp} = vm;
            const {year, month, date} = getTimeComponent(timeStamp);

            return {
                DayTypeList,

                year: year || curYear,
                month: month || curMonth,
                date
            };
        },

        computed: {
            dateRowList() {
                const vm = this;
                const {
                    year: selectedYear,
                    month: selectedMonth,
                    date: selectedDate
                } = vm;

                // get first date in this month
                const monthFirstDate = new Date(selectedYear, selectedMonth - 1, 1);
                const monthFirstDateTime = monthFirstDate.getTime();
                const monthFirstDay = monthFirstDate.getDay();

                // get first date in this panel
                const firstDateTime
                    = monthFirstDay === 0
                    ? monthFirstDateTime
                    : monthFirstDateTime - (monthFirstDay * DailyMillisecond);

                return [...Array(MonthDatesNum).keys()]
                    .map((i) => { // get a panel date object array
                        const timeStamp = firstDateTime + i * DailyMillisecond;
                        const {
                            year,
                            month,
                            date,
                            day
                        } = getTimeComponent(timeStamp);
                        const selectedMonthFlag = month === selectedMonth;
                        const selectedDateFlag = month === selectedMonth && date === selectedDate;
                        const currentDateFlag = year === curYear && month === curMonth && date === curDate;

                        return {
                            timeStamp,
                            month,
                            date,
                            day,
                            selectedMonthFlag,
                            selectedDateFlag,
                            currentDateFlag,
                            i
                        };
                    })
                    .reduce((acc, cur, i) => { // split panel array into rows
                        const rowNum = Math.floor(i / DayTypeList.length);

                        if (!acc[rowNum]) acc[rowNum] = [];

                        acc[rowNum].push(cur);
                        return acc;
                    }, []);
            }
        },

        methods: {
            choose(date) {
                this.$emit('choose', date.timeStamp);
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../style/variables.scss';

    .b-date-picker {
        width: 256px;
        box-sizing: border-box;
        padding: 15px;
        background-color: $white;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
        overflow-y: auto;

        .date-title {
            margin-bottom: 10px;
            padding: 0 10px;
            text-align: center;
            color: $blue-dark;
        }

        .date-day-type,
        .date-btn-wrap {
            display: inline-block;
            width: 32px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }

        .date-day-type {
            font-size: 13px;
            color: $gray;
        }

        .date-row-wrap {
            margin-top: 10px;

            .date-row {
                margin-bottom: 8px;

                .date-btn-wrap {
                    .date-btn {
                        height: $date-picker-btn-width;
                        width: $date-picker-btn-width;
                        padding: 0;
                        line-height: $date-picker-btn-width;
                        border: none;
                        border-radius: 50%;
                        color: $gray;
                        background-color: transparent;

                        &.selected-month {
                             color: $gray-darker;
                        }

                        &.current-date {
                             color: $blue;
                        }

                        &.selected-date {
                             color: $white;
                             background-color: $blue;
                        }

                        &:hover {
                            color: $white;
                            background-color: $blue-light;
                        }
                    }
                }
            }
        }
    }
</style>
