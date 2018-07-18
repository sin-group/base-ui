<template>
    <div class="comp-table">
        <h4 class="heading">
            Table
        </h4>

        <div class="card">
            <b-table
                :options="Options"
                :records="Records"
                @on-select="onSelect">
                <div slot-scope="scope" slot="op">
                    <button @click="viewRecord(scope.record)">View</button>
                </div>
            </b-table>
        </div>

        <div>
            <div class="demo-wrap">
                <pre class="json-preview">{{ $j(selectedInfo) }}</pre>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import ViewRecordModal from './modal/view-record-modal';
    import Records from './constant/records';
    import Options from './constant/options';

    export default {
        name: 'CompTable',

        data() {
            return {
                Records,
                Options,

                selectedInfo: {}
            };
        },

        methods: {
            viewRecord(record) {
                const vm = this;
                vm.$modal
                    .open(ViewRecordModal, {
                        record
                    })
                    .catch(x => x);
            },

            onSelect({selectedRecords}) {
                const vm = this;
                vm.selectedInfo = {
                    selectedAccountIds: selectedRecords.map(({loanAccountId}) => loanAccountId)
                };
            }
        }
    };

</script>

