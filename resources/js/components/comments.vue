<template>
    <div>
        Нажми на название колонки что бы сортировать
        <table>
            <tr>
                <th @click="onSortParamUpdate('id', !sortDesc)">ID{{ sortBy === 'id' ? '*' : '' }}</th>
                <th>Название</th>
                <th>Текст</th>
                <th @click="onSortParamUpdate('date', !sortDesc)">Дата{{ sortBy === 'date' ? '' : '' }}</th>
            </tr>
            <template v-if="isLoading">
                загрузка
            </template>
            <template v-else-if="rows.length">
                <tr v-for="row in rows">
                    <th>{{ row.id }}</th>
                    <th>{{ row.name }}</th>
                    <th>{{ row.text}}</th>
                    <th>{{ parseDate(row.date) }}</th>
                    <th><slot :row="row" /></th>
                </tr>
            </template>
            <template v-else>
                Здесь ничего не было
            </template>
        </table>
        <slot name="pagination" />
    </div>
</template>

<script>
export default {
    name: "comments",
    props: {
        rows: Array,
        isLoading: {
            type: Boolean,
            default: false
        },
        sortBy: {
            type: String,
            default: 'id'
        },
        sortDesc: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onSortParamUpdate (sortBy, sortDesc) {
            this.$emit('update:sortBy', sortBy)
            this.$emit('update:sortDesc', sortDesc)
        },
        parseDate (date) {
            const _date = new Date(date)
            return isNaN(_date.getDate()) ? 'Дата инвалид' : `${_date.getDate()}.${_date.getMonth() + 1}.${_date.getFullYear()}`
        }
    }
}
</script>

<style scoped>
th {
    cursor: pointer;
}
</style>
