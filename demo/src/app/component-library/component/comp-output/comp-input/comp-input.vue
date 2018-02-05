<template>
    <div class="component">
        <h4 class="heading-light">Input</h4>

        <div class="card">
            <form class="form-block-horizontal">
                <b-form-group label="Text">
                    <b-input v-model="editing.text"
                             placeholder="hint text"
                             required></b-input>
                </b-form-group>

                <b-form-group label="Password">
                    <b-input v-model="editing.password"
                             type="password"
                             required></b-input>
                </b-form-group>

                <b-form-group label="Number">
                    <b-input v-model="editing.number"
                             type="number"
                             required></b-input>
                </b-form-group>

                <b-form-group label="E-mail">
                    <b-input v-model="editing.email"
                             type="email"
                             required></b-input>
                </b-form-group>

                <b-form-group label="Multi-line">
                    <b-input v-model="editing.multiLineText"
                             required
                             :rows="1"
                             :rows-max="6"
                             multi-line></b-input>
                </b-form-group>

                <b-form-group label="Disabled">
                    <b-input v-model="editing.disabled"
                             disabled></b-input>
                </b-form-group>
            </form>
        </div>

        <div>
            <div class="demo-wrap">
                <pre class="json-preview">{{ $j(editing) }}</pre>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'comp-input',

        data() {
            return {
                editing: {
                    text: '',
                    password: '',
                    number: '',
                    email: '',
                    multiLineText: '',
                    disabled: 'disabled text'
                }
            }
        }
    };

</script>

<style lang="scss"></style>
