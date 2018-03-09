<template>
    <div class="container">
        <h4 class="heading">Tab</h4>
        <div class="card">
            <div class="tabs">
                <ul>
                    <li><a>Pictures</a></li>
                    <li><a>Music</a></li>
                    <li><a>Videos</a></li>
                    <li class="active"><a>Documents</a></li>
                </ul>
            </div>

            <div class="tabs-light">
                <ul>
                    <li><a>Pictures</a></li>
                    <li><a>Music</a></li>
                    <li><a>Videos</a></li>
                    <li class="active"><a>Documents</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CssElements'
    };

</script>

<style lang="scss" scoped>
    .demo-tabs {
        align-items: flex-start;

        .heading {
            margin: 5px 20px 0 0;
        }

        .tabs,
        .tabs-light {
            margin-bottom: 10px;
        }
    }
</style>
