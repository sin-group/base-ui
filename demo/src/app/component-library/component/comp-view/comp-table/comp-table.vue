<template>
    <div class="comp-table">
        <h4 class="heading">
            Table
        </h4>

        <div class="card">
            <b-table
                :options="options"
                :records="records"
                @on-select="onSelect">
                <div slot="op" slot-scope="scope">
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

    const LoanCreditsStatusMap = {
        IN_REVIEW: '授信中',
        MANUAL_REVIEW: '人工审核',
        ACCEPTED: '授信通过',
        REJECTED: '授信拒绝',
        CANCELLED: '授信取消',
        AUTO_REJECTED: '自动拒绝',
        AUTO_ACCEPTED: '自动通过'
    };

    const options = {
        enableSelection: true,
        enableClientSort: true,
        enableClientPagination: true,
        sortInfo: {
            field: 'name',
            order: 'DESC'
        },
        colDefs: [
            {field: 'loanAccountId', label: 'Account Id'},
            {field: 'mobileNumber', label: 'Mobile'},
            {field: 'name', label: 'Name'},
            {field: 'loanCreditsStatus', label: 'Status', map: LoanCreditsStatusMap},
            {field: 'timeCompletedAuthFlow', label: 'Time', filter: 'b-date-time'},
            {field: 'op', label: 'Operation', template: true}
        ]
    };

    const records = [{
        mobileNumber: '081268333030',
        loanAccountId: 200016,
        userId: 200030,
        name: 'Budi Permana SH',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125358,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '513.0',
            人工审核_身份证: '1',
            xgboost: '0.5370163382060448'
        },
        channel: null,
        timeCompletedAuthFlow: 1515983214549,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515983214549,
        reloanTraceId: null
    }, {
        mobileNumber: '081343692065',
        loanAccountId: 223699,
        userId: 223714,
        name: 'Wahyuni malanua',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125351,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '514.0',
            人工审核_身份证: '1',
            xgboost: '0.31541245603981527'
        },
        channel: null,
        timeCompletedAuthFlow: 1515983009260,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515983009260,
        reloanTraceId: null
    }, {
        mobileNumber: '087882876444',
        loanAccountId: 223359,
        userId: 223374,
        name: 'Yunita saptiningsih',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125337,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '509.0',
            人工审核_身份证: '1',
            xgboost: '0.4107019497683818'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515982577580,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515982577580,
        reloanTraceId: null
    }, {
        mobileNumber: '085729291331',
        loanAccountId: 219592,
        userId: 219607,
        name: 'Ekawati yeny rahayu',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125334,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '516.0',
            人工审核_身份证: '1',
            xgboost: '0.3865136633940221'
        },
        channel: null,
        timeCompletedAuthFlow: 1515982547030,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515982547030,
        reloanTraceId: null
    }, {
        mobileNumber: '083875575578',
        loanAccountId: 223695,
        userId: 223710,
        name: 'Enok puspita dewi',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125333,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '476.0',
            人工审核_身份证: '1',
            xgboost: '0.4313599838255291'
        },
        channel: null,
        timeCompletedAuthFlow: 1515982471955,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515982471955,
        reloanTraceId: null
    }, {
        mobileNumber: '085640853629',
        loanAccountId: 169366,
        userId: 169377,
        name: 'INTAN KUMALA SARI',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125332,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '489.0',
            人工审核_身份证: '1',
            xgboost: '0.32931978373908477'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515982460802,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515982460802,
        reloanTraceId: null
    }, {
        mobileNumber: '085717989696',
        loanAccountId: 173609,
        userId: 173621,
        name: 'Firman Andrian ',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125329,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '504.0',
            人工审核_身份证: '1',
            xgboost: '0.41955840305088343'
        },
        channel: null,
        timeCompletedAuthFlow: 1515982429233,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515982429233,
        reloanTraceId: null
    }, {
        mobileNumber: '085716316051',
        loanAccountId: 223557,
        userId: 223572,
        name: 'Nuri',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125318,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '522.0',
            人工审核_身份证: '1',
            xgboost: '0.5421061184234255'
        },
        channel: null,
        timeCompletedAuthFlow: 1515981973746,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515981973746,
        reloanTraceId: null
    }, {
        mobileNumber: '08112632423',
        loanAccountId: 223609,
        userId: 223624,
        name: 'Anissa laila mufidha',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125311,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '492.0',
            人工审核_身份证: '1',
            xgboost: '0.45399478768548907'
        },
        channel: null,
        timeCompletedAuthFlow: 1515981778995,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515981778995,
        reloanTraceId: null
    }, {
        mobileNumber: '081357740868',
        loanAccountId: 223653,
        userId: 223668,
        name: 'Dennis Bagus Wicaksono ',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125305,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '497.0',
            人工审核_身份证: '1',
            xgboost: '0.2682432158717778'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515981657299,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515981657299,
        reloanTraceId: null
    }, {
        mobileNumber: '081252333073',
        loanAccountId: 210931,
        userId: 210946,
        name: 'ulfah',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125291,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '482.0',
            人工审核_身份证: '1',
            xgboost: '0.15311198214956834'
        },
        channel: null,
        timeCompletedAuthFlow: 1515981243454,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515981243454,
        reloanTraceId: null
    }, {
        mobileNumber: '089601326284',
        loanAccountId: 114776,
        userId: 114783,
        name: 'Septia Hidayat',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125290,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '494.0',
            人工审核_身份证: '1',
            xgboost: '0.513209599690225'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515981212455,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515981212455,
        reloanTraceId: null
    }, {
        mobileNumber: '081357162113',
        loanAccountId: 223628,
        userId: 223643,
        name: 'Muhammad jefri chrisdianto',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125280,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '532.0',
            人工审核_身份证: '1',
            xgboost: '0.5428200986227778'
        },
        channel: null,
        timeCompletedAuthFlow: 1515980846293,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980846293,
        reloanTraceId: null
    }, {
        mobileNumber: '089614938167',
        loanAccountId: 140509,
        userId: 140519,
        name: 'NASRULUAH',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125275,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '518.0',
            人工审核_身份证: '1',
            xgboost: '0.5487195967029501'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515980565452,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980565452,
        reloanTraceId: null
    }, {
        mobileNumber: '083890613851',
        loanAccountId: 223599,
        userId: 223614,
        name: 'Yulismah',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125269,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '513.0',
            人工审核_身份证: '1',
            xgboost: '0.5684794557381414'
        },
        channel: null,
        timeCompletedAuthFlow: 1515980448345,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980448345,
        reloanTraceId: null
    }, {
        mobileNumber: '081270505021',
        loanAccountId: 223618,
        userId: 223633,
        name: 'Wijiarti',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125268,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '501.0',
            人工审核_身份证: '1',
            xgboost: '0.34200573746575147'
        },
        channel: null,
        timeCompletedAuthFlow: 1515980447806,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980447806,
        reloanTraceId: null
    }, {
        mobileNumber: '089696096149',
        loanAccountId: 223582,
        userId: 223597,
        name: 'HERY NOPIYANTO',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125261,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '493.0',
            人工审核_身份证: '1',
            xgboost: '0.3854611364679247'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515980251342,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980251342,
        reloanTraceId: null
    }, {
        mobileNumber: '082316503827',
        loanAccountId: 223607,
        userId: 223622,
        name: 'Dwi rahayu prihatini',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125259,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '486.0',
            人工审核_身份证: '1',
            xgboost: '0.3321040715985832'
        },
        channel: null,
        timeCompletedAuthFlow: 1515980145490,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980145490,
        reloanTraceId: null
    }, {
        mobileNumber: '085885380210',
        loanAccountId: 103866,
        userId: 103872,
        name: 'Bagus setyadi',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125257,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '509.0',
            人工审核_身份证: '1',
            xgboost: '0.28013520826567817'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515980103874,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515980103874,
        reloanTraceId: null
    }, {
        mobileNumber: '081317012536',
        loanAccountId: 222349,
        userId: 222364,
        name: 'Tina aprianti',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125248,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '508.0',
            人工审核_身份证: '1',
            xgboost: '0.40493195553374367'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515979932076,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515979932076,
        reloanTraceId: null
    }, {
        mobileNumber: '087725494517',
        loanAccountId: 223484,
        userId: 223499,
        name: 'Deni Kasin',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125246,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '494.0',
            人工审核_身份证: '1',
            xgboost: '0.35369779764396575'
        },
        channel: null,
        timeCompletedAuthFlow: 1515979844273,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515979844273,
        reloanTraceId: null
    }, {
        mobileNumber: '087762455509',
        loanAccountId: 223556,
        userId: 223571,
        name: 'Amanda Runisari',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125212,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '502.0',
            人工审核_身份证: '1',
            xgboost: '0.22925032957844974'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515978902574,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978902574,
        reloanTraceId: null
    }, {
        mobileNumber: '087880843182',
        loanAccountId: 197123,
        userId: 197137,
        name: 'Pasin Muharis',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125209,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '519.0',
            人工审核_身份证: '1',
            xgboost: '0.3814491538530343'
        },
        channel: null,
        timeCompletedAuthFlow: 1515978875136,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978875136,
        reloanTraceId: null
    }, {
        mobileNumber: '089632157264',
        loanAccountId: 223533,
        userId: 223548,
        name: 'Ilham aji maulana',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125208,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '525.0',
            人工审核_身份证: '1',
            xgboost: '0.5267137518746167'
        },
        channel: null,
        timeCompletedAuthFlow: 1515978843023,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978843023,
        reloanTraceId: null
    }, {
        mobileNumber: '085268593230',
        loanAccountId: 215235,
        userId: 215250,
        name: 'Ambar via oktavianti',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125205,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '509.0',
            人工审核_身份证: '1',
            xgboost: '0.4002915907801336'
        },
        channel: null,
        timeCompletedAuthFlow: 1515978818868,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978818868,
        reloanTraceId: null
    }, {
        mobileNumber: '082181633349',
        loanAccountId: 223523,
        userId: 223538,
        name: 'murni',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125203,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '515.0',
            人工审核_身份证: '1',
            xgboost: '0.4558792733119781'
        },
        channel: null,
        timeCompletedAuthFlow: 1515978787986,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978787986,
        reloanTraceId: null
    }, {
        mobileNumber: '082258168181',
        loanAccountId: 223519,
        userId: 223534,
        name: 'Rudy Abdilah',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125200,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '490.0',
            人工审核_身份证: '1',
            xgboost: '0.4319854559182269'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID_1',
        timeCompletedAuthFlow: 1515978630081,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978630081,
        reloanTraceId: null
    }, {
        mobileNumber: '082323432385',
        loanAccountId: 222504,
        userId: 222519,
        name: 'Kurnianto setiawan',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125197,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '520.0',
            人工审核_身份证: '1',
            xgboost: '0.3714147044631219'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515978584061,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978584061,
        reloanTraceId: null
    }, {
        mobileNumber: '087732936063',
        loanAccountId: 223514,
        userId: 223529,
        name: 'Agung Sarialamsyah',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125185,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '498.0',
            人工审核_身份证: '1',
            xgboost: '0.39932248265257136'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515978221310,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515978221310,
        reloanTraceId: null
    }, {
        mobileNumber: '08562375798',
        loanAccountId: 217404,
        userId: 217419,
        name: 'Neng susilawati',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125160,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '510.0',
            人工审核_身份证: '1',
            xgboost: '0.5394146569092847'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515976437574,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515976437574,
        reloanTraceId: null
    }, {
        mobileNumber: '081392801278',
        loanAccountId: 223385,
        userId: 223400,
        name: 'Okta bernando',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125149,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '510.0',
            人工审核_身份证: '1',
            xgboost: '0.46284524690516554'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515975990769,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515975990769,
        reloanTraceId: null
    }, {
        mobileNumber: '085710447277',
        loanAccountId: 223425,
        userId: 223440,
        name: 'Marina Saskia Adeline',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125137,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '503.0',
            人工审核_身份证: '1',
            xgboost: '0.3238493800399954'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515975318668,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515975318668,
        reloanTraceId: null
    }, {
        mobileNumber: '082225280697',
        loanAccountId: 222681,
        userId: 222696,
        name: 'Yeni marliani',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125126,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '492.0',
            人工审核_身份证: '1',
            xgboost: '0.5059241590240255'
        },
        channel: null,
        timeCompletedAuthFlow: 1515974680079,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515974680079,
        reloanTraceId: null
    }, {
        mobileNumber: '087887419776',
        loanAccountId: 223354,
        userId: 223369,
        name: 'Wahyu Widiyanto',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125085,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '496.0',
            人工审核_身份证: '1',
            xgboost: '0.29482521993144234'
        },
        channel: null,
        timeCompletedAuthFlow: 1515971183407,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515971183407,
        reloanTraceId: null
    }, {
        mobileNumber: '081910723532',
        loanAccountId: 223339,
        userId: 223354,
        name: 'Novi haryani',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125083,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '496.0',
            人工审核_身份证: '1',
            xgboost: '0.5194120351074458'
        },
        channel: null,
        timeCompletedAuthFlow: 1515971155899,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515971155899,
        reloanTraceId: null
    }, {
        mobileNumber: '081267558383',
        loanAccountId: 223328,
        userId: 223343,
        name: 'refky yudrika',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125075,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '512.0',
            人工审核_身份证: '1',
            xgboost: '0.5566943055790501'
        },
        channel: null,
        timeCompletedAuthFlow: 1515969788120,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515969788120,
        reloanTraceId: null
    }, {
        mobileNumber: '085210587674',
        loanAccountId: 223305,
        userId: 223320,
        name: 'Tugiyanto',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125057,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '504.0',
            人工审核_身份证: '1',
            xgboost: '0.5492203432604816'
        },
        channel: null,
        timeCompletedAuthFlow: 1515964992516,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515964992516,
        reloanTraceId: null
    }, {
        mobileNumber: '082243513790',
        loanAccountId: 223296,
        userId: 223311,
        name: 'Sri novita astini',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125055,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '506.0',
            人工审核_身份证: '1',
            xgboost: '0.5931120604767748'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515964655344,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515964655344,
        reloanTraceId: null
    }, {
        mobileNumber: '089677238653',
        loanAccountId: 223297,
        userId: 223312,
        name: 'Mahendra Tri Saputra',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125053,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '508.0',
            人工审核_身份证: '1',
            xgboost: '0.43052607443873186'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515964409068,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515964409068,
        reloanTraceId: null
    }, {
        mobileNumber: '081216985185',
        loanAccountId: 223239,
        userId: 223254,
        name: 'anggun santoso',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125031,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '508.0',
            人工审核_身份证: '1',
            xgboost: '0.44904764334362457'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515958255512,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515958255512,
        reloanTraceId: null
    }, {
        mobileNumber: '087808363234',
        loanAccountId: 223234,
        userId: 223249,
        name: 'HENDRA SUSENO ST',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125030,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '492.0',
            人工审核_身份证: '1',
            xgboost: '0.39493482767891086'
        },
        channel: null,
        timeCompletedAuthFlow: 1515958246956,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515958246956,
        reloanTraceId: null
    }, {
        mobileNumber: '087781766193',
        loanAccountId: 52131,
        userId: 52133,
        name: 'elisabeth elsye',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125029,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '554.0',
            人工审核_身份证: '1',
            xgboost: '0.5764458776570811'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515958168129,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515958168129,
        reloanTraceId: null
    }, {
        mobileNumber: '081288860989',
        loanAccountId: 223231,
        userId: 223246,
        name: 'Trisno wahyudi',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125026,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '503.0',
            人工审核_身份证: '1',
            xgboost: '0.41287666846581533'
        },
        channel: null,
        timeCompletedAuthFlow: 1515957888884,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515957888884,
        reloanTraceId: null
    }, {
        mobileNumber: '082122819995',
        loanAccountId: 223226,
        userId: 223241,
        name: 'Rizal Firdaus',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125025,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '554.0',
            人工审核_身份证: '1',
            xgboost: '0.5259342967632645'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID_1',
        timeCompletedAuthFlow: 1515957799269,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515957799269,
        reloanTraceId: null
    }, {
        mobileNumber: '081274411110',
        loanAccountId: 222689,
        userId: 222704,
        name: 'Zaini nur ahmad',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 125017,
        ruleSetResult: {
            特定人群: '1',
            Advance: '1',
            数据造假: '1',
            密度控制: '1',
            印尼数据驱动打分卡V1: '522.0',
            人工审核_身份证: '1',
            xgboost: '0.5305882174803221'
        },
        channel: 'EASYCASH_GOOGLEPLAY_ID',
        timeCompletedAuthFlow: 1515957062272,
        riskFlowId: 38,
        authSDKType: '印尼现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1515957062272,
        reloanTraceId: null
    }, {
        $$selected: true,
        $$disableSelect: true,
        mobileNumber: '0647571735',
        loanAccountId: 25,
        userId: 25,
        name: 'กมลชนก ลุนสอน',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 15687,
        ruleSetResult: {
            特定人群: '1',
            数据造假: '1',
            密度控制: '1'
        },
        channel: 'EASYCASH_GOOGLEPLAY_TH',
        timeCompletedAuthFlow: 1506315988580,
        riskFlowId: 31,
        authSDKType: '泰国现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1506315988580,
        reloanTraceId: null
    }, {
        mobileNumber: '0981709332',
        loanAccountId: 110,
        userId: 110,
        name: 'วรุฒ จำปามูล',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 15363,
        ruleSetResult: {
            特定人群: '1',
            数据造假: '0',
            密度控制: '1'
        },
        channel: 'EASYCASH_GOOGLEPLAY_TH',
        timeCompletedAuthFlow: 1506241488800,
        riskFlowId: 31,
        authSDKType: '泰国现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1506241488800,
        reloanTraceId: null
    }, {
        mobileNumber: '0890596829',
        loanAccountId: 5392,
        userId: 5392,
        name: 'พีรดา เทือกคำซาว',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 7263,
        ruleSetResult: {
            特定人群: '1',
            数据造假: '1',
            密度控制: '1'
        },
        channel: 'EASYCASH_GOOGLEPLAY_TH',
        timeCompletedAuthFlow: 1505051563064,
        riskFlowId: 31,
        authSDKType: '泰国现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1505051563064,
        reloanTraceId: null
    }, {
        mobileNumber: '0801203646',
        loanAccountId: 3665,
        userId: 3665,
        name: 'มงคล สุรินทร์กาศ',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 7198,
        ruleSetResult: {
            特定人群: '1',
            数据造假: '1',
            密度控制: '1'
        },
        channel: 'EASYCASH_GOOGLEPLAY_TH',
        timeCompletedAuthFlow: 1505038290990,
        riskFlowId: 31,
        authSDKType: '泰国现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1505038290990,
        reloanTraceId: null
    }, {
        mobileNumber: '0641576964',
        loanAccountId: 250,
        userId: 250,
        name: 'ธัญรัตน์ เล่งเจ๊ะ',
        loanCreditsStatus: 'MANUAL_REVIEW',
        traceId: 3773,
        ruleSetResult: {
            特定人群: '1',
            数据造假: '1',
            密度控制: '1'
        },
        channel: 'EASYCASH_GOOGLEPLAY_TH',
        timeCompletedAuthFlow: 1504516320390,
        riskFlowId: 31,
        authSDKType: '泰国现金借款APP',
        reloanStatus: null,
        reloanRiskFlowId: null,
        currentLoanTime: 1504516320390,
        reloanTraceId: null
    }];

    export default {
        name: 'CompTable',

        data() {
            return {
                options,
                records,

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
