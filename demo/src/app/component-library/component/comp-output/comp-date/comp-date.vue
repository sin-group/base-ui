<template>
    <div class="comp-date">
        <h4 class="heading-light">Date</h4>

        <div class="card">
            <form class="form-inline">
                <b-form-group label="Basic">
                    <b-date v-model="editing.basic"></b-date>
                </b-form-group>

                <b-form-group label="With Default Value">
                    <b-date v-model="editing.default"></b-date>
                </b-form-group>

                <b-form-group label="Disabled">
                    <b-date v-model="editing.disabled" :disabled="true"></b-date>
                </b-form-group>
            </form>
        </div>

        <pre class="json-preview">{{ $j(editing) }}</pre>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'comp-date',

        data() {
            return {
                editing: {
                    basic: null,
                    default: 1325347200000,
                    disabled: 1516284344350
                }
            };
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .comp-date {
    }
</style>
