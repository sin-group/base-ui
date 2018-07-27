<template>
    <div class="switch">
        <h4 class="heading">Switch</h4>

        <div class="card">
            <form class="form-block">
                <b-form-group label="Basic">
                    <b-switch v-model="editing.basic"/>
                </b-form-group>

                <b-form-group label="Disabled">
                    <b-switch v-model="editing.disabled" :checked="true" disabled/>
                </b-form-group>
            </form>
        </div>

        <pre class="json-preview">{{ $j(editing) }}</pre>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'CompSwitch',

        data() {
            return {
                editing: {
                    basic: true,
                    disabled: true
                }
            };
        }
    };

</script>

