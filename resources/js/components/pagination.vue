<template>
    <ul class="pagination">
        <li v-for="i in pages">
            <a href='#'
               class="pagination_page"
               :class="{'active': value === i}"
               @click="$emit('change', i)">
                {{ i}}
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        pages: {
            type:  Number,
            default: 1
        },
        value:{
            type: Number,
            default: 1
        }
    }
}
</script>

<style scoped>
.pagination {
    list-style-type: none;
    display: flex;
}
.active {
    font-size: 30px;
    color: chartreuse;
    font-weight: bold;
}
.pagination_page {
    text-decoration: none;
    padding: 0 5px;
}
</style>
