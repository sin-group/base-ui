<template>
    <!-- eslint-disable -->
    <div>
        <div class="container">
            <h4 class="heading">Container</h4>
        </div>

        <div class="lg-bottom-10">
            <div class="container demo-container">
                <p>The default <strong>.container</strong> is a simple container to center your content horizontally.</p>
            </div>
        </div>

        <div class="container-wide demo-container-wide">
            <p>The <strong>.container-wide</strong> is a maximum width container.</p>
        </div>

        <div class="container">
            <h4 class="heading">Tile</h4>

            <div class="tiles">
                <div class="t-col is-8">
                    <div class="t-row">
                        <div class="t-col is-2">
                            <div class="card is-2">
                                <h3>Vertical tiles</h3>
                                <h5>demo box 1</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                            </div>
                            <div class="card is-1">
                                <h3>Vertical tiles</h3>
                                <h5>demo box 2</h5>
                            </div>
                        </div>
                        <div class="card is-1">
                            <h3>Vertical tiles</h3>
                            <h5>demo box 3</h5>
                        </div>
                    </div>
                    <div class="card"><h3>Vertical tiles</h3>
                        <h5>demo box 4</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                    </div>
                </div>
                <div class="card is-2">
                    <h3>Vertical tiles</h3>
                    <h5>demo box 5</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                </div>
                <div class="card is-2">
                    <h3>Vertical tiles</h3>
                    <h5>demo box 6</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                </div>
            </div>

            <h4 class="heading">Level</h4>
            <div class="levels">
                <div class="level">
                    <div class="bg-box level-center">I`m in .level</div>
                    <div class="bg-box level-center">I`m in .level</div>
                </div>

                <div class="level-center">
                    <div class="bg-box level-center">I`m in .level-center</div>
                    <div class="bg-box level-center">I`m in .level-center</div>
                </div>

                <div class="level-between">
                    <div class="bg-box level-center">I`m in .level-between</div>
                    <div class="bg-box level-center">I`m in .level-between</div>
                </div>

                <div class="level-end">
                    <div class="bg-box level-center">I`m in .level-end</div>
                    <div class="bg-box level-center">I`m in .level-end</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'StyleLayout'
    };
</script>

<style scoped>
    .demo-container,
    .demo-container-wide {
        margin-bottom: 10px;
        padding: 50px 0;
        background-color: #e1e1e1;
        text-align: center;
    }

    .tiles,
    .levels {
        margin: 0 -10px;
    }

    .card {
        margin: 10px;
    }

    .bg-box {
        height: 50px;
        width: 200px;
        margin: 10px 10px;
        background-color: #e1e1e1;
    }
</style>
