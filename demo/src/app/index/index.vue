<template>
    <div>
        <div class="level-center">
            <h2>B</h2>
        </div>

        <div class="level-center">
            <p>Say hello to the future.</p>
        </div>

        <div class="level-center">
            <router-link :to="$RouterMap.intro">
                <button class="btn-get-started lg">Get Started</button>
            </router-link>
        </div>
    </div>
</template>

<script></script>

<style lang="scss" scoped>
    h2,
    p {
        margin: 0;
        padding: 0;
        line-height: 500px;
        font-size: 400px;
        color: transparent;
        user-select: none;
        background: linear-gradient(-45deg, #ee7752, #e73C7e, #3f51b5, #23d5ab);
        background-size: 400% 400%;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        animation: Gradient 10s ease-out infinite;
    }

    p {
        line-height: 150px;
        font-size: 100px;
        text-align: center;
        padding: 10px 20px;
    }

    .level-center {
        overflow-x: inherit;
    }

    @media screen and (max-width: 960px) {
        p {
            line-height: 100px;
            font-size: 80px;
        }
    }

    @media screen and (max-width: 600px) {
        h2 {
            line-height: 300px;
            font-size: 250px;
        }

        p {
            line-height: 50px;
            font-size: 40px;
        }
    }

    @keyframes Gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
