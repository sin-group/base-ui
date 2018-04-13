<template>
    <div class="b-date-picker">
        <div v-if="chooseType === ChooseType.MONTH_AND_DATE">
            <div class="date-title">
                <div class="month-btn-wrap" @click="jumpMonth(JumpMonthType.PREVIOUS, $event)">
                    <div class="previous-month-btn"></div>
                </div>

                <button class="month-year simple" @click="switchChooseMode(ChooseType.YEAR)">
                    {{ viewYear }}-{{ viewMonth }}
                </button>

                <div class="month-btn-wrap" @click="jumpMonth(JumpMonthType.NEXT, $event)">
                    <div class="next-month-btn"></div>
                </div>
            </div>

            <div class="date-day-type-wrap">
                <span v-for="(dayType, index) in DayTypeList" :key="index" class="date-day-type">{{ dayType }}</span>
            </div>

            <div class="date-row-wrap">
                <div v-for="(dateRow, rowIndex) in dateRowList" :key="rowIndex" class="date-row">
                    <span v-for="(dateItem, itemIndex) in dateRow" :key="itemIndex" class="date-btn-wrap">
                        <button
                            :class="{
                                'view-month': dateItem.viewMonthFlag,
                                'selected-date': dateItem.selectedDateFlag,
                                'current-date': dateItem.currentDateFlag
                            }"
                            class="date-btn"
                            @click="choose(dateItem)">{{ dateItem.date }}</button>
                    </span>
                </div>
            </div>
        </div>

        <div v-if="chooseType === ChooseType.YEAR" class="year-picker-wrapper">
            <b-select-menu
                :map="YearMap"
                :value="'' + year"
                @choose="chooseYear"/>

            <div class="choose-year-action">
                <button class="simple" @click="switchChooseMode(ChooseType.MONTH_AND_DATE)">
                    返回
                </button>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {
        DailyMillisecond,

        getTimeDigitalComponent
    } from '../../util/time';

    import BSelectMenu from '../b-select/b-select-menu.vue';

    const startYear = 1900;

    const DayTypeList = ['日', '一', '二', '三', '四', '五', '六'];
    const MonthDatesNum = 6 * 7; // Default 6 rows to cover all cases of date distribution in one month
    const {year: curYear, month: curMonth, date: curDate} = getTimeDigitalComponent(Date.now());
    const YearMap = [...Array(200).keys()]
            .map(num => `${startYear + num}`)
            .reduce((acc, cur) => Object.assign(acc, {[cur]: cur}), {});

    const JumpMonthType = {
        PREVIOUS: 'PREVIOUS',
        NEXT: 'NEXT'
    };

    const ChooseType = {
        MONTH_AND_DATE: 'MONTH_AND_DATE',
        YEAR: 'YEAR'
    };

    export default {
        name: 'BDatePicker',

        components: {
            BSelectMenu
        },

        model: {
            prop: 'timeStamp',
            event: 'choose'
        },

        props: {
            timeStamp: {
                type: Number,
                default: Date.now()
            }
        },

        data() {
            const vm = this;
            const {timeStamp} = vm;
            const initTimestamp = (timeStamp || timeStamp === 0) ? timeStamp : Date.now();
            const {year, month, date} = getTimeDigitalComponent(initTimestamp);

            return {
                DayTypeList,
                JumpMonthType,
                YearMap,
                ChooseType,
                chooseType: ChooseType.MONTH_AND_DATE,

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
                        const timeStamp = firstDateTime + (i * DailyMillisecond);
                        const {
                            year,
                            month,
                            date,
                            day
                        } = getTimeDigitalComponent(timeStamp);

                        const viewMonthFlag = month === viewMonth;
                        const selectedDateFlag
                                = year === selectedYear
                                && month === selectedMonth
                                && date === selectedDate;
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
                        vm.viewMonth -= 1;
                        return;
                    }

                    vm.viewYear -= 1;
                    vm.viewMonth = 12;
                }

                if (jumpType === JumpMonthType.NEXT) {
                    if (viewMonth !== 12) {
                        vm.viewMonth += 1;
                        return;
                    }

                    vm.viewYear += 1;
                    vm.viewMonth = 1;
                }
            },

            switchChooseMode(chooseType) {
                const vm = this;
                vm.chooseType = chooseType;
            },

            choose(date) {
                this.$emit('choose', date.timeStamp);
            },

            chooseYear(year) {
                const vm = this;
                vm.viewYear = +year;
                vm.switchChooseMode(ChooseType.MONTH_AND_DATE);
            }
        }
    };

</script>
