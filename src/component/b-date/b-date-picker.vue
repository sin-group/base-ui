<template>
    <div class="b-date-picker">
        <div class="date-title">
            <div class="month-btn-wrap" @click="jumpMonth(JumpMonthType.PREVIOUS, $event)">
                <div class="previous-month-btn"></div>
            </div>

            <div>
                {{ viewYear }}-{{ viewMonth }}
            </div>

            <div class="month-btn-wrap" @click="jumpMonth(JumpMonthType.NEXT, $event)">
                <div class="next-month-btn"></div>
            </div>
        </div>

        <div class="date-day-type-wrap">
            <span class="date-day-type" v-for="dayType in DayTypeList">{{ dayType }}</span>
        </div>

        <div class="date-row-wrap">
            <div class="date-row" v-for="dateRow in dateRowList">
                <span class="date-btn-wrap" v-for="dateItem in dateRow">
                    <button class="date-btn"
                            :class="{
                                'view-month': dateItem.viewMonthFlag,
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

        getTimeDigitalComponent
    } from '../../util/time';

    const DayTypeList = ['日', '一', '二', '三', '四', '五', '六'];
    const MonthDatesNum = 6 * 7; // Default 6 rows to cover all cases of date distribution in one month
    const {year: curYear, month: curMonth, date: curDate} = getTimeDigitalComponent(Date.now());

    const JumpMonthType = {
        PREVIOUS: 'PREVIOUS',
        NEXT: 'NEXT'
    };

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
            const {year, month, date} = getTimeDigitalComponent(timeStamp);

            return {
                DayTypeList,
                JumpMonthType,

                year: year || curYear,
                month: month || curMonth,
                viewYear: year || curYear,
                viewMonth: month || curMonth,
                date
            };
        },

        computed: {
            dateRowList() {
                const vm = this;
                const {
                    viewYear,
                    viewMonth,
                    year: selectedYear,
                    month: selectedMonth,
                    date: selectedDate
                } = vm;

                // get first date in this month
                const monthFirstDate = new Date(viewYear, viewMonth - 1, 1);
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
                        } = getTimeDigitalComponent(timeStamp);
                        const viewMonthFlag = month === viewMonth;
                        const selectedDateFlag = year === selectedYear && month === selectedMonth && date === selectedDate;
                        const currentDateFlag = year === curYear && month === curMonth && date === curDate;

                        return {
                            timeStamp,
                            month,
                            date,
                            day,
                            viewMonthFlag,
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
            jumpMonth(jumpType, event) {
                event.stopPropagation();

                const vm = this;
                const {viewMonth} = vm;

                if (jumpType === JumpMonthType.PREVIOUS) {
                    if (viewMonth !== 1) {
                        vm.viewMonth--;
                        return;
                    }

                    vm.viewYear--;
                    vm.viewMonth = 12;
                }

                if (jumpType === JumpMonthType.NEXT) {
                    if (viewMonth !== 12) {
                        vm.viewMonth++;
                        return;
                    }

                    vm.viewYear++;
                    vm.viewMonth = 1;
                }
            },

            choose(date) {
                this.$emit('choose', date.timeStamp);
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../style/variables.scss';
    @import '../../style/mixin/arrow.scss';

    .b-date-picker {
        width: 256px;
        box-sizing: border-box;
        padding: 15px;
        background-color: $white;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
        overflow-y: auto;

        .date-title {
            display: flex;
            justify-content: space-around;
            margin-bottom: 5px;
            padding: 0 10px;
            text-align: center;
            color: $blue-dark;

            .month-btn-wrap {
                position: relative;
                box-sizing: border-box;
                top: -5px;
                width: 25px;
                height: 25px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    background-color: $blue-light;

                    .previous-month-btn {
                        @include genArrow('left', 4px, $white);
                    }

                    .next-month-btn {
                        @include genArrow('right', 4px, $white);
                    }

                }
            }

            .previous-month-btn,
            .next-month-btn {
                position: relative;
                top: -1px;
            }

            .previous-month-btn {
                left: -1px;
                @include genArrow('left', 4px, $blue);
            }

            .next-month-btn {
                left: 1px;
                @include genArrow('right', 4px, $blue);
            }

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

                        &.view-month {
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
