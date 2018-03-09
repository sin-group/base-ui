<template>
    <div class="container">
        <h4 class="heading">Button</h4>
        <div class="card">
            <h4 class="heading">Button Inline</h4>
            <button>Primary</button>
            <button class="normal">Normal</button>
            <button class="disabled">Disabled</button>
            <button class="danger">Danger</button>
            <button class="simple">Simple</button>

            <h4 class="heading">Button Block</h4>
            <button class="block">Block</button>
        </div>

        <h4 class="heading">Form Inline</h4>
        <div class="card">
            <form class="form-inline">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text">
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password">
                </div>

                <div class="form-group">
                    <label>Days</label>
                    <input type="number">
                </div>

                <div class="form-group">
                    <label>Tel Number</label>
                    <input type="tel">
                </div>

                <div class="form-group">
                    <label>No</label>
                    <input type="text" disabled>
                </div>

                <div class="form-group">
                    <label>Device</label>
                    <div class="group-pick">
                        <span class="active">Male</span>
                        <span>Female</span>
                        <span>Female</span>
                        <span class="active">Female</span>
                        <span>Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <div class="group-pick">
                        <span class="active">Male</span>
                        <span>Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <div class="group-pick">
                        <span class="active disabled">Male</span>
                        <span class="disabled">Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>图片</label>
                    <span>需要一个 b-upload </span>
                </div>

                <div class="form-group">
                    <label>开始时间</label>
                    <span>需要一个 b-date-group-pick </span>
                </div>
            </form>
        </div>

        <h4 class="heading">Form Block</h4>
        <div class="card">
            <form class="form-block">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text">
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password">
                </div>

                <div class="form-group">
                    <label>Days</label>
                    <input type="number">
                </div>

                <div class="form-group">
                    <label>Tel Number</label>
                    <input type="tel">
                </div>

                <div class="form-group">
                    <label>No</label>
                    <input type="text" disabled>
                </div>

                <div class="form-group">
                    <label>Device</label>
                    <div class="group-pick">
                        <span class="active">Male</span>
                        <span>Female</span>
                        <span>Female</span>
                        <span class="active">Female</span>
                        <span>Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <div class="group-pick">
                        <span class="active">Male</span>
                        <span>Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <div class="group-pick">
                        <span class="active disabled">Male</span>
                        <span class="disabled">Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>开始时间</label>
                    <span>需要一个 b-date-group-pick </span>
                </div>
            </form>
        </div>

        <h4 class="heading">Form Block Horizontal</h4>
        <div class="card">
            <form class="form-block-horizontal">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text">
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password">
                </div>

                <div class="form-group">
                    <label>Days</label>
                    <input type="number">
                </div>

                <div class="form-group">
                    <label>Tel Number</label>
                    <input type="tel">
                </div>

                <div class="form-group">
                    <label>No</label>
                    <input type="text" disabled>
                </div>

                <div class="form-group">
                    <label>Device</label>
                    <div class="group-pick">
                        <span class="active">Male</span>
                        <span>Female</span>
                        <span>Female</span>
                        <span class="active">Female</span>
                        <span>Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <div class="group-pick">
                        <span class="active">Male</span>
                        <span>Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <div class="group-pick">
                        <span class="active disabled">Male</span>
                        <span class="disabled">Female</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>开始时间</label>
                    <span>需要一个 b-date-group-pick </span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CssForm'
    };
</script>

<style>

</style>
