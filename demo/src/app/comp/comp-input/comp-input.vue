<template>
    <div class="component">

        <div class="doc card">
            <div class="overview">
                <h2>
                    <span class="title">输入框</span>
                    <code>b-input</code>
                    <b-md-view :md-text="MD.CompInputOverview"/>
                </h2>
            </div>

            <div class="case">
                <h3>基本用法</h3>
                <b-md-view :md-text="MD.CompInputBasic"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompInputBasicCode"/></div>
                    <div slot="main">
                        <b-form-group label="Text (Default)">
                            <b-input v-model="demo.text"/>
                        </b-form-group>

                        <b-form-group label="Password">
                            <b-input v-model="demo.password" type="password"/>
                        </b-form-group>

                        <b-form-group label="Number">
                            <b-input v-model="demo.number" type="number"/>
                        </b-form-group>

                        <b-form-group label="E-mail">
                            <b-input v-model="demo.email" type="email"/>
                        </b-form-group>
                    </div>
                    <div slot="output">
                        Default: {{ demo.text }} <br>
                        Password: {{ demo.password }} <br>
                        Number: {{ demo.number }} <br>
                        E-mail: {{ demo.email }}
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>MultiLine 模式</h3>
                <b-md-view :md-text="MD.CompInputMultiLine"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompInputMultiLineCode"/></div>
                    <div slot="main">
                        <b-form-group label="MultiLine">
                            <b-input
                                v-model="demo.multiLineText"
                                :rows="3"
                                :rows-max="6"
                                multi-line/>
                        </b-form-group>
                    </div>
                    <div slot="output">
                        MultiLine: {{ demo.multiLineText }}
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>一致性</h3>
                <b-md-view :md-text="MD.CompInputConsistent"/>
            </div>

            <div class="case">
                <h3>API</h3>
                <b-md-view :md-text="MD.CompInputAPI"/>
            </div>
        </div>
    </div>

</template>

<script>
    import MD from '../../../common/md';

    export default {
        name: 'CompInput',

        data() {
            return {
                MD,
                demo: {
                    text: '',
                    password: '',
                    number: '',
                    email: '',
                    multiLineText: '',
                    disabled: 'disabled text'
                }
            };
        }
    };

</script>

