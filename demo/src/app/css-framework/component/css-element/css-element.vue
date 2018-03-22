<template>
    <div class="container">
        <h4 class="heading">Action Card</h4>
        <div class="card">
            <div class="action-card">
                <div class="action-group">
                    <button class="action-bar">Create API</button>
                    <a href="#" class="action-bar">Create Project</a>
                </div>
            </div>

            <div class="action-card">
                <div class="action-group">
                    <div class="action-header">Collection <button>管理</button></div>

                    <button class="action-bar">Mock (3) <i class="b-icon-right"/></button>
                    <a href="#" class="action-bar">Mayuri (10) <i class="b-icon-right"/></a>
                    <a href="#" class="action-bar">Create Collection</a>
                </div>

                <div class="action-group">
                    <div class="action-header">Api <button>管理</button></div>

                    <button class="action-bar">Subscribe <i class="b-icon-love"/></button>
                    <button class="action-bar">Add to collection<i class="b-icon-create"/></button>
                    <button class="action-bar">View detail <i class="b-icon-detail"/></button>
                    <button class="action-bar">More operation <i class="b-icon-more"/></button>
                </div>
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
