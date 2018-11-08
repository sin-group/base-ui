<template>
    <div class="component">

        <div class="doc card">
            <div class="overview">
                <h2>
                    <span class="title">输入框</span>
                    <code>b-input</code>
                </h2>
                <b-md-view :md-text="MD.CompInputOverview"/>
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

                        <b-form-group label="Disabled">
                            <b-input v-model="demo.disabled" disabled/>
                        </b-form-group>
                    </div>
                    <div slot="output">
                        Default: {{ demo.text }} <br>
                        Password: {{ demo.password }} <br>
                        Number: {{ demo.number }} <br>
                        E-mail: {{ demo.email }} <br>
                        Disabled: {{ demo.disabled }}
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
                <h3>配置 Filter</h3>
                <b-md-view :md-text="MD.CompInputFilter"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompInputFilterCode"/></div>
                    <div slot="main">
                        <b-form-group label="百分比">
                            <b-input v-model="demo.filter" :filter="filter" type="number"/>
                        </b-form-group>
                    </div>
                    <div slot="output">
                        filter: {{ demo.filter }}
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

    const decimalToPercent = (pDigitNum = 2) => ({
        // 0.101 => 10.1%
        filter: x => x && (x = +x) && (Math.round(x * (10 ** (pDigitNum + 2))) / (10 ** pDigitNum)),

        // 10.11% => 0.101
        reverseFilter: x => x && (x = +x) && (Math.round(x * (10 ** pDigitNum)) / (10 ** (pDigitNum + 2)))
    });

    export default {
        name: 'CompInput',

        data() {
            return {
                filter: decimalToPercent(2),

                MD,
                demo: {
                    text: '',
                    password: '',
                    number: '',
                    email: '',
                    filter: '',
                    multiLineText: '',
                    disabled: 'disabled text'
                }
            };
        }
    };

</script>

